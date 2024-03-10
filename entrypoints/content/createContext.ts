export interface ResolveContext {
    url: string;
    github?: {
        repo?: {
            account: string;
            name: string;
            path: string;
        };
    };
}

export function createContext(): ResolveContext {
    const url = location.href;

    const context: ResolveContext = {
        url,
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
        }
    }

    return context;
}
