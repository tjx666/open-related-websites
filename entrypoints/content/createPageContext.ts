export interface PageContext {
    url: string;
    host: string;
    hasPackageJson: boolean;
    packageJsonLink?: string;
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

export async function createPageContext(): Promise<PageContext> {
    const url = location.href;

    const context: PageContext = {
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
            context.packageJsonLink = packageJsonLink;
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
