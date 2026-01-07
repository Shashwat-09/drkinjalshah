'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Redirect to dashboard
                router.push('/admin/dashboard');
            } else {
                setError(data.error || 'Login failed');
                setLoading(false);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <>
            {/* Navigation */}
            <nav className="nav">
                <div className="nav-inner">
                    <Link href="/" className="logo">
                        <div className="logo-box">KS</div>
                        <span className="logo-text">Dr. Kinjal Shah</span>
                    </Link>

                    <Link href="/" className="btn btn-primary">
                        ← Back to Home
                    </Link>
                </div>
            </nav>

            {/* Login Form */}
            <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: 'var(--bg-beige)' }}>
                <div className="card" style={{ maxWidth: '28rem', width: '100%', backgroundColor: 'var(--bg-mint)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div className="logo-box" style={{ width: '4rem', height: '4rem', margin: '0 auto 1rem', fontSize: '1.5rem' }}>KS</div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Admin Login</h1>
                        <p style={{ color: 'var(--text-gray)' }}>Secure access to patient records</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {error && (
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#fee2e2',
                                color: '#991b1b',
                                borderRadius: '1rem',
                                fontSize: '0.875rem'
                            }}>
                                {error}
                            </div>
                        )}

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="admin"
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1.25rem',
                                    borderRadius: '9999px',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    fontSize: '1rem',
                                    backgroundColor: 'white'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1.25rem',
                                    borderRadius: '9999px',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    fontSize: '1rem',
                                    backgroundColor: 'white'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login →'}
                        </button>

                        <div style={{
                            padding: '1rem',
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            borderRadius: '1rem',
                            fontSize: '0.875rem',
                            color: 'var(--text-gray)'
                        }}>
                            <strong>Demo Credentials:</strong><br />
                            Username: admin<br />
                            Password: admin123
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
