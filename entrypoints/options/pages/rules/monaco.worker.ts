import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// eslint-disable-next-line import/default
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
    getWorker(_: any, label: string) {
        if (label === 'json') {
            return new JsonWorker();
        }

        if (label === 'typescript' || label === 'javascript') {
            return new TsWorker();
        }

        return new EditorWorker();
    },
};

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
