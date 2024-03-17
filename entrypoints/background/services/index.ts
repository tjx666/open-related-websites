import { getRelatedWebsites } from './getRelatedWebsites';
import { getRules } from './getRules';

export async function registerServices() {
    getRelatedWebsites();
    getRules();
}
