import { PackageJson } from 'type-fest';
import { ProtocolWithReturn } from 'webext-bridge';

declare module 'webext-bridge' {
    export interface ProtocolMap {
        getNpmPackageJson: ProtocolWithReturn<
            {
                url: string;
            },
            PackageJson
        >;
    }
}
