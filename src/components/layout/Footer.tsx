'use client';

import { Link } from "@aalto-dx/react-components"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui/Logo"
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react"

export function Footer() {
    const pathname = usePathname();
    const isPortalOrAdmin = pathname.startsWith('/portal') || pathname.startsWith('/admin')
    const isNewsPage = pathname === '/news'

    if (isPortalOrAdmin) return null;
    return (
        <>
            <footer className="bg-[#000000] text-[#f5f5f5]">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 pt-16 pb-10">

                {/* Top Row: Brand + Social */}
                <div className="mb-12 pb-10 border-b border-white/10">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <Logo className="h-10 md:h-12 text-white mb-3" />
                        </div>
                    </div>
                </div>

                {/* Link Columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 mb-12">

                    {/* Study */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest mb-5 text-white">Study</h3>
                        <ul className="space-y-3">
                            <li><Link href="/studies" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">All Courses</Link></li>
                            <li><Link href="/admissions" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">Admissions</Link></li>
                            <li><Link href="/admissions/tuition" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">Scholarships</Link></li>
                            <li><Link href="/student-guide/international" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">International Students</Link></li>
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest mb-5 text-white">About</h3>
                        <ul className="space-y-3">
                            <li><Link href="/about-kestora-university" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">Our Story</Link></li>
                            <li><Link href="/news" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">News & Events</Link></li>
                            <li><Link href="/research" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">Research</Link></li>
                            <li><Link href="/student-life" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">Campus Life</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest mb-5 text-white">Resources</h3>
                        <ul className="space-y-3">
                            <li><Link href="/admissions-policy" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">Admissions Policy</Link></li>
                            <li><Link href="/academic-regulations" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">Academic Regulations</Link></li>
                            <li><Link href="/student-handbook" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">Student Handbook</Link></li>
                            <li><Link href="/refund-withdrawal-policy/" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">Refund Policy</Link></li>
                            <li><Link href="/code-of-conduct" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">Code of Conduct</Link></li>
                            <li><Link href="/alumni" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">Alumni</Link></li>
                            <li><Link href="/portal/support" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">IT Support</Link></li>
                            <li><Link href="/contact" className="text-neutral-300 text-sm hover:text-white transition-colors no-underline">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest mb-5 text-white">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-neutral-300 text-sm">
                                <MapPin size={16} className="shrink-0 text-neutral-400 mt-0.5" />
                                <div className="space-y-2">
                                    <span className="block font-semibold text-white">Kestora University – Helsinki Campus</span>
                                    <span className="block text-xs">Pohjoisesplanadi 51,</span>
                                    <span className="block text-xs">00150 Helsinki, Uusimaa</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3 text-neutral-300 text-sm">
                                <Phone size={16} className="shrink-0 text-neutral-400" />
                                <a href="tel:+16137274723" className="hover:text-white transition-colors no-underline">+1 (613) 727-4723</a>
                            </li>
                            <li className="flex items-center gap-3 text-neutral-300 text-sm">
                                <EnvelopeSimple size={16} className="shrink-0 text-neutral-400" />
                                <a href="mailto:info@kestora.online" className="hover:text-white transition-colors no-underline">info@kestora.online</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-neutral-400/60 text-xs order-2 md:order-1">
                            © 2026 Kestora University. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 order-1 md:order-2">
                            <Link href="/site-index" className="text-neutral-400/60 text-xs hover:text-white transition-colors no-underline">Site Index</Link>
                            <Link href="/privacy" className="text-neutral-400/60 text-xs hover:text-white transition-colors no-underline">Privacy Policy</Link>
                            <Link href="/terms" className="text-neutral-400/60 text-xs hover:text-white transition-colors no-underline">Terms of Use</Link>
                            <Link href="/cookies" className="text-neutral-400/60 text-xs hover:text-white transition-colors no-underline">Cookie Policy</Link>
                            <Link href="/accessibility" className="text-neutral-400/60 text-xs hover:text-white transition-colors no-underline">Accessibility</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}
