'use client';

import { useEffect, useState, useMemo, type ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client';
import FAQ, { type FAQItem } from '@/components/FAQ';

interface DbFAQProps {
    pageSlug: string;
    fallbackFaqs?: FAQItem[];
    refreshKey?: string | number;
}

export default function DbFAQ({ pageSlug, fallbackFaqs, refreshKey }: DbFAQProps) {
    const sanitize = (text: string) => {
        if (pageSlug === 'admissions/tuition') {
            return text
                .replace(/Flywire/gi, 'our secure payment gateway')
                .replace(/https:\/\/www\.flywire\.com\//gi, '#');
        }
        return text;
    };

    const [faqs, setFaqs] = useState<FAQItem[]>(() => {
        const items = fallbackFaqs || [];
        if (pageSlug === 'admissions/tuition') {
            return items.map(faq => ({
                ...faq,
                question: sanitize(faq.question),
                answer: sanitize(faq.answer as string)
            }));
        }
        return items;
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const supabase = useMemo(() => typeof window !== 'undefined' ? createClient() : null, []);

    useEffect(() => {
        if (!supabase) return;
        let mounted = true;

        async function loadFaqs() {
            setLoading(true);
            setError(null);

            try {
                const { data: pageData, error: pageError } = await supabase!
                    .from('faq_pages')
                    .select('id')
                    .eq('slug', pageSlug)
                    .single();

                if (pageError || !pageData || !supabase) {
                    if (mounted) setLoading(false);
                    return;
                }

                const { data: faqData, error: faqError } = await supabase
                    .from('faq')
                    .select('id, question, answer, order_index')
                    .eq('page_id', pageData.id)
                    .eq('is_published', true)
                    .order('order_index');

                if (!faqError && mounted) {
                    const sanitizedFaqs = (faqData || []).map(faq => ({
                        ...faq,
                        question: sanitize(faq.question),
                        answer: sanitize(faq.answer)
                    }));
                    setFaqs(sanitizedFaqs);
                }
            } catch (loadError) {
                console.error('Failed to load FAQs:', loadError);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }
        loadFaqs();

        return () => {
            mounted = false;
        };
    }, [pageSlug, refreshKey]);

    const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs || [];

    if (loading) {
        return (
            <div className="bg-white p-8 text-center text-black">
                Loading FAQs...
            </div>
        );
    }

    if (error && displayFaqs.length === 0) {
        return (
            <div className="bg-white p-8 text-center text-black">
                {error}
            </div>
        );
    }

    return <FAQ faqs={displayFaqs} />;
}
