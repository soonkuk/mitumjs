"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MitumConfig = void 0;
const getRangeConfig = (min, max) => {
    return {
        value: min == (max !== null && max !== void 0 ? max : min) ? min : undefined,
        min,
        max: max !== null && max !== void 0 ? max : min,
        satisfy: (target) => min <= target && target <= (max !== null && max !== void 0 ? max : min),
    };
};
exports.MitumConfig = {
    SUFFIX: {
        DEFAULT: getRangeConfig(3),
        ZERO_ADDRESS: getRangeConfig(5),
    },
    CURRENCY_ID: getRangeConfig(3, 10),
    CONTRACT_ID: getRangeConfig(3, 10),
    SEED: getRangeConfig(36, Number.MAX_SAFE_INTEGER),
    THRESHOLD: getRangeConfig(1, 100),
    WEIGHT: getRangeConfig(1, 100),
    ADDRESS: {
        DEFAULT: getRangeConfig(43, 47),
        ZERO: getRangeConfig(8, 15),
        NODE: getRangeConfig(4, Number.MAX_SAFE_INTEGER),
    },
    KEYS_IN_ACCOUNT: getRangeConfig(1, 10),
    AMOUNTS_IN_ITEM: getRangeConfig(1, 10),
    ITEMS_IN_FACT: getRangeConfig(1, 10),
    KEY: {
        M2: {
            PRIVATE: getRangeConfig(46, 48),
            PUBLIC: getRangeConfig(46, 48),
        },
        M2ETHER: {
            PRIVATE: getRangeConfig(67),
            PUBLIC: getRangeConfig(133),
        },
    },
    MAX_URI_LENGTH: getRangeConfig(1, 1000),
    MAX_NFT_HASH_LENGTH: getRangeConfig(1, 1024),
    MAX_COLLECTION_INDEX: getRangeConfig(0, 10000),
    COLLECTION_NAME_LENGTH: getRangeConfig(3, 30),
    MAX_WHITELIST_IN_COLLECTION: getRangeConfig(0, 10),
    PAYMENT_PARAM: getRangeConfig(0, 99),
    MAX_NFT_SIGNER_SHARE: getRangeConfig(0, 100),
    MAX_NFT_SIGNERS_TOTAL: getRangeConfig(0, 100),
    MAX_ROYALTY_RATE: getRangeConfig(0, 99),
};
//# sourceMappingURL=config.js.map