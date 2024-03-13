import { RelatedWebsite } from '@/entrypoints/background/rules/BaseRule';
import { Command } from '@/lib/commands';
import { PackageJson } from 'type-fest';
import { ProtocolWithReturn } from 'webext-bridge';

declare module 'webext-bridge' {
    export interface ProtocolMap {
        getNpmPackageJson: ProtocolWithReturn<{ url: string }, PackageJson>;
        triggerCommand: ProtocolWithReturn<{ command: Command }, void>;

        getRelatedWebsites: ProtocolWithReturn<{ context: PageContext }, RelatedWebsite[]>;
        asyncUpdateRelatedWebsites: ProtocolWithReturn<
            { moreRelatedWebsites: RelatedWebsite[] },
            void
        >;
    }
}
