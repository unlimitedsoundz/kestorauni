import * as React from "react";
import Image from "next/image";
import { Button, Link } from "@aalto-dx/react-components";
import { ArrowRight, CaretRight as ChevronRight, Calendar, MapPin, Notebook, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import { HomeCarousel } from "@/components/home/HomeCarousel";
import { HomeNewsEventsGrid } from "@/components/home/HomeNewsEventsGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://heffring.online/',
  },
};

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Heffring University",
            "alternateName": "Heffring University Helsinki Campus",
            "url": "https://heffring.online"
          })
        }}
      />

      {/* 1. HERO CAROUSEL */}
      <HomeCarousel />

      {/* 2. EXPLORE PROGRAMS & COURSES */}
      <section className="py-20 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-[#000000] uppercase tracking-tight">Explore Our Programs and Courses</h2>
            <p className="text-[#000000] font-semibold mt-2">Find the right academic path tailored to your goals at our Helsinki Campus.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Certificate Programs", desc: "Short, career-focused pathways for practical skill-building and fast entry into the workforce", href: "/degree-programmes#certificates" },
              { name: "Diploma Programs", desc: "Two-year applied study options with project-based learning and strong industry relevance", href: "/degree-programmes#diplomas" },
              { name: "Bachelor's & Master's Degrees", desc: "Flexible undergraduate and graduate study routes for academic and professional growth", href: "/degree-programmes" },
              { name: "Schools & Institutes", desc: "Discover the academic schools that shape our certificate, diploma and degree offerings", href: "/schools" },
              { name: "Programs A-Z", desc: "Browse all academic pathways, courses and credentials in one place", href: "/studies" },
              { name: "Helsinki Campus Info", desc: "Explore campus facilities, support services and study-life resources", href: "/contact" },
            ].map((card) => (
              <Link
                key={card.name}
                linkComponentProps={{ href: card.href }}
                className="group p-8 bg-white border border-neutral-100 flex flex-col justify-between hover:border-[#000000] hover:shadow-lg transition-all duration-300 no-underline"
              >
                <div>
                  <h3 className="text-xl font-bold text-[#000000] group-hover:text-[#000000] transition-colors">{card.name}</h3>
                  <p className="text-neutral-500 text-sm mt-2">{card.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-[#000000] font-bold text-xs uppercase tracking-wider">
                  <span>Explore</span>
                  <ChevronRight size={14} weight="bold" className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEWS & EVENTS GRID (ALQONQUIN STYLE, NO IMAGES) */}
      <section className="py-20 container mx-auto px-4">
        <HomeNewsEventsGrid />
      </section>


      {/* 5. STUDENT RESOURCE LINKS */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 border-b border-neutral-200 pb-4">
            <h2 className="text-2xl font-black text-[#000000] uppercase tracking-tight">Student Resource Hub</h2>
            <p className="text-neutral-500 text-sm">Quick access to campus programs, finance help, and student associations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Explore campus and book a tour", href: "/contact", icon: MapPin },
              { title: "Student Support Services", href: "/student-guide#support", icon: Notebook },
              { title: "KU Career Opportunities", href: "/careers", icon: GraduationCap },
              { title: "Financial Aid & Student Awards", href: "/admissions/tuition", icon: Calendar },
              { title: "Admissions Office Details", href: "/admissions", icon: GraduationCap },
              { title: "Students' Association Portal", href: "/student-guide", icon: Notebook },
            ].map((link, idx) => {
              const Icon = link.icon;
              return (
                <Link
                  key={idx}
                  linkComponentProps={{ href: link.href }}
                  className="group flex items-start gap-4 p-4 hover:bg-white border border-transparent hover:border-neutral-200 transition-all no-underline"
                >
                  <div className="p-3 bg-[#f5f5f5] text-[#000000] group-hover:bg-[#000000] group-hover:text-white transition-colors">
                    <Icon size={20} weight="bold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#000000] group-hover:text-[#000000] group-hover:underline transition-colors mt-1">
                      {link.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1">Navigate to page</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
