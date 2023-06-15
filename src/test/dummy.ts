const BTC = "btc";
const ETH = "ether";

const currency = {
  PEN: {
    currency: "PEN",
    zero: "PEN-Xmca",
  },
  MCC: {
    currency: "MCC",
    zero: "MCC-Xmca",
  },
} as const;

const nodePrivateKey = {
  m2: "EYc4WdFjP9qkgfwJZfnsVXeh827rsNppm5HUSjSDeMFFmpr",
  m2ether:
    "f69f845b154048b5d1c4bff066cf286da6da2b127d9ac5004c2fb9a2d83f93d8epr",
} as const;

const genesis = {
  m2: {
    address: "2E5qNuz9HsXydeTTdG1a3SZtj1iBWNUyVyfHYNcs4gSgmca",
    private: "D4QPRNSTgYmgRymYVS1mLgyGtCbzeAPYhd5r4jNQahwampr",
  },
  m2ether: {
    address: "cbc14fe342eea61d5922f83a5d3bfcb06d120df9eca",
    private:
      "7b7926dc931b88442a5b2e18cf1b149fb673907f072942240416afa773ca03a9epr",
  },
} as const;

const account1 = {
  privatekey: "BPtp8HQ7MaJ4eabMG6XUHK9sGcf9EZuDnnyt4v9Hpjuampr",
  publickey: "rhshczFyuvJa8Uf5tbowx7KkXfhLy3dv2djRin5ttt22mpu",
  address: "6b7f92a1f6d886394a5acb935be2b43bcc9e4336eca",
} as const;

const account2 = {
  privatekey: "HRn2Vs44HKzsq5Gw8ngSkcF83vcVjZvF9nHst3Cm7UJ8mpr",
  publickey: "ykufnim9PuKqpqMoBrPNuCo2kNkbmNHxELyCysyFtvfzmpu",
  address: "12fbcbc79bedab6d0ae106850c93cac0b48c5e43eca",
} as const;

const accountEther = {
  public:
    "0477c8ea663217870e3a93a01ceb47ce0fcaef5e3f0459f161a7fc70be8b417846d7a01b24c0211e86f5d748ec346e9455f41037420f0038f5cf26eb6ec69bfc63epu",
  address: "fc44aa45090109854ffdcac424408271a57d631ceca",
} as const;

const sample = [
  {
    weight: 20,
    key: "23RWZ9McmTt5EpPYdLBeGYDn7nwyEB6qiPdU8DMjZ3dnkmpu",
  },
  {
    weight: 20,
    key: "vcsQ2fYSU5YVW5zRtpACXSLHtppkjCUo3tJ5witmAyZPmpu",
  },
  {
    weight: 20,
    key: "23jEC2vNwdfJn7PAKcFjy5CTVmELWdiAm6ZENEMr62cnsmpu",
  },
  {
    weight: 20,
    key: "282UNbzEAZQf3GdWJRPUrSaHWF88u297WTQbxfkytpcTsmpu",
  },
  {
    weight: 20,
    key: "bkPHGdsHSzRGe3NZ2hkzTSPyJx42BRaXetzy1bgBmbaAmpu",
  },
];

export {
  currency,
  nodePrivateKey,
  genesis,
  account1,
  account2,
  accountEther,
  BTC,
  ETH,
  sample,
};
