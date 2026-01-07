import Link from 'next/link';
import { db } from '@/lib/db';
import { decrypt } from '@/lib/crypto';
import { notFound } from 'next/navigation';
import DeletePatientButton from '@/components/DeletePatientButton';
import AppointmentStatusChanger from '@/components/AppointmentStatusChanger';

export const dynamic = 'force-dynamic';

export default async function PatientDetailPage({ params }: { params: { id: string } }) {
    // Get all appointments for this patient (using email as ID)
    const patientEmail = decodeURIComponent(params.id);

    // Get all appointments and filter by decrypted email
    // (Can't use LIKE on encrypted data)
    // Calculate hash of email for lookup
    // In a real app, this hashing logic should be shared in a lib
    const crypto = require('crypto');
    const emailHash = crypto.createHash('sha256').update(patientEmail).digest('hex');

    // Get appointments efficiently using index
    const appointments = await db.all(
        'SELECT * FROM appointments WHERE patient_email_hash = ? ORDER BY date DESC',
        [emailHash]
    );

    if (appointments.length === 0) {
        notFound();
    }

    // Get patient info from first appointment
    const firstApt = appointments[0];
    const patient = {
        name: firstApt.patient_name,
        email: decrypt(firstApt.patient_email_encrypted),
        phone: decrypt(firstApt.patient_phone_encrypted),
        totalAppointments: appointments.length,
        firstVisit: appointments[appointments.length - 1].date,
        lastVisit: appointments[0].date
    };

    // Calculate stats
    const paidAppointments = appointments.filter((apt: any) => apt.payment_id).length;
    const totalRevenue = paidAppointments * 500; // Assuming ₹500 per session

    return (
        <>
            {/* Navigation */}
            <nav className="nav">
                <div className="nav-inner">
                    <Link href="/" className="logo">
                        <div className="logo-box">KS</div>
                        <span className="logo-text">Dr. Kinjal Shah</span>
                    </Link>

                    <div className="nav-float">
                        <Link href="/admin/dashboard" className="nav-link">Dashboard</Link>
                        <Link href="/admin/patients" className="nav-link">Patients</Link>
                        <Link href="/admin/settings" className="nav-link">Settings</Link>
                    </div>

                    <Link href="/api/auth/logout" className="btn btn-primary" style={{ backgroundColor: '#dc2626' }}>
                        Logout →
                    </Link>
                </div>
            </nav>

            {/* Header */}
            <section style={{ backgroundColor: 'var(--bg-mint)', padding: '8rem 0 4rem' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                        <Link href="/admin/patients" style={{ display: 'inline-block', color: 'var(--text-gray)' }}>
                            ← Back to Patients
                        </Link>
                        <DeletePatientButton patientEmail={patient.email} patientName={patient.name} />
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {patient.name}
                    </h1>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '1.125rem', color: 'var(--text-gray)' }}>
                        <div>📧 {patient.email}</div>
                        <div>📱 {patient.phone}</div>
                    </div>
                </div>
            </section>

            {/* Patient Details */}
            <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-beige)' }}>
                <div className="container">
                    {/* Stats Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        <div className="card" style={{ backgroundColor: '#C8E6D5' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', marginBottom: '0.5rem' }}>
                                Total Visits
                            </h3>
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{patient.totalAppointments}</p>
                        </div>

                        <div className="card" style={{ backgroundColor: '#E8E4F3' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', marginBottom: '0.5rem' }}>
                                Paid Sessions
                            </h3>
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#059669' }}>{paidAppointments}</p>
                        </div>

                        <div className="card" style={{ backgroundColor: '#FFE5E0' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', marginBottom: '0.5rem' }}>
                                Total Revenue
                            </h3>
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>₹{totalRevenue}</p>
                        </div>

                        <div className="card" style={{ backgroundColor: 'var(--bg-pink)' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', marginBottom: '0.5rem' }}>
                                First Visit
                            </h3>
                            <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                {new Date(patient.firstVisit).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Appointment History */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                            Appointment History
                        </h2>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', fontSize: '0.875rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--bg-beige)' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Date</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Service</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Payment</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Payment ID</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((apt: any) => (
                                        <tr key={apt.id} style={{ borderBottom: '1px solid var(--bg-beige)' }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ fontWeight: '500' }}>
                                                    {new Date(apt.date).toLocaleDateString()}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                                                    {new Date(apt.date).toLocaleTimeString()}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    backgroundColor: 'var(--bg-mint)',
                                                    borderRadius: '9999px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500'
                                                }}>
                                                    {apt.service_type}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                {apt.payment_id ? (
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem',
                                                        backgroundColor: '#d1fae5',
                                                        color: '#065f46',
                                                        borderRadius: '9999px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500'
                                                    }}>
                                                        ₹500 Paid
                                                    </span>
                                                ) : (
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem',
                                                        backgroundColor: '#fee2e2',
                                                        color: '#991b1b',
                                                        borderRadius: '9999px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500'
                                                    }}>
                                                        Unpaid
                                                    </span>
                                                )}
                                            </td>
                                            <td style={{ padding: '1rem', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-gray)' }}>
                                                {apt.payment_id || '-'}
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <AppointmentStatusChanger
                                                    appointmentId={apt.id}
                                                    currentStatus={apt.status}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Notes Section */}
                    <div className="card" style={{ marginTop: '2rem', backgroundColor: 'var(--bg-mint)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                            Clinical Notes
                        </h2>
                        <textarea
                            placeholder="Add clinical notes, treatment plans, or observations..."
                            style={{
                                width: '100%',
                                minHeight: '200px',
                                padding: '1rem',
                                borderRadius: '1rem',
                                border: '1px solid rgba(0,0,0,0.1)',
                                fontSize: '1rem',
                                backgroundColor: 'white',
                                fontFamily: 'inherit',
                                resize: 'vertical'
                            }}
                        />
                        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                            Save Notes →
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div style={{ textAlign: 'center' }}>
                        <h3 className="footer-title">Dr. Kinjal Shah - Admin Panel</h3>
                        <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                            Secure patient management system
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
