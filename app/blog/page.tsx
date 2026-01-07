import Link from 'next/link';

const blogPosts = [
    {
        title: "Understanding Anxiety: Signs, Symptoms, and Solutions",
        excerpt: "Anxiety is one of the most common mental health challenges. Learn how to recognize the signs and what steps you can take to manage it effectively.",
        date: "January 2, 2026",
        readTime: "5 min read",
        category: "Mental Health",
        color: "#F5E6E0"
    },
    {
        title: "The Importance of Self-Care in Modern Life",
        excerpt: "Self-care isn't selfish—it's essential. Discover practical self-care strategies that fit into your busy schedule.",
        date: "December 28, 2025",
        readTime: "4 min read",
        category: "Wellness",
        color: "#E8E4F3"
    },
    {
        title: "How Couples Therapy Can Strengthen Your Relationship",
        excerpt: "Couples therapy isn't just for relationships in crisis. Learn how it can help you build stronger communication and deeper connection.",
        date: "December 20, 2025",
        readTime: "6 min read",
        category: "Relationships",
        color: "#C8E6D5"
    },
    {
        title: "Mindfulness Techniques for Daily Stress Relief",
        excerpt: "Simple mindfulness practices you can incorporate into your daily routine to reduce stress and improve mental clarity.",
        date: "December 15, 2025",
        readTime: "5 min read",
        category: "Mindfulness",
        color: "#FFE5E0"
    },
    {
        title: "Supporting a Loved One Through Depression",
        excerpt: "When someone you care about is struggling with depression, knowing how to help can make all the difference.",
        date: "December 10, 2025",
        readTime: "7 min read",
        category: "Mental Health",
        color: "#F5E6E0"
    },
    {
        title: "The Benefits of Family Therapy",
        excerpt: "Family therapy can help resolve conflicts, improve communication, and strengthen bonds between family members.",
        date: "December 5, 2025",
        readTime: "5 min read",
        category: "Family",
        color: "#E8E4F3"
    }
];

export default function BlogPage() {
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
                        Our Blog
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-gray)', maxWidth: '48rem', margin: '0 auto' }}>
                        Fresh perspectives and expert insights on mental health, wellness, and personal growth.
                    </p>
                </div>
            </section>

            {/* Featured Post */}
            <section className="section-white">
                <div className="container">
                    <div className="card" style={{ maxWidth: '80rem', margin: '0 auto', backgroundColor: '#C8E6D5', padding: '3rem' }}>
                        <div className="services-grid" style={{ alignItems: 'center', gap: '3rem' }}>
                            <div>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: 'white',
                                    borderRadius: '9999px',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    marginBottom: '1rem'
                                }}>
                                    Featured
                                </div>
                                <h2 className="text-responsive-h3" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                                    {blogPosts[0].title}
                                </h2>
                                <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem', lineHeight: '1.75' }}>
                                    {blogPosts[0].excerpt}
                                </p>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                                    <span>{blogPosts[0].date}</span>
                                    <span>•</span>
                                    <span>{blogPosts[0].readTime}</span>
                                </div>
                                <Link href="/blog/anxiety-guide" className="btn btn-primary">
                                    Read Article →
                                </Link>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '350px',
                                background: 'linear-gradient(135deg, #E8E4F3 0%, #FFE5E0 100%)',
                                borderRadius: '2rem'
                            }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-beige)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center' }} className="text-responsive-h3">
                        Recent Articles
                    </h2>

                    <div className="cards-grid">
                        {blogPosts.slice(1).map((post, i) => (
                            <article key={i} className="card" style={{ backgroundColor: post.color, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    background: 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 100%)',
                                    borderRadius: '1rem',
                                    marginBottom: '1.5rem'
                                }} />

                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.375rem 0.875rem',
                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    marginBottom: '1rem',
                                    width: 'fit-content'
                                }}>
                                    {post.category}
                                </div>

                                <h3 className="text-responsive-h3" style={{ fontSize: '1.5rem', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                                    {post.title}
                                </h3>

                                <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem', lineHeight: '1.6', flex: 1 }}>
                                    {post.excerpt}
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: 'var(--text-gray)', marginBottom: '1rem' }}>
                                    <span>{post.date}</span>
                                    <span>{post.readTime}</span>
                                </div>

                                <Link href={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} style={{
                                    color: 'var(--text-black)',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    Read More →
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="section-white">
                <div className="container">
                    <div className="card" style={{ maxWidth: '56rem', margin: '0 auto', padding: '4rem', textAlign: 'center', backgroundColor: 'var(--bg-pink)' }}>
                        <h2 className="text-responsive-h3" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Stay Updated</h2>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-gray)', marginBottom: '2rem' }}>
                            Subscribe to our newsletter for mental health tips and insights delivered to your inbox.
                        </p>
                        <form className="form-group-grid" style={{ maxWidth: '32rem', margin: '0 auto', flexDirection: 'row' }}>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="responsive-input"
                                style={{
                                    flex: 1,
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    fontSize: '1rem',
                                    backgroundColor: 'white'
                                }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                                Subscribe →
                            </button>
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
