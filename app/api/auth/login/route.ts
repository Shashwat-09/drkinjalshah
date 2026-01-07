import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword } from '@/lib/auth-utils';
import { createSession } from '@/lib/auth';

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();

export async function POST(request: Request) {
    try {
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();

        // Rate Limiting
        const userAttempts = loginAttempts.get(ip) || { count: 0, firstAttempt: now };

        if (now - userAttempts.firstAttempt > RATE_LIMIT_WINDOW) {
            // Reset window
            userAttempts.count = 0;
            userAttempts.firstAttempt = now;
        }

        if (userAttempts.count >= MAX_ATTEMPTS) {
            return NextResponse.json(
                { error: 'Too many login attempts. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // Get admin user
        const admin = await db.get('SELECT * FROM users WHERE username = ?', [username]);

        if (!admin || !verifyPassword(password, admin.password_hash)) {
            // Increment failed attempts
            userAttempts.count++;
            loginAttempts.set(ip, userAttempts);

            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Success - Create secure session
        await createSession(admin.id);

        // Clear attempts on success
        loginAttempts.delete(ip);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Login error:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
