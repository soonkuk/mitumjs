import { RangeConfig } from "./config.js";
export type ErrorCode = (typeof ECODE)[keyof typeof ECODE] | (typeof ECODE.CURRENCY)[keyof typeof ECODE.CURRENCY];
export declare const ECODE: {
    readonly UNKNOWN: "EC_UNKNOWN";
    readonly INVALID_SEED: "EC_INVALID_SEED";
    readonly INVALID_KEY: "EC_INVALID_KEY";
    readonly INVALID_KEYS: "EC_INVALID_KEYS";
    readonly INVALID_KEY_PAIR: "EC_INVALID_KEY_PAIR";
    readonly INVALID_PRIVATE_KEY: "EC_INVALID_PRIVATE_KEY";
    readonly INVALID_PUBLIC_KEY: "EC_INVALID_PUBLIC_KEY";
    readonly INVALID_WEIGHT: "EC_INVALID_WEIGHT";
    readonly INVALID_THRESHOLD: "EC_INVALID_THRESHOLD";
    readonly INVALID_ADDRESS: "EC_INVALID_ADDRESS";
    readonly INVALID_ADDRESS_TYPE: "EC_INVALID_ADDRESS_TYPE";
    readonly INVALID_BIG_INTEGER: "EC_INVALID_BIG_INTERGER";
    readonly INVALID_FLOAT: "EC_INVALID_FLOAT";
    readonly INVALID_HINT: "EC_INVALID_HINT";
    readonly INVALID_TOKEN: "EC_INVALID_TOKEN";
    readonly INVALID_CURRENCY_ID: "EC_INVALID_CURRENCY_ID";
    readonly INVALID_CONTRACT_ID: "EC_INVALID_CONTRACT_ID";
    readonly INVALID_NETWORK_ID: "EC_INVALID_NETWORK_ID";
    readonly INVALID_VERSION: "EC_INVALID_VERSION";
    readonly INVALID_ITEM: "EC_INVALID_ITEM";
    readonly INVALID_ITEMS: "EC_INVALID_ITEMS";
    readonly INVALID_FACTSIGN: "EC_INVALID_FACTSIGN";
    readonly INVALID_FACTSIGNS: "EC_INVALID_FACTSIGNS";
    readonly INVALID_SIG_TYPE: "EC_INVALID_SIG_TYPE";
    readonly INVALID_FACT: "EC_INVALID_FACT";
    readonly INVALID_OPERATION: "EC_INVALID_OPERATION";
    readonly INVALID_OPERATIONS: "EC_INVALID_OPERATIONS";
    readonly INVALID_SEAL: "EC_INVALID_SEAL";
    readonly INVALID_AMOUNT: "EC_INVALID_AMOUNT";
    readonly INVALID_AMOUNTS: "EC_INVALID_AMOUNTS";
    readonly INVALID_RATIO: "EC_INVALID_RATIO";
    readonly NOT_IMPLEMENTED_BUFFER: "EC_NOT_IMPLEMENTED_BUFFER";
    readonly NOT_IMPLEMENTED_HINTED_OBJECT: "EC_NOT_IMPLEMENTED_HINTED_OBJECT";
    readonly NOT_IMPLEMENTED_METHOD: "EC_NOT_IMPLEMENTED_METHOD";
    readonly FAIL_FILE_CREATION: "EC_FAIL_FILE_CREATION";
    readonly FAIL_SIGN: "EC_FAIL_SIGN";
    readonly CURRENCY: {
        readonly INVALID_CURRENCY_FEEER: "EC_INVALID_CURRENCY_FEEER";
        readonly INVALID_CURRENCY_POLICY: "EC_INVALID_CURRENCY_POLICY";
        readonly INVALID_CURRENCY_DESIGN: "EC_INVALID_CURRENCY_DESIGN";
    };
};
export declare class MitumError extends Error {
    private _code;
    constructor(code: ErrorCode, msg?: string);
    get code(): ErrorCode;
    static new(): MitumError;
    static detail(code?: ErrorCode, msg?: string): MitumError;
}
export declare class Assert {
    private condition;
    private error;
    constructor(condition: boolean, error: MitumError);
    static get(condition: boolean, error?: MitumError): Assert;
    static check(condition: boolean, error?: MitumError): void;
    not(): this;
    true(): this;
    false(): this;
    excute(): void;
}
export declare class StringAssert {
    private readonly s;
    private condition;
    private error;
    private constructor();
    static with(s: string, error?: MitumError): StringAssert;
    private union;
    not(): this;
    empty(): this;
    equal(s: string): this;
    startsWith(...pre: string[]): this;
    endsWith(...suf: string[]): this;
    satisfyConfig(config: RangeConfig): this;
    chainAnd(...conditions: boolean[]): this;
    chainOr(...conditions: boolean[]): this;
    excute(): void;
}
