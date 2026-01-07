import Link from 'next/link';

export default function Home() {
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

            {/* Hero */}
            <section className="hero container">
                <div className="hero-grid">
                    <div>
                        <h1 className="hero-title">
                            Empowering change through personalized therapy 🌸🌼🌺
                        </h1>

                        <p className="hero-text">
                            Find the resources you need to face your current challenges with our expert team of registered therapists and counselors in Ahmedabad and throughout Gujarat.
                        </p>

                        <div className="btn-group">
                            <Link href="/book-appointment" className="btn btn-primary">
                                Book a FREE consultation →
                            </Link>
                        </div>
                    </div>

                    <div style={{
                        width: '100%',
                        height: '500px',
                        background: 'linear-gradient(135deg, #C8E6D5 0%, #E8E4F3 100%)',
                        borderRadius: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        color: '#6B6B6B'
                    }}>
                        Image Collage Placeholder
                    </div>
                </div>
            </section>

            {/* Blob Section */}
            <section className="blob-section">
                <div className="container">
                    <div className="blob-container">
                        <div className="blob-mint">
                            <h2 className="text-responsive-h1">
                                Building resilience together with Dr. Kinjal Shah 🌼🌸 on your path to well-being
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="section-white">
                <div className="container">
                    <h2 className="text-responsive-h2">
                        How we can help you
                    </h2>

                    <div className="services-grid">
                        <div className="card card-mint">
                            <h3 className="text-responsive-h3">Family Therapy</h3>
                            <p style={{ color: '#6B6B6B', marginBottom: '2rem' }}>Strengthened family bonds</p>
                            <Link href="/services" className="btn btn-primary">Learn More →</Link>
                        </div>

                        <div className="card card-lavender">
                            <h3 className="text-responsive-h3">Couple Therapy</h3>
                            <p style={{ color: '#6B6B6B', marginBottom: '2rem' }}>Deepening Partnership Understanding</p>
                            <Link href="/services" className="btn btn-primary">Learn More →</Link>
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
