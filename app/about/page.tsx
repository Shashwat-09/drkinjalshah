import Link from 'next/link';

export default function AboutPage() {
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
                        About Dr. Kinjal Shah
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-gray)', maxWidth: '48rem', margin: '0 auto' }}>
                        A dedicated mental health professional practicing in Ahmedabad, Gujarat with over a decade of experience in clinical psychology.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-white">
                <div className="container">
                    <div className="services-grid" style={{ alignItems: 'center' }}>
                        <div>
                            <div style={{
                                width: '100%',
                                height: '500px',
                                background: 'linear-gradient(135deg, #E8E4F3 0%, #C8E6D5 100%)',
                                borderRadius: '2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                color: '#6B6B6B'
                            }}>
                                Dr. Kinjal Photo
                            </div>
                        </div>

                        <div>
                            <h2 className="text-responsive-h3" style={{ fontSize: '2.5rem' }}>
                                Clinical Psychologist (M.Phil, Ph.D.)
                            </h2>

                            <div style={{ color: 'var(--text-gray)', lineHeight: '1.75', marginBottom: '2rem' }}>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Dr. Kinjal Shah specializes in evidence-based approaches including Cognitive Behavioral Therapy (CBT), Mindfulness-Based Interventions, and Family Systems Therapy.
                                </p>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Her approach is rooted in empathy, non-judgment, and scientific rigor. She believes that therapy is a collaborative journey where the client and therapist work together to uncover strengths and build resilience.
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <div className="card" style={{ padding: '1rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.5rem' }}>✓</span>
                                    <span style={{ fontWeight: '600' }}>RCI Licensed</span>
                                </div>
                                <div className="card" style={{ padding: '1rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.5rem' }}>✓</span>
                                    <span style={{ fontWeight: '600' }}>PhD Certified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-beige)' }}>
                <div className="container">
                    <div className="card" style={{ maxWidth: '56rem', margin: '0 auto', padding: '4rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Our Ethical Commitment</h2>
                        <p style={{ fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--text-gray)', lineHeight: '1.75' }}>
                            "We adhere strictly to the ethical guidelines set by the Rehabilitation Council of India (RCI). Client confidentiality, informed consent, and professional boundaries are the pillars of our practice. Your sessions are a safe, private space."
                        </p>
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
