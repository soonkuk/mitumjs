export type RangeConfig = {
    value?: number;
    min: number;
    max: number;
    satisfy: (target: number) => boolean;
};
export declare const MitumConfig: {
    SUFFIX: {
        DEFAULT: RangeConfig;
        ZERO_ADDRESS: RangeConfig;
    };
    CURRENCY_ID: RangeConfig;
    CONTRACT_ID: RangeConfig;
    SEED: RangeConfig;
    THRESHOLD: RangeConfig;
    WEIGHT: RangeConfig;
    ADDRESS: {
        DEFAULT: RangeConfig;
        ZERO: RangeConfig;
        NODE: RangeConfig;
    };
    KEYS_IN_ACCOUNT: RangeConfig;
    AMOUNTS_IN_ITEM: RangeConfig;
    ITEMS_IN_FACT: RangeConfig;
    OPERATIONS_IN_SEAL: RangeConfig;
    KEY: {
        M2: {
            PRIVATE: RangeConfig;
            PUBLIC: RangeConfig;
        };
        M2ETHER: {
            PRIVATE: RangeConfig;
            PUBLIC: RangeConfig;
        };
    };
};
