import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { encrypt } from '@/lib/crypto';
import crypto from 'crypto';
import { z } from 'zod';

// Input Validation Schema
const appointmentSchema = z.object({
    serviceType: z.enum(['Individual Therapy', 'Couples Therapy', 'Family Therapy', 'Child & Adolescent', 'Anxiety & Depression', 'Online Therapy']),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    time: z.string().regex(/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, 'Invalid time format'),
    name: z.string().min(2, 'Name too short').max(100, 'Name too long'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
    paymentId: z.string().min(1, 'Payment ID required'),
    paymentStatus: z.string().optional(),
    razorpaySignature: z.string().optional(), // For payment verification
    razorpayOrderId: z.string().optional(), // For payment verification
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Validate Input
        const result = appointmentSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({
                error: 'Validation failed',
                details: result.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const { serviceType, date, time, name, email, phone, paymentId, paymentStatus, razorpaySignature, razorpayOrderId } = result.data;

        // 2. Encrypt PII
        const emailEnc = encrypt(email);
        const phoneEnc = encrypt(phone);

        // 3. Create appointment ID
        const id = crypto.randomUUID();

        // 4. Combine date and time for DB (Simplified)
        // In production, recommend storing formatted ISO string or timestamp
        const dateTime = new Date(`${date} ${time}`);
        if (isNaN(dateTime.getTime())) {
            return NextResponse.json({ error: 'Invalid date/time combination' }, { status: 400 });
        }

        // 5. Payment Verification (Optional if keys configured)
        // If razorpay signature is provided, verify it
        if (razorpaySignature && razorpayOrderId && process.env.RAZORPAY_KEY_SECRET && process.env.RAZORPAY_KEY_SECRET !== 'rzp_secret_placeholder') {
            const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
            hmac.update(razorpayOrderId + "|" + paymentId);
            const generated_signature = hmac.digest('hex');

            if (generated_signature !== razorpaySignature) {
                return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
            }
        }

        // 6. Calculate Hash for efficient search
        const emailHash = crypto.createHash('sha256').update(email).digest('hex');

        // 7. Insert into DB (Handle Race Condition)
        try {
            await db.run(
                `INSERT INTO appointments (
                    id, patient_name, patient_email_encrypted, patient_email_hash, patient_phone_encrypted, 
                    service_type, date, status, payment_id, payment_status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [id, name, emailEnc, emailHash, phoneEnc, serviceType, dateTime.toISOString(), 'pending', paymentId, paymentStatus || 'completed']
            );
        } catch (dbError: any) {
            // Check for Unique Constraint Violation (Race Condition)
            if (dbError.code === 'SQLITE_CONSTRAINT' || (dbError.message && dbError.message.includes('UNIQUE constraint failed'))) {
                return NextResponse.json({
                    error: 'Slot unavailable',
                    message: 'This time slot was just booked by another patient. Please select a different time.'
                }, { status: 409 }); // Conflict
            }
            throw dbError; // Re-throw other errors
        }

        // 7. Send Notification
        // Wrapping in try-catch so email failure doesn't fail booking
        try {
            const { sendEmail } = await import('@/lib/email');
            await sendEmail({
                to: email, // Note: In real app, we'd use the decrypted email handled above
                subject: 'Appointment Confirmation - Dr. Kinjal Shah',
                html: `<p>Dear ${name},</p><p>Your appointment for ${serviceType} on ${date} at ${time} is confirmed.</p>`
            });
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // Continue execution
        }

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Booking Error:', error instanceof Error ? error.message : 'Unknown');
        // Do not return raw error in production
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
