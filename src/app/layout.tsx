import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { MainLayoutWrapper } from "@/components/layout/MainLayoutWrapper";

// next/font/google is disabled because build-time font fetching fails in this environment.
// We use a standard Google Fonts link in the <head> instead.
const inter = { variable: "font-inter-var" };
const playfair = { variable: "font-playfair-var" };




export const metadata: Metadata = {
    metadataBase: new URL('https://heffring.online'),
    title: {
        default: "Heffring University – Helsinki, Finland",
        template: "%s | Heffring University"
    },
    description: "Heffring University is a dynamic and career-focused institution located in Helsinki, Finland. The university is committed to providing high-quality education through a wide range of Diploma, Degree, and Certificate programs.",
    applicationName: "Heffring University",
    appleWebApp: {
        title: "Heffring University",
        statusBarStyle: "default",
        capable: true,
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' }
        ],
        apple: [
            { url: '/favicon.ico', sizes: '180x180', type: 'image/x-icon' }
        ]
    },

    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://heffring.online',
        siteName: 'Heffring University',
        title: 'Heffring University – Helsinki, Finland',
        description: "Heffring University is a dynamic and career-focused institution located in Helsinki, Finland. The university is committed to providing high-quality education through a wide range of Diploma, Degree, and Certificate programs.",
        images: [
            {
                url: '/images/logo-heffring.png',
                width: 800,
                height: 600,
                alt: 'Heffring University Logo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Heffring University – Helsinki, Finland',
        description: "Heffring University is a dynamic and career-focused institution located in Helsinki, Finland. The university is committed to providing high-quality education through a wide range of Diploma, Degree, and Certificate programs.",
        images: ['/images/logo-heffring.png'],
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@400..900&family=Rubik:wght@300..900&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/metropolis.min.css" />
                <style dangerouslySetInnerHTML={{ __html: `
                    :root {
                        --font-inter: 'Metropolis', sans-serif;
                        --font-playfair: 'Metropolis', sans-serif;
                    }
                ` }} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "UniversityOrUniversity",
                            "name": "Heffring University",
                            "description": "Heffring University is a dynamic and career-focused institution located in Helsinki, Finland.",
                            "alternateName": "Heffring University Helsinki Campus",
                            "url": "https://www.heffring.online",
                            "logo": "https://www.heffring.online/images/logo-heffring.png",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Kaarrostie 38",
                                "addressLocality": "Helsinki",
                                "postalCode": "00960",
                                "addressRegion": "Uusimaa",
                                "addressCountry": "FI"
                            },
                            "location": {
                                "@type": "Place",
                                "name": "Helsinki, Finland"
                            },
                            "sameAs": [
                                "https://www.tiktok.com/@heffringuniversity"
                            ],
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+1-613-727-4723",
                                "contactType": "admissions",
                                "email": "admissions@heffring.online"
                            }
                        })
                    }}
                />
            </head>

            <body className="font-sans antialiased">
                <AuthProvider>
                    <Header />
                    <MainLayoutWrapper>
                        {children}
                    </MainLayoutWrapper>
                    <Footer />
                    <CookieConsent />
                </AuthProvider>
            </body>
        </html>
    );
}

