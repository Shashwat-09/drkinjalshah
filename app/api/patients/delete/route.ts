import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { decrypt } from '@/lib/crypto';

export async function DELETE(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        // Get all appointments and find ones matching this email
        const allAppointments = await db.all('SELECT * FROM appointments');

        const appointmentIds = allAppointments
            .filter((apt: any) => {
                try {
                    return decrypt(apt.patient_email_encrypted) === email;
                } catch {
                    return false;
                }
            })
            .map((apt: any) => apt.id);

        if (appointmentIds.length === 0) {
            return NextResponse.json({ error: 'No appointments found' }, { status: 404 });
        }

        // Delete all appointments for this patient
        const placeholders = appointmentIds.map(() => '?').join(',');
        await db.run(
            `DELETE FROM appointments WHERE id IN (${placeholders})`,
            appointmentIds
        );

        return NextResponse.json({
            success: true,
            deletedCount: appointmentIds.length
        });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
