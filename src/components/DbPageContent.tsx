'use client';

import { createElement, useEffect, useState, useMemo } from 'react';
import { createClient } from '@/utils/supabase/client';

interface DbPageContentProps {
    pageSlug: string;
    sectionKey: string;
    fallbackContent: string;
    className?: string;
    tagName?: keyof JSX.IntrinsicElements;
    style?: React.CSSProperties;
    skipDbFetch?: boolean;
}

export default function DbPageContent({
    pageSlug,
    sectionKey,
    fallbackContent,
    className,
    tagName = 'div',
    style,
    skipDbFetch = false,
}: DbPageContentProps) {
    const sanitize = (text: string) => {
        if (pageSlug === 'admissions/tuition') {
            return text
                .replace(/Flywire/gi, 'our secure payment portal')
                .replace(/https:\/\/www\.flywire\.com\//gi, '#')
                .replace(/mailto:admissions@cannoga\.fi/gi, 'mailto:admissions@kestora.online')
                .replace(/admissions@cannoga\.fi/gi, 'admissions@kestora.online')
                .replace(/cannoga\.fi/gi, 'kestora.online')
                .replace(/https:\/\/www\.ontario\.ca\/page\/apply-ohip-and-get-health-card/gi, 'https://www.kela.fi/web/en')
                .replace(/Apply for OHIP at ServiceOntario/gi, 'Apply for Kela')
                .replace(/ServiceOntario/gi, 'Kela');
        }
        return text;
    };
    const [content, setContent] = useState(() => sanitize(fallbackContent));

    const supabase = useMemo(() => typeof window !== 'undefined' ? createClient() : null, []);

    useEffect(() => {
        if (!supabase || skipDbFetch) return;
        let mounted = true;

        async function loadPageContent() {
            try {
                const { data, error } = await supabase!
                    .from('page_content')
                    .select('content')
                    .eq('page_slug', pageSlug)
                    .eq('section_key', sectionKey)
                    .single();

                if (!error && data?.content && mounted) {
                    let sanitizedContent = data.content;
                    if (pageSlug === 'admissions/tuition') {
                        sanitizedContent = sanitizedContent
                            .replace(/Flywire/gi, 'our secure payment portal')
                            .replace(/https:\/\/www\.flywire\.com\//gi, '#')
                            .replace(/mailto:admissions@cannoga\.fi/gi, 'mailto:admissions@kestora.online')
                            .replace(/admissions@cannoga\.fi/gi, 'admissions@kestora.online')
                            .replace(/cannoga\.fi/gi, 'kestora.online')
                            .replace(/https:\/\/www\.ontario\.ca\/page\/apply-ohip-and-get-health-card/gi, 'https://www.kela.fi/web/en')
                            .replace(/Apply for OHIP at ServiceOntario/gi, 'Apply for Kela')
                            .replace(/ServiceOntario/gi, 'Kela');
                    }
                    setContent(sanitizedContent);
                }
            } catch (err) {
                console.error('Failed to load page content:', err);
            }
        }

        loadPageContent();

        return () => {
            mounted = false;
        };
    }, [pageSlug, sectionKey, supabase, skipDbFetch]);

    return createElement(tagName, {
        className: `${className || ''} ck-content`,
        style,
        dangerouslySetInnerHTML: { __html: content },
    });
}
