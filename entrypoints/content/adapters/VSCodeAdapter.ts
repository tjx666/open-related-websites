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
                icon: '<svg width="16" height="16" viewBox="0 0 276 276" style="vertical-align:sub"><g><path d="M246.94 27.6383L194.193 2.24138C188.088 -0.698302 180.791 0.541721 175.999 5.33332L3.32371 162.773C-1.32082 167.008 -1.31548 174.32 3.33523 178.548L17.4399 191.37C21.2421 194.827 26.9682 195.081 31.0619 191.976L239.003 34.2269C245.979 28.9347 255.999 33.9103 255.999 42.6667V42.0543C255.999 35.9078 252.478 30.3047 246.94 27.6383Z" fill="var(--color-fg-default)"/><g><path d="M246.94 228.362L194.193 253.759C188.088 256.698 180.791 255.458 175.999 250.667L3.32371 93.2272C-1.32082 88.9925 -1.31548 81.6802 3.33523 77.4523L17.4399 64.6298C21.2421 61.1733 26.9682 60.9188 31.0619 64.0245L239.003 221.773C245.979 227.065 255.999 222.09 255.999 213.333V213.946C255.999 220.092 252.478 225.695 246.94 228.362Z" fill="var(--color-fg-default)"/></g><g><path d="M194.196 253.763C188.089 256.7 180.792 255.459 176 250.667C181.904 256.571 192 252.389 192 244.039V11.9606C192 3.61057 181.904 -0.571175 176 5.33321C180.792 0.541166 188.089 -0.700607 194.196 2.23648L246.934 27.5985C252.476 30.2635 256 35.8686 256 42.0178V213.983C256 220.132 252.476 225.737 246.934 228.402L194.196 253.763Z" fill="var(--color-fg-default)"/></g></g></svg>',
            },
            {
                title: 'Clone in VSCode Insiders',
                name: 'cloneInVSCodeInsiders',
                description: 'Clone the repo in local VSCode Insiders',
                url: `vscode-insiders://vscode.git/clone?url=https://github.com/`,
                icon: '<svg width="16" height="16" viewBox="0 0 276 276" style="vertical-align:sub"><g><path d="M246.94 27.6383L194.193 2.24138C188.088 -0.698302 180.791 0.541721 175.999 5.33332L3.32371 162.773C-1.32082 167.008 -1.31548 174.32 3.33523 178.548L17.4399 191.37C21.2421 194.827 26.9682 195.081 31.0619 191.976L239.003 34.2269C245.979 28.9347 255.999 33.9103 255.999 42.6667V42.0543C255.999 35.9078 252.478 30.3047 246.94 27.6383Z" fill="var(--color-fg-default)"/><g><path d="M246.94 228.362L194.193 253.759C188.088 256.698 180.791 255.458 175.999 250.667L3.32371 93.2272C-1.32082 88.9925 -1.31548 81.6802 3.33523 77.4523L17.4399 64.6298C21.2421 61.1733 26.9682 60.9188 31.0619 64.0245L239.003 221.773C245.979 227.065 255.999 222.09 255.999 213.333V213.946C255.999 220.092 252.478 225.695 246.94 228.362Z" fill="var(--color-fg-default)"/></g><g><path d="M194.196 253.763C188.089 256.7 180.792 255.459 176 250.667C181.904 256.571 192 252.389 192 244.039V11.9606C192 3.61057 181.904 -0.571175 176 5.33321C180.792 0.541166 188.089 -0.700607 194.196 2.23648L246.934 27.5985C252.476 30.2635 256 35.8686 256 42.0178V213.983C256 220.132 252.476 225.737 246.934 228.402L194.196 253.763Z" fill="var(--color-fg-default)"/></g></g></svg>',
            },
        ].map((item) => {
            return {
                ...item,
                url: `${item.url}${context.repoPath}`,
                openInNewTab: false,
            };
        });
    }
}
