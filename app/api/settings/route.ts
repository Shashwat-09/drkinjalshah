import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const rows = await db.all('SELECT key, value FROM settings');
        const settings: Record<string, string> = {};
        rows.forEach((row: any) => {
            settings[row.key] = row.value;
        });
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

const settingsSchema = z.record(z.string(), z.any());

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const settings = settingsSchema.parse(body);

        for (const [key, value] of Object.entries(settings)) {
            // Upsert logic
            await db.run(
                `INSERT INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
                 ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
                [key, String(value)]
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving settings:', error);
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
    }
}
