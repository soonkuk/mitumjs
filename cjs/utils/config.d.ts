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
    MAX_URI_LENGTH: RangeConfig;
    MAX_NFT_HASH_LENGTH: RangeConfig;
    MAX_COLLECTION_INDEX: RangeConfig;
    COLLECTION_NAME_LENGTH: RangeConfig;
    MAX_WHITELIST_IN_COLLECTION: RangeConfig;
    PAYMENT_PARAM: RangeConfig;
    MAX_NFT_SIGNER_SHARE: RangeConfig;
    MAX_NFT_SIGNERS_TOTAL: RangeConfig;
    MAX_ROYALTY_RATE: RangeConfig;
};
