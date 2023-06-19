export declare class Block {
    private _node;
    constructor(provider?: string);
    private _setNode;
    getAll(): any;
    get(block: number | string): any;
    getOperations(block: number): any;
}
