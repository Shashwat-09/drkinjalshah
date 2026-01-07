import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(request: Request) {
    try {
        const { appointmentId, status } = await request.json();

        if (!appointmentId || !status) {
            return NextResponse.json({ error: 'Appointment ID and status required' }, { status: 400 });
        }

        // Validate status
        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        // Update appointment status
        await db.run(
            'UPDATE appointments SET status = ? WHERE id = ?',
            [status, appointmentId]
        );

        return NextResponse.json({ success: true, status });
    } catch (error) {
        console.error('Update status error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
