import type { ResolveContext } from '../createContext';

export interface RelatedWebsite {
    name: string;
    title: string;
    description: string;
    icon?: string;
    url: string;
    openInNewTab: boolean;
}

export interface BaseAdapter {
    name: string;
    description: string;
    matches: RegExp[];
    resolve(context: ResolveContext): RelatedWebsite[];
}
