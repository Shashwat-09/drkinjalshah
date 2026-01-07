import Link from 'next/link';

const services = [
    {
        title: "Individual Therapy",
        desc: "One-on-one sessions to address personal challenges, anxiety, depression, and self-esteem issues.",
        color: "#F5E6E0"
    },
    {
        title: "Couples Therapy",
        desc: "Relationship counseling to improve communication, resolve conflicts, and strengthen bonds.",
        color: "#E8E4F3"
    },
    {
        title: "Family Therapy",
        desc: "Strengthen family bonds and improve communication within the family unit.",
        color: "#C8E6D5"
    },
    {
        title: "Child & Adolescent",
        desc: "Specialized support for young minds to overcome behavioral and emotional difficulties.",
        color: "#FFE5E0"
    },
    {
        title: "Anxiety & Depression",
        desc: "Evidence-based CBT and mindfulness techniques to manage symptoms and regain control.",
        color: "#F5E6E0"
    },
    {
        title: "Online Therapy",
        desc: "Secure, confidential video sessions from the comfort of your home anywhere in Gujarat/India.",
        color: "#E8E4F3"
    }
];

export default function ServicesPage() {
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
            <section style={{ backgroundColor: 'var(--bg-pink)', padding: '8rem 0 4rem' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 className="booking-header-h1">
                        Our Services
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-gray)', maxWidth: '48rem', margin: '0 auto' }}>
                        We offer a safe, confidential space to heal and grow. Whether you prefer in-person sessions at our Ahmedabad clinic or online therapy.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-white">
                <div className="container">
                    <div className="cards-grid">
                        {services.map((service, i) => (
                            <div key={i} className="card" style={{ backgroundColor: service.color }}>
                                <h3 className="text-responsive-h3">{service.title}</h3>
                                <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', lineHeight: '1.75' }}>{service.desc}</p>
                                <Link href="/book-appointment" className="btn btn-primary">
                                    Book Session →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-beige)' }}>
                <div className="container">
                    <div className="card" style={{ maxWidth: '56rem', margin: '0 auto', padding: '4rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Not sure which therapy is right for you?</h2>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-gray)', marginBottom: '2rem' }}>
                            Book a 15-minute consultation to discuss your needs.
                        </p>
                        <Link href="/contact" className="btn btn-primary">Contact Us →</Link>
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
