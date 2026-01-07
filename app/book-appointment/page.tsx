'use client';

import Link from 'next/link';
import { useState } from 'react';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function BookAppointmentPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        serviceType: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: ''
    });

    // Helper function to check if a time slot is in the past
    const isTimeSlotAvailable = (date: string, time: string) => {
        if (!date || !time) return true;

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        // If selected date is in the future, all times are available
        if (selectedDate > today) return true;

        // If selected date is today, check if time is in the future
        if (selectedDate.getTime() === today.getTime()) {
            const currentHour = new Date().getHours();
            const timeHour = parseInt(time.split(':')[0]);
            const isPM = time.includes('PM');
            const isAM = time.includes('AM');

            let hour24 = timeHour;
            if (isPM && timeHour !== 12) hour24 = timeHour + 12;
            if (isAM && timeHour === 12) hour24 = 0;

            return hour24 > currentHour;
        }

        // Past dates are not available
        return false;
    };

    // Get available time slots based on selected date
    const getAvailableTimeSlots = () => {
        const allSlots = ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

        if (!formData.date) return allSlots;

        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        // If future date, return all slots
        if (selectedDate > today) return allSlots;

        // If today, filter out past times
        if (selectedDate.getTime() === today.getTime()) {
            const currentHour = new Date().getHours();
            return allSlots.filter(time => {
                const timeHour = parseInt(time.split(':')[0]);
                const isPM = time.includes('PM');
                const isAM = time.includes('AM');

                let hour24 = timeHour;
                if (isPM && timeHour !== 12) hour24 = timeHour + 12;
                if (isAM && timeHour === 12) hour24 = 0;

                return hour24 > currentHour;
            });
        }

        return [];
    };

    const handlePayment = async () => {
        // Check if Razorpay key is configured
        const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

        if (!razorpayKey || razorpayKey === 'rzp_test_XXXXXXXXXXXXXXX') {
            // Test mode - skip payment
            if (confirm('⚠️ Razorpay not configured. Book appointment without payment for testing?')) {
                try {
                    const bookingResponse = await fetch('/api/appointments', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ...formData,
                            paymentId: 'TEST_' + Date.now(),
                            paymentStatus: 'test_mode'
                        })
                    });

                    if (bookingResponse.ok) {
                        alert('✅ Appointment booked successfully (Test Mode)!');
                        // Reset form
                        setStep(1);
                        setFormData({
                            serviceType: '',
                            date: '',
                            time: '',
                            name: '',
                            email: '',
                            phone: ''
                        });
                    } else {
                        alert('❌ Booking failed. Please try again.');
                    }
                } catch (error) {
                    console.error('Booking error:', error);
                    alert('❌ Booking failed. Please try again.');
                }
            }
            return;
        }

        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const options = {
                key: razorpayKey,
                amount: 50000, // Amount in paise (500 INR = 50000 paise)
                currency: 'INR',
                name: 'Dr. Kinjal Shah',
                description: `${formData.serviceType} - Consultation Fee`,
                image: '/logo.png',
                handler: async function (response: any) {
                    // Payment successful
                    console.log('Payment ID:', response.razorpay_payment_id);

                    // Send booking data to your API
                    try {
                        const bookingResponse = await fetch('/api/appointments', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                ...formData,
                                paymentId: response.razorpay_payment_id,
                                paymentStatus: 'completed'
                            })
                        });

                        if (bookingResponse.ok) {
                            alert('✅ Payment successful! Your appointment is confirmed.');
                            // Reset form
                            setStep(1);
                            setFormData({
                                serviceType: '',
                                date: '',
                                time: '',
                                name: '',
                                email: '',
                                phone: ''
                            });
                        } else {
                            alert('Payment received but booking failed. Please contact us.');
                        }
                    } catch (error) {
                        console.error('Booking error:', error);
                        alert('Payment received but booking failed. Please contact us.');
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                notes: {
                    service: formData.serviceType,
                    date: formData.date,
                    time: formData.time
                },
                theme: {
                    color: '#1A1A1A'
                },
                modal: {
                    ondismiss: function () {
                        alert('Payment cancelled.');
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        };

        script.onerror = () => {
            alert('❌ Failed to load payment gateway. Please check your internet connection.');
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        handlePayment();
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

                    <div className="nav-float">
                        <Link href="/about" className="nav-link">About</Link>
                        <Link href="/services" className="nav-link">Services</Link>
                        <Link href="/blog" className="nav-link">Blog</Link>
                        <Link href="/contact" className="nav-link">Contact</Link>
                    </div>

                    <Link href="/book-appointment" className="btn btn-primary">
                        Book Now →
                    </Link>
                </div>
            </nav>

            {/* Header */}
            <section style={{ backgroundColor: 'var(--bg-mint)', padding: '8rem 0 4rem' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 className="booking-header-h1">
                        Book Your Session
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-gray)', maxWidth: '48rem', margin: '0 auto' }}>
                        Consultation fee: ₹500. Payment required to confirm your appointment.
                    </p>
                </div>
            </section>

            {/* Booking Form */}
            <section className="section-white">
                <div className="container">
                    <div className="card" style={{ maxWidth: '48rem', margin: '0 auto', backgroundColor: 'var(--bg-pink)' }}>
                        {/* Progress Steps */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className="step-indicator"
                                    style={{
                                        backgroundColor: step >= s ? 'var(--text-black)' : 'white',
                                        color: step >= s ? 'white' : 'var(--text-black)',
                                    }}
                                >
                                    {s}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {step === 1 && (
                                <>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Select Service Type</h2>
                                    <div className="service-grid-selector">
                                        {['Individual Therapy', 'Couples Therapy', 'Family Therapy', 'Child & Adolescent', 'Anxiety & Depression', 'Online Therapy'].map((service) => (
                                            <button
                                                key={service}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, serviceType: service })}
                                                style={{
                                                    padding: '1.5rem',
                                                    borderRadius: '1rem',
                                                    border: formData.serviceType === service ? '2px solid var(--text-black)' : '1px solid rgba(0,0,0,0.1)',
                                                    backgroundColor: formData.serviceType === service ? 'white' : 'rgba(255,255,255,0.5)',
                                                    cursor: 'pointer',
                                                    fontWeight: formData.serviceType === service ? 'bold' : 'normal',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {service}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        disabled={!formData.serviceType}
                                        className="btn btn-primary"
                                        style={{ width: '100%', opacity: formData.serviceType ? 1 : 0.5, justifyContent: 'center' }}
                                    >
                                        Next →
                                    </button>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Select Date & Time</h2>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Preferred Date</label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="responsive-input"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Preferred Time</label>
                                        <select
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            className="responsive-input"
                                        >
                                            <option value="">Select time</option>
                                            {getAvailableTimeSlots().map(time => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                        {formData.date && getAvailableTimeSlots().length === 0 && (
                                            <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.5rem' }}>
                                                No available time slots for this date. Please select a future date.
                                            </p>
                                        )}
                                    </div>
                                    <div className="form-group-grid">
                                        <button type="button" onClick={() => setStep(1)} className="btn btn-primary" style={{ flex: 1, backgroundColor: 'white', color: 'var(--text-black)', justifyContent: 'center' }}>
                                            ← Back
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setStep(3)}
                                            disabled={!formData.date || !formData.time}
                                            className="btn btn-primary"
                                            style={{ flex: 1, opacity: (formData.date && formData.time) ? 1 : 0.5, justifyContent: 'center' }}
                                        >
                                            Next →
                                        </button>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Your Details & Payment</h2>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your name"
                                            required
                                            className="responsive-input"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your@email.com"
                                            required
                                            className="responsive-input"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+91-XXX-XXX-XXXX"
                                            required
                                            pattern="[0-9+\-\s]+"
                                            className="responsive-input"
                                        />
                                    </div>

                                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.1)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: '500' }}>Consultation Fee:</span>
                                            <span style={{ fontWeight: 'bold' }}>₹500</span>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                                            Secure payment via Razorpay
                                        </p>
                                    </div>

                                    <div className="form-group-grid">
                                        <button type="button" onClick={() => setStep(2)} className="btn btn-primary" style={{ flex: 1, backgroundColor: 'white', color: 'var(--text-black)', justifyContent: 'center' }}>
                                            ← Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={!formData.name || !formData.email || !formData.phone}
                                            className="btn btn-primary"
                                            style={{ flex: 1, opacity: (formData.name && formData.email && formData.phone) ? 1 : 0.5, justifyContent: 'center' }}
                                        >
                                            Pay ₹500 & Confirm →
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div>
                            <h3 className="footer-title">Dr. Kinjal Shah</h3>
                            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                                Compassionate psychological care in Ahmedabad.
                            </p>
                        </div>

                        <div>
                            <h3 className="footer-title">Services</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <Link href="/services" className="footer-link">Individual Therapy</Link>
                                <Link href="/services" className="footer-link">Couples Therapy</Link>
                                <Link href="/services" className="footer-link">Family Therapy</Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="footer-title">Quick Links</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <Link href="/about" className="footer-link">About</Link>
                                <Link href="/blog" className="footer-link">Blog</Link>
                                <Link href="/contact" className="footer-link">Contact</Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="footer-title">Contact</h3>
                            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                                Ahmedabad, Gujarat<br />
                                Phone: +91-XXX-XXX-XXXX<br />
                                Email: contact@example.com
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
