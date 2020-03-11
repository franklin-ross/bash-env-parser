/// <reference types="node" />
interface Options {
    shell?: import("child_process").SpawnOptions["shell"];
    isWindows?: boolean;
}
export declare function crossEnv(args: string | string[], options?: Options): import("child_process").ChildProcess | null;
export {};
