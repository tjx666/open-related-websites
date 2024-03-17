import { onMessage } from 'webext-bridge/background';

import { rules as builtinRules } from '../rules';

export interface RuleItem {
    name: string;
    description: string;
    isBuiltin: boolean;
    language: 'json' | 'javascript';
    details: string;
}

export async function getRules() {
    onMessage('getRules', async () => {
        return builtinRules.map<RuleItem>((rule) => {
            return {
                name: rule.name,
                description: rule.description,
                isBuiltin: true,
                language: 'javascript',
                details: '',
            };
        });
    });
}
