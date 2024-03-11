import type { PackageJson } from 'type-fest';
import { sendMessage } from 'webext-bridge/content-script';

export interface ResolveContext {
    url: string;
    host: string;
    hasPackageJson: boolean;
    _packageJson?: PackageJson;
    getPackageJson?: () => Promise<PackageJson>;
    repoPath?: string;
    github?: {
        repo?: {
            account: string;
            name: string;
            path: string;
        };
    };
    gitlab?: {
        repo?: {
            account: string;
            name: string;
            path: string;
        };
    };
}

export async function createContext(): Promise<ResolveContext> {
    const url = location.href;

    const context: ResolveContext = {
        url,
        host: location.host,
        hasPackageJson: false,
    };

    if (location.hostname === 'github.com') {
        context.github = {};
        const [account, name] = location.pathname.split('/').slice(1, 3);
        if (account && name) {
            context.github.repo = {
                account,
                name,
                path: `${account}/${name}`,
            };
            context.repoPath = context.github.repo.path;
        }

        const fileNamesLinks = document.querySelectorAll<HTMLLinkElement>(
            '[aria-labelledby=folders-and-files] .react-directory-row .react-directory-row-name-cell-large-screen .react-directory-filename-column .react-directory-truncate a',
        );
        let packageJsonLink: string | undefined;
        for (const link of fileNamesLinks) {
            if (link.textContent === 'package.json') {
                context.hasPackageJson = true;
                packageJsonLink = link.href.replace('/blob/', '/raw/');
                break;
            }
        }

        if (packageJsonLink) {
            context.getPackageJson = async () => {
                if (!context._packageJson) {
                    context._packageJson = await sendMessage(
                        'getNpmPackageJson',
                        {
                            url: packageJsonLink,
                        },
                        'background',
                    );
                }
                return context._packageJson;
            };
        }
    } else if (location.hostname === 'gitlab.com') {
        context.gitlab = {};
        const [account, name] = location.pathname.split('/').slice(1, 3);
        if (account && name) {
            context.gitlab.repo = {
                account,
                name,
                path: `${account}/${name}`,
            };
            context.repoPath = context.gitlab.repo.path;
        }
    }

    return context;
}
