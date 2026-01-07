import Link from 'next/link';
import { db } from '@/lib/db';
import SettingsForm from '@/components/SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    // Fetch initial settings
    let initialSettings = {};
    try {
        const rows = await db.all('SELECT key, value FROM settings');
        rows.forEach((row: any) => {
            initialSettings = { ...initialSettings, [row.key]: row.value };
        });
    } catch (e) {
        console.error('Failed to load settings', e);
    }

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
                        <Link href="/admin/settings" className="nav-link" style={{ fontWeight: 'bold' }}>Settings</Link>
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
                        Settings
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-gray)' }}>
                        Configure your practice settings
                    </p>
                </div>
            </section>

            {/* Settings Sections */}
            <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-beige)' }}>
                <div className="container">
                    <SettingsForm initialSettings={initialSettings} />
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
