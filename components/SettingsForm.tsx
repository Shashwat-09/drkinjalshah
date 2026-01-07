'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Settings {
    practice_name?: string;
    email?: string;
    phone?: string;
    consultation_fee?: string;
    session_duration?: string;
    [key: string]: any;
}

export default function SettingsForm({ initialSettings }: { initialSettings: Settings }) {
    const [settings, setSettings] = useState<Settings>(initialSettings);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (!res.ok) throw new Error('Failed to save');

            setMessage({ type: 'success', text: 'Settings saved successfully!' });
            router.refresh(); // Refresh server components to show up-to-date side effects if any
        } catch (error) {
            setMessage({ type: 'error', text: 'Error saving settings. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '2rem', maxWidth: '48rem' }}>

                {/* Status Message */}
                {message && (
                    <div style={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                        color: message.type === 'success' ? '#065f46' : '#991b1b',
                        fontWeight: '500'
                    }}>
                        {message.text}
                    </div>
                )}

                {/* Practice Information */}
                <div className="card">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        Practice Information
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Practice Name</label>
                            <input
                                type="text"
                                name="practice_name"
                                value={settings.practice_name || ''}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1.25rem',
                                    borderRadius: '9999px',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={settings.email || ''}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1.25rem',
                                    borderRadius: '9999px',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={settings.phone || ''}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1.25rem',
                                    borderRadius: '9999px',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Appointment Settings */}
                <div className="card" style={{ backgroundColor: 'var(--bg-pink)' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        Appointment Settings
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Consultation Fee (₹)</label>
                            <input
                                type="number"
                                name="consultation_fee"
                                value={settings.consultation_fee || ''}
                                onChange={handleChange}
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
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Session Duration (minutes)</label>
                            <select
                                name="session_duration"
                                value={settings.session_duration || '60'}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1.25rem',
                                    borderRadius: '9999px',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    fontSize: '1rem',
                                    backgroundColor: 'white'
                                }}
                            >
                                <option value="30">30 minutes</option>
                                <option value="45">45 minutes</option>
                                <option value="60">60 minutes</option>
                                <option value="90">90 minutes</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Payment Settings (Static for now) */}
                <div className="card" style={{ backgroundColor: 'var(--bg-mint)' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        Payment Settings
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Razorpay Key ID</label>
                            <input
                                type="text"
                                defaultValue="rzp_test_..."
                                disabled
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1.25rem',
                                    borderRadius: '9999px',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    fontSize: '1rem',
                                    backgroundColor: '#f3f4f6',
                                    fontFamily: 'monospace'
                                }}
                            />
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-gray)', marginTop: '0.5rem' }}>
                                Managed via .env.local file
                            </p>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ flex: 1, backgroundColor: 'var(--text-black)', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Saving...' : 'Save Changes →'}
                    </button>
                    <button type="button" className="btn btn-primary" style={{ flex: 1, backgroundColor: 'white', color: 'var(--text-black)' }}>
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
}
