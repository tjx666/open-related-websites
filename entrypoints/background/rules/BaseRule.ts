import type { RelatedWebsite } from 'webext-bridge';

import type { ResolveContext } from '../createResolveContext';

export interface BaseRule {
    name: string;
    description: string;
    matches: RegExp[];
    resolve: (context: ResolveContext) => Promise<RelatedWebsite[]> | RelatedWebsite[];
}
