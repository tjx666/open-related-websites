import type { ResolveContext } from '../createContext';
import type { BaseAdapter, RelatedWebsite } from './BaseAdapter';

export class NpmPackageAnalysisAdapter implements BaseAdapter {
    name = 'Repository Analysis';
    description = 'Provide some tool website to analyze the git repository';
    matches = [/https:\/\/github\.com\/.+\/.+/, /https:\/\/www\.npmjs\.com\/package\/.+/];

    async resolve(context: ResolveContext): Promise<RelatedWebsite[]> {
        if (!context.hasPackageJson) return [];

        const pkg = await context.getPackageJson!();
        const npmImage = 'https://static-production.npmjs.com/da3ab40fb0861d15c83854c29f5f2962.png';
        return [
            {
                title: 'Npm Trends',
                name: 'npmTrends',
                description: 'Compare NPM package downloads',
                url: 'https://npmtrends.com/',
                icon: '<img src="https://npmtrends.com/images/logos/npm_trends_logo.png" />',
            },
            {
                title: 'Npm View',
                name: 'npmView',
                description: 'A web application to view npm package files',
                url: 'https://npmview.vercel.app/',
                icon: `<img src="${npmImage}" />`,
            },
            {
                title: 'Package Phobia',
                name: 'packagePhobia',
                description: '⚖️ Find the cost of adding a new dependency to your project',
                url: 'https://packagephobia.com/result?p=',
                icon: '<img src="https://packagephobia.com/favicon-16x16.png" />',
            },
            {
                title: 'Npm Graph',
                name: 'npmgraph',
                description: 'A tool for exploring NPM modules and dependencies',
                url: 'https://npmgraph.js.org/?q=',
                icon: '<img src="https://npmgraph.js.org/favicon.1b75a10a.png" />',
            },
            {
                title: 'Bundlephobia',
                name: 'bundlephobia',
                description: 'Find the cost of adding a npm package to your bundle',
                url: 'https://bundlephobia.com/package/',
                icon: '<img src="https://bundlephobia.com/favicon-16x16.png?l=3" />',
            },
            {
                title: 'Npm Charts',
                name: 'npmcharts',
                description: 'Compare npm package downloads over time',
                url: 'https://npmcharts.com/compare/',
                icon: '<img src="https://npmcharts.com/favicon-16x16.png" />',
            },
            {
                title: 'Npm Stats',
                name: 'npmStat',
                description: 'Download statistics for npm packages',
                url: 'https://npm-stat.com/charts.html?package=',
                icon: '<img src="https://npm-stat.com/favicon.ico" />',
            },
            {
                title: 'Moiva',
                name: 'moiva',
                description:
                    'A Universal tool to Evaluate, Discover alternatives and Compare Software projects',
                url: 'https://moiva.io/?npm=',
                icon: '<img src="https://moiva.io/favicon/favicon-16x16.png?v=lkvYMB9erB" />',
            },
            {
                title: 'RunKit',
                name: 'runKit',
                description: 'Try any Node.js package right in your browser',
                url: 'https://npm.runkit.com/',
                icon: '<img src="https://npm.runkit.com/apple-touch-icon-120x120-precomposed.png" />',
            },
        ].map((item) => {
            return {
                ...item,
                url: `${item.url}${pkg.name}`,
                icon: item.icon.replace('<img', '<img width="16" height="16"'),
                openInNewTab: true,
            };
        });
    }
}
