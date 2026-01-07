import Link from 'next/link';
import { db } from '@/lib/db';
import { decrypt } from '@/lib/crypto';

export const dynamic = 'force-dynamic';

export default async function PatientsPage() {
    // Get all unique patients efficiently using GROUP BY hash
    const patientsData = await db.all(`
        SELECT 
            patient_name as name,
            patient_email_encrypted,
            patient_phone_encrypted,
            patient_email_hash,
            COUNT(*) as totalAppointments,
            MAX(date) as lastVisit
        FROM appointments
        GROUP BY patient_email_hash
        ORDER BY lastVisit DESC
    `);

    // Process result
    const patients = patientsData.map((p: any) => ({
        name: p.name,
        email: decrypt(p.patient_email_encrypted),
        phone: decrypt(p.patient_phone_encrypted),
        totalAppointments: p.totalAppointments,
        lastVisit: p.lastVisit,
        appointments: []
    }));

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
                        <Link href="/admin/patients" className="nav-link" style={{ fontWeight: 'bold' }}>Patients</Link>
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
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        Patients
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-gray)' }}>
                        Manage patient records and history
                    </p>
                </div>
            </section>

            {/* Patients List */}
            <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-beige)' }}>
                <div className="container">
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>All Patients ({patients.length})</h2>
                        </div>

                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {patients.map((patient, index) => (
                                <div key={index} className="card" style={{ backgroundColor: 'var(--bg-mint)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                                {patient.name}
                                            </h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                                                <div>📧 {patient.email}</div>
                                                <div>📱 {patient.phone}</div>
                                                <div>📅 Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: 'var(--bg-pink)',
                                                borderRadius: '9999px',
                                                fontWeight: 'bold',
                                                marginBottom: '0.5rem'
                                            }}>
                                                {patient.totalAppointments} {patient.totalAppointments === 1 ? 'Visit' : 'Visits'}
                                            </div>
                                            <Link
                                                href={`/admin/patients/${encodeURIComponent(patient.email)}`}
                                                className="btn btn-primary"
                                                style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', display: 'inline-block', textDecoration: 'none' }}
                                            >
                                                View Details →
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Recent Appointments */}
                                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--text-gray)' }}>
                                            Recent Appointments
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {patient.appointments.slice(0, 3).map((apt: any) => (
                                                <div key={apt.id} style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontSize: '0.875rem',
                                                    padding: '0.5rem',
                                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                                    borderRadius: '0.5rem'
                                                }}>
                                                    <span>{apt.service_type}</span>
                                                    <span style={{ color: 'var(--text-gray)' }}>
                                                        {new Date(apt.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {patients.length === 0 && (
                                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-gray)' }}>
                                    No patients found. Patients will appear here after their first appointment.
                                </div>
                            )}
                        </div>
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
