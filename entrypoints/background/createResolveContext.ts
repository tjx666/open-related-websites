import type { PackageJson } from 'type-fest';

import type { PageContext } from '../content/createPageContext';

export interface ResolveContext extends PageContext {
    getPackageJson?: () => Promise<PackageJson>;
}

export async function createResolveContext(pageContext: PageContext) {
    const resolveContext: ResolveContext = {
        ...pageContext,
    };
    if (pageContext.packageJsonLink) {
        resolveContext.getPackageJson = async function () {
            const resp = await fetch(pageContext.packageJsonLink!);
            return resp.json();
        };
    }
    return resolveContext;
}
