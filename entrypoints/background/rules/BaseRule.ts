import type { ResolveContext } from '../createResolveContext';

export interface RelatedWebsite {
    name: string;
    title: string;
    description: string;
    icon?: string;
    url: string;
    openInNewTab: boolean;
}

export interface BaseRule {
    name: string;
    description: string;
    matches: RegExp[];
    resolve: (context: ResolveContext) => Promise<RelatedWebsite[]> | RelatedWebsite[];
}
