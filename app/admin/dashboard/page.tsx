import Link from 'next/link';
import { db } from '@/lib/db';
import { decrypt } from '@/lib/crypto';
import AppointmentStatusChanger from '@/components/AppointmentStatusChanger';
import CsvExportButton from '@/components/CsvExportButton';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const appointments = await db.all('SELECT * FROM appointments ORDER BY created_at DESC LIMIT 50');

    // Calculate stats
    const totalAppointments = appointments.length;
    const confirmedAppointments = appointments.filter((apt: any) => apt.status === 'confirmed').length;
    const pendingAppointments = appointments.filter((apt: any) => apt.status === 'pending').length;

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
                    <h1 className="text-responsive-h1" style={{ marginBottom: '1rem' }}>
                        Admin Dashboard
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-gray)' }}>
                        Manage appointments and patient records
                    </p>
                </div>
            </section>

            {/* Stats Cards */}
            <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-beige)' }}>
                <div className="container">
                    <div className="cards-grid" style={{ marginBottom: '3rem' }}>
                        <div className="card" style={{ backgroundColor: '#C8E6D5' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', marginBottom: '0.5rem' }}>
                                Total Appointments
                            </h3>
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{totalAppointments}</p>
                        </div>

                        <div className="card" style={{ backgroundColor: '#E8E4F3' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', marginBottom: '0.5rem' }}>
                                Confirmed
                            </h3>
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#059669' }}>{confirmedAppointments}</p>
                        </div>

                        <div className="card" style={{ backgroundColor: '#FFE5E0' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-gray)', marginBottom: '0.5rem' }}>
                                Pending
                            </h3>
                            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#d97706' }}>{pendingAppointments}</p>
                        </div>
                    </div>

                    {/* Appointments Table */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Recent Appointments</h2>
                            <CsvExportButton />
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', fontSize: '0.875rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--bg-beige)' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Date & Time</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Patient</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Service</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Contact</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Payment</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((apt: any) => (
                                        <tr key={apt.id} style={{ borderBottom: '1px solid var(--bg-beige)' }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ fontWeight: '500' }}>{apt.date}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>{apt.time}</div>
                                            </td>
                                            <td style={{ padding: '1rem', fontWeight: '500' }}>{apt.patient_name}</td>
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
                                            <td style={{ padding: '1rem', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                                                {/* Masking PII for security audit */}
                                                <div>{(() => {
                                                    try {
                                                        if (!apt.patient_email_encrypted) return 'N/A';
                                                        const e = decrypt(apt.patient_email_encrypted);
                                                        return e.replace(/(.{1})(.*)(@.*)/, "$1***$3");
                                                    } catch (err) {
                                                        return 'Error';
                                                    }
                                                })()}</div>
                                                <div style={{ color: 'var(--text-gray)' }}>{(() => {
                                                    try {
                                                        if (!apt.patient_phone_encrypted) return 'N/A';
                                                        const p = decrypt(apt.patient_phone_encrypted);
                                                        return p.replace(/(\d{2}).*(\d{2})/, "$1******$2");
                                                    } catch (err) {
                                                        return 'Error';
                                                    }
                                                })()}</div>
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
                                                        Paid
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
                                            <td style={{ padding: '1rem' }}>
                                                <AppointmentStatusChanger
                                                    appointmentId={apt.id}
                                                    currentStatus={apt.status}
                                                />
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <button style={{
                                                    padding: '0.375rem 0.875rem',
                                                    backgroundColor: 'var(--text-black)',
                                                    color: 'white',
                                                    borderRadius: '9999px',
                                                    border: 'none',
                                                    fontSize: '0.75rem',
                                                    cursor: 'pointer',
                                                    fontWeight: '500'
                                                }}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {appointments.length === 0 && (
                                        <tr>
                                            <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-gray)' }}>
                                                No appointments found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
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
