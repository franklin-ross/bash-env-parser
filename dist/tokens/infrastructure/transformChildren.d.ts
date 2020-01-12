import { TransformChildren } from "./Symbols";
interface IHaveChildren {
    [TransformChildren](transformer: (item: any) => any): this;
}
/** Transform an array, returning a new array if any children change. */
export declare function transformChildren<T>(value: T[], transformer: (item: any) => any): T[];
/** If the value provides support for transforming it's children, then transform them. */
export declare function transformChildren<T extends IHaveChildren>(value: T, transformer: (item: any) => any): T;
/** Transform an object's children if it supports it. */
export declare function transformChildren(value: any, transformer: (item: any) => any): any;
export {};
