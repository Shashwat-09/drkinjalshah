import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="fixed top-8 left-0 right-0 z-50 px-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                        <span className="text-white font-serif font-bold text-lg">KS</span>
                    </div>
                    <span className="font-serif font-bold text-xl hidden md:block">Dr. Kinjal Shah</span>
                </Link>

                {/* Floating Nav Links */}
                <div className="nav-float hidden lg:flex items-center gap-8">
                    <Link href="/about" className="text-sm font-medium hover:opacity-60 transition-opacity">About Us</Link>
                    <Link href="/services" className="text-sm font-medium hover:opacity-60 transition-opacity">Therapies</Link>

                    <Link href="/blog" className="text-sm font-medium hover:opacity-60 transition-opacity">Our Blog</Link>
                    <Link href="/contact" className="text-sm font-medium hover:opacity-60 transition-opacity">Contact Us</Link>
                </div>

                {/* Book Now Button */}
                <Link href="/book-appointment" className="btn btn-primary">
                    <span>Book Now</span>
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <ArrowRight size={14} className="text-black" />
                    </div>
                </Link>
            </div>
        </nav>
    );
}
