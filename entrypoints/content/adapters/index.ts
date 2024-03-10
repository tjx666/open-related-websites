import { RepoAnalysisAdapter } from './RepoAnalysisAdapter';
import { VSCodeAdapter } from './VSCodeAdapter';
import { WebIdeAdapter } from './WebIdeAdapter';

export const adapters = [new WebIdeAdapter(), new RepoAnalysisAdapter(), new VSCodeAdapter()];
