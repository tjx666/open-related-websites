import type { ResolveContext } from '../createContext';
import type { BaseAdapter, RelatedWebsite } from './BaseAdapter';

export class VSCodeAdapter implements BaseAdapter {
    name = 'VSCode';
    description = 'Provide some local VSCode features';
    matches = [/https:\/\/github\.com\/.+\/.+/];

    resolve(context: ResolveContext): RelatedWebsite[] {
        return [
            {
                title: 'Clone in VSCode',
                name: 'cloneInVSCode',
                description: 'Clone the repo in local VSCode',
                url: `vscode://vscode.git/clone?url=https://github.com/`,
                icon: '<img src="https://code.visualstudio.com/apple-touch-icon.png" />',
            },
            {
                title: 'Clone in VSCode Insiders',
                name: 'cloneInVSCodeInsiders',
                description: 'Clone the repo in local VSCode Insiders',
                url: `vscode-insiders://vscode.git/clone?url=https://github.com/`,
                icon: '<img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Visual_Studio_Code_Insiders_1.36_icon.svg" />',
            },
        ].map((item) => {
            return {
                ...item,
                url: `${item.url}${context.repoPath}`,
                icon: item.icon.replace('<img', '<img width="16" height="16"'),
                openInNewTab: false,
            };
        });
    }
}
