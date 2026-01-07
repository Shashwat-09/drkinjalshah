import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/site-config';

export default function ContactPage() {
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
                        Get in Touch
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-gray)', maxWidth: '48rem', margin: '0 auto' }}>
                        Ready to start your journey? Reach out to us and we'll get back to you within 24 hours.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-white">
                <div className="container">
                    <div className="services-grid">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-responsive-h3" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Contact Information</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className="card">
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Address</h3>
                                    <p style={{ color: 'var(--text-gray)' }}>
                                        {SITE_CONFIG.address.street}<br />
                                        {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}
                                    </p>
                                </div>

                                <div className="card">
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Phone</h3>
                                    <p style={{ color: 'var(--text-gray)' }}>
                                        <a href={`tel:${SITE_CONFIG.contact.phone}`} style={{ color: 'var(--text-black)', textDecoration: 'underline' }}>
                                            {SITE_CONFIG.contact.phone}
                                        </a>
                                    </p>
                                </div>

                                <div className="card">
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Email</h3>
                                    <p style={{ color: 'var(--text-gray)' }}>
                                        <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: 'var(--text-black)', textDecoration: 'underline' }}>
                                            {SITE_CONFIG.contact.email}
                                        </a>
                                    </p>
                                </div>

                                <div className="card">
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Working Hours</h3>
                                    <p style={{ color: 'var(--text-gray)' }}>
                                        Monday - Saturday: 10:00 AM - 7:00 PM<br />
                                        Sunday: By Appointment Only
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="card" style={{ backgroundColor: 'var(--bg-pink)' }}>
                            <h2 className="text-responsive-h3" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Send us a message</h2>

                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="responsive-input"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="responsive-input"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                                    <textarea
                                        rows={5}
                                        placeholder="How can we help you?"
                                        className="responsive-input"
                                        style={{
                                            borderRadius: '1.5rem',
                                            resize: 'vertical',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                    Send Message →
                                </button>
                            </form>
                        </div>
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
