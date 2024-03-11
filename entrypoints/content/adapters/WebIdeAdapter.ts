import { omit } from 'lodash-es';

import type { ResolveContext } from '../createContext';
import type { BaseAdapter, RelatedWebsite } from './BaseAdapter';

interface IdeWebsite {
    title: string;
    name: string;
    description: string;
    url: string;
    platforms: string[];
    openInNewTab?: boolean;
    icon: string;
}

const platform = location.host.split('.')[0];
const ideWebsitesList: IdeWebsite[] = [
    {
        title: 'StackBlitz',
        name: 'stackBlitz',
        description: 'Import repository in StackBlitz',
        url: 'https://githubblitz.com/',
        platforms: ['github'],
        icon: 'https://stackblitz.com/_astro/favicon.svg',
    },
    {
        title: 'CodeSandbox',
        name: 'codeSandbox',
        description: 'Import repository in CodeSandbox',
        url: `https://codesandbox.io/s/${platform}/`,
        platforms: ['github'],
        icon: 'https://codesandbox.io/codesandbox-16.png',
    },
    {
        title: 'Sourcegraph',
        name: 'sourcegraph',
        description: 'Allows developers to rapidly search, write, and understand code',
        url: `https://sourcegraph.com/${platform}.com/`,
        platforms: ['github', 'gitlab'],
        icon: 'https://sourcegraph.com/sourcegraph/sourcegraph-mark-touch-180.png',
    },
];

export class WebIdeAdapter implements BaseAdapter {
    name = 'Web IDE';
    description = 'Quickly open the repository in web ide';
    matches = [/https:\/\/(github|gitlab)\.com\/.+\/.+/];

    resolve(context: ResolveContext): RelatedWebsite[] {
        return ideWebsitesList
            .filter((ide) => ide.platforms.includes(platform))
            .map((ide) => {
                return {
                    ...omit(ide, 'platform'),
                    url: `${ide.url}${context.repoPath}`,
                    openInNewTab: true,
                };
            });
    }
}
