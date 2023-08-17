export type RangeConfig = {
  value?: number;
  min: number;
  max: number;
  satisfy: (target: number) => boolean;
};

const getRangeConfig = (min: number, max?: number): RangeConfig => {
  return {
    value: min == (max ?? min) ? min : undefined,
    min,
    max: max ?? min,
    satisfy: (target: number) => min <= target && target <= (max ?? min),
  };
};

export const MitumConfig = {
  SUFFIX: {
    DEFAULT: getRangeConfig(3),
    ZERO_ADDRESS: getRangeConfig(5),
  },
  CURRENCY_ID: getRangeConfig(3, 20),
  CONTRACT_ID: getRangeConfig(3, 20),
  SEED: getRangeConfig(36, Number.MAX_SAFE_INTEGER),
  THRESHOLD: getRangeConfig(1, 100),
  WEIGHT: getRangeConfig(1, 100),
  ADDRESS: {
    DEFAULT: getRangeConfig(43, 47),
    ZERO: getRangeConfig(8, 20),
    NODE: getRangeConfig(4, Number.MAX_SAFE_INTEGER),
  },
  KEYS_IN_ACCOUNT: getRangeConfig(1, 20),
  AMOUNTS_IN_ITEM: getRangeConfig(1, 20),
  ITEMS_IN_FACT: getRangeConfig(1, 20),
  KEY: {
    M2: {
      PRIVATE: getRangeConfig(46, 48),
      PUBLIC: getRangeConfig(46, 48),
    },
    M2ETHER: {
      PRIVATE: getRangeConfig(67),
      PUBLIC: getRangeConfig(69),
    },
  },
  MAX_URI_LENGTH: getRangeConfig(1, 1000),
  MAX_NFT_HASH_LENGTH: getRangeConfig(1, 1024),
  MAX_COLLECTION_INDEX: getRangeConfig(0, 10000),
  COLLECTION_NAME_LENGTH: getRangeConfig(3, 30),
  MAX_WHITELIST_IN_COLLECTION: getRangeConfig(0, 20),
  PAYMENT_PARAM: getRangeConfig(0, 99),
  MAX_NFT_SIGNER_SHARE: getRangeConfig(0, 100),
  MAX_NFT_SIGNERS_TOTAL: getRangeConfig(0, 100),
  MAX_ROYALTY_RATE: getRangeConfig(0, 99),
};
