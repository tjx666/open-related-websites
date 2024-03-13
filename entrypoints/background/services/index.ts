import { getRelatedWebsites } from './getRelatedWebsites';

export async function registerServices() {
    await getRelatedWebsites();
}
