import type { ResolveContext } from '../createContext';
import type { BaseAdapter, RelatedWebsite } from './BaseAdapter';

interface IdeWebsite {
    title: string;
    name: string;
    description: string;
    baseurl: string;
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
        baseurl: 'https://githubblitz.com/',
        platforms: ['github'],
        icon: '<img src="https://stackblitz.com/_astro/favicon.svg" />',
    },
    {
        title: 'CodeSandbox',
        name: 'codeSandbox',
        description: 'Import repository in CodeSandbox',
        baseurl: `https://codesandbox.io/s/${platform}/`,
        platforms: ['github'],
        icon: '<img src="https://codesandbox.io/codesandbox-16.png" />',
    },
    {
        title: 'Sourcegraph',
        name: 'sourcegraph',
        description: 'Allows developers to rapidly search, write, and understand code',
        baseurl: `https://sourcegraph.com/${platform}.com/`,
        platforms: ['github', 'gitlab'],
        icon: '<img src="https://sourcegraph.com/sourcegraph/sourcegraph-mark-touch-180.png" />',
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
                    name: ide.name,
                    title: ide.title,
                    description: ide.description,
                    icon: ide.icon.replace('<img', '<img width="16" height="16"'),
                    url: `${ide.baseurl}${context.repoPath}`,
                    openInNewTab: true,
                };
            });
    }
}
