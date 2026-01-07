import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { decrypt } from '@/lib/crypto';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const appointments = await db.all(`
            SELECT 
                a.id,
                a.date,
                a.service_type,
                a.status,
                a.payment_status,
                a.payment_id,
                a.patient_name,
                a.patient_email_encrypted,
                a.patient_phone_encrypted,
                a.created_at
            FROM appointments a
            ORDER BY a.date DESC
        `);

        // CSV Header
        let csv = 'ID,Date,Service,Status,Payment Status,Payment ID,Patient Name,Patient Email,Patient Phone,Created At\n';

        // CSV Rows
        appointments.forEach((apt: any) => {
            let email = 'N/A';
            let phone = 'N/A';

            try {
                if (apt.patient_email_encrypted) email = decrypt(apt.patient_email_encrypted);
                if (apt.patient_phone_encrypted) phone = decrypt(apt.patient_phone_encrypted);
            } catch (e) {
                console.error('Decryption error for export:', e);
                email = 'DECRYPTION_ERROR';
            }

            const row = [
                apt.id,
                new Date(apt.date).toISOString(),
                apt.service_type,
                apt.status,
                apt.payment_status || 'unpaid',
                apt.payment_id || '',
                `"${apt.patient_name}"`, // Quote name to handle commas
                email,
                phone,
                new Date(apt.created_at).toISOString()
            ].join(',');

            csv += row + '\n';
        });

        return new NextResponse(csv, {
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="appointments-export-${new Date().toISOString().split('T')[0]}.csv"`
            }
        });

    } catch (error) {
        console.error('Export error:', error);
        return NextResponse.json({ error: 'Failed to export appointments' }, { status: 500 });
    }
}
