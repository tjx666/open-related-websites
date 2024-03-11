import type { ResolveContext } from '../createContext';
import type { BaseAdapter, RelatedWebsite } from './BaseAdapter';

export class RepoAnalysisAdapter implements BaseAdapter {
    name = 'Repository Analysis';
    description = 'Provide some tool website to analyze the git repository';
    matches = [/https:\/\/github\.com\/.+\/.+/];

    resolve(context: ResolveContext): RelatedWebsite[] {
        return [
            {
                title: 'Active Forks',
                name: 'activeForks',
                description: 'Find the most active forks on GitHub',
                url: 'https://techgaun.github.io/active-forks/index.html#',
                icon: 'https://techgaun.github.io/active-forks/favicon.ico',
                openInNewTab: true,
            },
        ].map((item) => {
            return {
                ...item,
                url: `${item.url}${context.repoPath}`,
            };
        });
    }
}
