import * as React from "react";
import Image from "next/image";
import { Button, Link } from "@aalto-dx/react-components";
import { ArrowRight, CaretRight as ChevronRight, Calendar, MapPin, Notebook, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import { HomeCarousel } from "@/components/home/HomeCarousel";
import { HomeNewsEventsGrid } from "@/components/home/HomeNewsEventsGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://cannogacollege.ca/',
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
            "name": "Cannoga College",
            "alternateName": "Cannoga College Ottawa",
            "url": "https://cannogacollege.ca"
          })
        }}
      />

      {/* 1. HERO CAROUSEL */}
      <HomeCarousel />

      {/* 2. EXPLORE PROGRAMS & COURSES */}
      <section className="py-20 bg-[#f7f4fc]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-[#2e1150] uppercase tracking-tight">Explore Our Programs and Courses</h2>
            <p className="text-[#5c2d91] font-semibold mt-2">Find the right academic path tailored to your goals at our Ottawa Campus.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Programs A-Z", desc: "Browse all Bachelor's and Master's degrees", href: "/studies" },
              { name: "Credential Types", desc: "Explore academic certs and degrees", href: "/admissions" },
              { name: "Areas of Interest", desc: "Find courses based on your passions", href: "/schools" },
              { name: "Schools & Institutes", desc: "Discover our four specialized faculties", href: "/schools" },
              { name: "Ottawa Campus Info", desc: "Explore facilities and student hubs", href: "/contact" },
              { name: "Courses A-Z", desc: "Detailed schedule and syllabus search", href: "/studies" },
            ].map((card) => (
              <Link
                key={card.name}
                linkComponentProps={{ href: card.href }}
                className="group p-8 bg-white border border-neutral-100 flex flex-col justify-between hover:border-[#5c2d91] hover:shadow-lg transition-all duration-300 no-underline"
              >
                <div>
                  <h3 className="text-xl font-bold text-[#2e1150] group-hover:text-[#5c2d91] transition-colors">{card.name}</h3>
                  <p className="text-neutral-500 text-sm mt-2">{card.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-[#5c2d91] font-bold text-xs uppercase tracking-wider">
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
            <h2 className="text-2xl font-black text-[#2e1150] uppercase tracking-tight">Student Resource Hub</h2>
            <p className="text-neutral-500 text-sm">Quick access to campus programs, finance help, and student associations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Explore campus and book a tour", href: "/contact", icon: MapPin },
              { title: "Student Support Services", href: "/student-guide#support", icon: Notebook },
              { title: "CU Career Opportunities", href: "/careers", icon: GraduationCap },
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
                  <div className="p-3 bg-[#f7f4fc] text-[#5c2d91] group-hover:bg-[#5c2d91] group-hover:text-white transition-colors">
                    <Icon size={20} weight="bold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2e1150] group-hover:text-[#5c2d91] group-hover:underline transition-colors mt-1">
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

      {/* 6. GET CONNECTED SOCIAL FEED */}
      <section className="py-20 container mx-auto px-4">
        <div className="mb-12 border-b border-neutral-100 pb-4">
          <h2 className="text-2xl font-black text-[#2e1150] uppercase tracking-tight">Get Connected</h2>
          <p className="text-neutral-500 text-sm">Follow the life and vibe of Cannoga College in Ottawa.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              type: "CU Blog",
              title: "My Student Journey to Ottawa",
              desc: "Read Elena's story about housing, winter sports, and adjusting to Canadian college life.",
              img: "/images/school-arts.png",
              href: "https://ourblogs.cannogacollege.ca/"
            },
            {
              type: "Instagram",
              title: "@CannogaOttawa Vibe",
              desc: "Snapshots of our dynamic creative design gallery opening at the Ottawa campus exhibition hall.",
              img: "/images/school-business.png",
              href: "/student-life"
            },
            {
              type: "X / Twitter",
              title: "Campus Updates",
              desc: "Announcement: IT Hackathon starts this Friday! Register your team at our Technology department.",
              img: "/images/school-technology.png",
              href: "/news"
            },
            {
              type: "YouTube",
              title: "Ottawa Campus Tour",
              desc: "Watch our guided video tour highlighting the labs, digital library, and recreation areas.",
              img: "/images/arrival-hero.png",
              href: "/about-cannoga-college"
            }
          ].map((feed, idx) => (
            <Link
              key={idx}
              linkComponentProps={{ href: feed.href }}
              className="group flex flex-col bg-white border border-neutral-100 overflow-hidden hover:border-[#5c2d91] transition-all no-underline"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={feed.img}
                  alt={feed.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <span className="absolute top-2 left-2 bg-[#5c2d91] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 z-10">
                  {feed.type}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[#2e1150] group-hover:text-[#5c2d91] transition-colors">{feed.title}</h4>
                  <p className="text-neutral-500 text-xs mt-2 leading-relaxed">{feed.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs text-[#5c2d91] font-bold uppercase tracking-wider">
                  <span>View Feed</span>
                  <ChevronRight size={12} weight="bold" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
