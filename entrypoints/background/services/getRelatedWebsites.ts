import { onMessage, sendMessage } from 'webext-bridge/background';

import { createResolveContext } from '../createResolveContext';
import { rules } from '../rules';
import type { RelatedWebsite } from '../rules/BaseRule';

export async function getRelatedWebsites() {
    onMessage('getRelatedWebsites', async ({ data, sender }) => {
        const context = await createResolveContext(data.context);
        const matchedRules = rules.filter((rule) =>
            rule.matches.some((regexp) => regexp.test(context.url)),
        );
        const relatedWebsites: RelatedWebsite[] = [];
        const activeTabId = sender.tabId;
        for (const rule of matchedRules) {
            const promiseOrSites = rule.resolve(context);
            if ('then' in promiseOrSites) {
                promiseOrSites.then((sites) => {
                    sendMessage(
                        'asyncUpdateRelatedWebsites',
                        {
                            moreRelatedWebsites: sites,
                        },
                        `content-script@${activeTabId}`,
                    );
                });
            } else {
                relatedWebsites.push(...promiseOrSites);
            }
        }

        return relatedWebsites;
    });
}
