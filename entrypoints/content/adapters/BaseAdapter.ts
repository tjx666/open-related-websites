export interface ResolveContext {}

export interface RelatedWebsite {
    name: string;
    title: string;
    description: string;
    icon: string;
    url: string;
}

export interface BaseAdapter {
    matches: RegExp[];
    resolve(context: ResolveContext): RelatedWebsite[];
}
