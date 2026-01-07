import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/site-config';

export function Footer() {
    return (
        <footer className="bg-[var(--primary)] text-white py-16 mt-0">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-1">
                    <h3 className="font-serif text-2xl font-bold mb-6">Dr. Kinjal Shah</h3>
                    <p className="text-sm opacity-80 leading-relaxed max-w-xs">
                        Compassionate psychological care in Ahmedabad.
                        Dedicated to improving mental health and well-being through evidence-based therapy.
                    </p>
                </div>

                <div>
                    <h3 className="font-serif text-lg font-bold mb-6">Therapy</h3>
                    <ul className="space-y-3 text-sm opacity-80">
                        <li><Link href="/services/individual-therapy" className="hover:underline">Individual Therapy</Link></li>
                        <li><Link href="/services/couples-therapy" className="hover:underline">Couples Therapy</Link></li>
                        <li><Link href="/services/child-adolescent" className="hover:underline">Child & Adolescent</Link></li>
                        <li><Link href="/services/online-therapy" className="hover:underline">Online Sessions</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-serif text-lg font-bold mb-6">Quick Links</h3>
                    <ul className="space-y-3 text-sm opacity-80">
                        <li><Link href="/about" className="hover:underline">About Dr. Kinjal</Link></li>
                        <li><Link href="/blog" className="hover:underline">Mental Health Blog</Link></li>

                        <li><Link href="/book-appointment" className="hover:underline">Book Appointment</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-serif text-lg font-bold mb-6">Contact</h3>
                    <address className="not-italic text-sm opacity-80 space-y-3">
                        <p className="border-b border-white/20 pb-3 mb-3">{SITE_CONFIG.address.street}<br />{SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}</p>
                        <p>Phone: <a href={`tel:${SITE_CONFIG.contact.phone}`}>{SITE_CONFIG.contact.phone}</a></p>
                        <p>Email: <a href={`mailto:${SITE_CONFIG.contact.email}`}>{SITE_CONFIG.contact.email}</a></p>
                    </address>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-sm opacity-60">
                <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. Licensed Clinical Psychologist. All rights reserved.</p>
            </div>
        </footer>
    );
}
