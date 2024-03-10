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
        icon: '<svg width="16" height="16" viewBox="0 0 25 33" style="vertical-align:sub"><path fill="var(--color-fg-default)" fill-rule="nonzero" stroke="none" stroke-width="1" d="M0 19.9187087L9.87007874 19.9187087 4.12007874 34 23 13.9612393 13.0846457 13.9612393 18.7893701 0z"></path></svg>',
    },
    {
        title: 'CodeSandbox',
        name: 'codeSandbox',
        description: 'Import repository in CodeSandbox',
        baseurl: `https://codesandbox.io/s/${platform}/`,
        platforms: ['github'],
        icon: '<svg width="16" height="16" viewBox="0 0 222 252" fill="none" style="vertical-align:sub"><path d="M7.21906 55.4205L104.143 2.63078C109.425 -0.246393 115.823 -0.172544 121.038 2.8258L214.465 56.5439C218.759 59.0125 221.405 63.5875 221.405 68.5401V182.652C221.405 187.615 218.747 192.199 214.438 194.663L117.637 250.034C113.346 252.488 108.072 252.467 103.8 249.979L6.87245 193.515C2.61721 191.036 0 186.483 0 181.558V67.5728C0 62.5058 2.76932 57.8441 7.21906 55.4205Z" fill="var(--color-fg-default)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M110.695 126.451V235.33C112.591 235.33 113.837 234.919 115.539 233.947L202.722 184.128C206.163 182.156 207.567 179.101 207.567 175.133V74.1121C207.567 72.1218 207.148 70.931 206.181 69.2687L113.484 121.645C111.76 122.63 110.695 124.465 110.695 126.451ZM159.13 188.972C159.13 191.739 158.093 193.123 155.67 194.507L126.609 211.113C124.534 212.496 121.766 211.805 121.766 209.037V135.001C121.766 133.021 123.509 130.454 125.225 129.466L191.651 91.4103C193.496 90.3484 195.11 92.0491 195.11 94.178V133.618C195.11 135.662 194.146 137.499 192.342 138.461L162.59 154.375C160.786 155.337 159.13 157.174 159.13 159.219V188.972Z" fill="#999999"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.8252 175.131V74.1108C13.8252 70.138 15.9113 66.395 19.3606 64.4238L103.775 16.6811C105.594 15.7173 108.618 15.2973 110.695 15.2973C112.771 15.2973 115.973 15.8114 117.614 16.6811L201.337 64.4238C202.993 65.4026 205.243 67.6571 206.18 69.2674L113.462 121.854C111.738 122.839 110.695 124.711 110.695 126.697V235.329C108.799 235.329 106.861 234.917 105.159 233.945L20.0525 184.819C16.6031 182.847 13.8252 179.104 13.8252 175.131ZM26.2798 94.1766V133.616C26.2798 136.384 26.9718 137.768 29.7395 139.152L58.8003 155.758C61.5679 157.142 62.2599 159.217 62.2599 161.293V188.97C62.2599 191.737 62.9518 193.121 65.7195 194.506L94.7803 211.112C97.5477 212.496 99.6238 211.804 99.6238 209.036V135.001C99.6238 132.924 98.9318 130.848 96.1646 129.465L31.1233 92.1008C29.0475 90.717 26.2798 91.4089 26.2798 94.1766ZM139.756 47.1258L114.154 61.6561C112.079 63.04 109.311 63.04 107.235 61.6561L81.6337 47.1258C79.9485 46.1733 77.7863 46.1781 76.0983 47.1258L44.2699 65.1158C41.5022 66.4997 41.5022 69.2674 44.2699 70.6512L107.926 107.323C109.63 108.298 111.759 108.298 113.462 107.323L177.119 70.6512C179.195 69.2674 179.887 66.4997 177.119 65.1158L145.291 47.1258C143.603 46.1781 141.441 46.1733 139.756 47.1258Z" fill="#F2F2F2"></path></svg>',
    },
    {
        title: 'Sourcegraph',
        name: 'sourcegraph',
        description: 'Allows developers to rapidly search, write, and understand code',
        baseurl: `https://sourcegraph.com/${platform}.com/`,
        platforms: ['github', 'gitlab'],
        icon: '<svg width="16" height="16" viewBox="0 0 65 64" style="vertical-align:sub"><path d="M19.5809 8.42498L33.4692 59.2756C34.4044 62.6921 37.9254 64.7045 41.3365 63.772C44.7477 62.8342 46.7547 59.3051 45.8222 55.8886L31.9312 5.03529C30.996 1.61881 27.475 -0.393568 24.0639 0.541611C20.6554 1.47679 18.6457 5.00582 19.5809 8.42498Z" fill="var(--color-fg-default)"></path><path d="M45.2995 8.23211L10.5184 47.5659C8.17375 50.2187 8.41759 54.2756 11.065 56.6256C13.7125 58.9756 17.7587 58.7291 20.1033 56.0763L54.8845 16.7425C57.2291 14.0897 56.9853 10.0355 54.3378 7.68548C51.6904 5.33547 47.6469 5.57931 45.2995 8.23211Z" fill="var(--color-fg-default)"></path><path d="M5.89199 30.0308L55.494 46.4621C58.8515 47.5768 62.4716 45.7493 63.5837 42.3864C64.6957 39.0208 62.8709 35.3927 59.516 34.2833L9.91138 17.844C6.55385 16.7346 2.93372 18.5568 1.82437 21.9223C0.712335 25.2879 2.53446 28.9161 5.89199 30.0308Z" fill="var(--color-fg-default)"></path></svg>',
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
                    icon: ide.icon,
                    url: `${ide.baseurl}${context.repoPath}`,
                    openInNewTab: true,
                };
            });
    }
}
