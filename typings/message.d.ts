import { RelatedWebsite } from '@/entrypoints/background/rules/BaseRule';
import { Command } from '@/lib/commands';
import { PackageJson } from 'type-fest';
import { ProtocolWithReturn } from 'webext-bridge';

import { RuleItem } from '@/entrypoints/background/services/getRules';

declare module 'webext-bridge' {
    export interface ProtocolMap {
        triggerCommand: ProtocolWithReturn<{ command: Command }, void>;

        getRelatedWebsites: ProtocolWithReturn<{ context: PageContext }, RelatedWebsite[]>;
        asyncUpdateRelatedWebsites: ProtocolWithReturn<
            { moreRelatedWebsites: RelatedWebsite[] },
            void
        >;

        getRules: ProtocolWithReturn<{}, RuleItem[]>;
    }
}
