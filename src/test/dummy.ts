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
};

const node = "http://127.0.0.1:54320";

const nodeKey = {
  privatekey: "BPtp8HQ7MaJ4eabMG6XUHK9sGcf9EZuDnnyt4v9Hpjuampr",
  publickey: "rhshczFyuvJa8Uf5tbowx7KkXfhLy3dv2djRin5ttt22mpu",
  address: "9BU7UbMqTerfFTNN7mJ692kYXHfEfC19TdL6cZHUW8s3mca",
};

const genesis = {
  privatekey: "DNQF7ruLFUD8ZXXrZimjFZdHAJSwc754dz1JdGADwTEDmpr",
  publickey: "jdxEaVHTBSu94HcqG7K4oKF6jTPPqnhbrA7fN8qm3tvzmpu",
  address: "8DtafRFAvcvXgYHwvsUToY9UT4hkfRxi4AsCNPzWs5Y4mca",
};

const account1 = {
  privatekey: "96UQnof9743WAykeq6a3f54vg9MENicWCrrqN9yam9aZmpr",
  publickey: "oxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQmpu",
  address: "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca",
};

const account2 = {
  privatekey: "CHNoLNrykannTec3L1Aa1kXsDkC2QS2tDXrTxhHAcySwmpr",
  publickey: "28V9psXoGyjQ5cVtDLSFddHSaBnMYV95Y8kpJUk4rQKREmpu",
  address: "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca",
};

const account3 = {
  privatekey: "62LMhQdA2BabwWTyA5Y4gipeby8uUtz39MWJt8vSXxGvmpr",
  publickey: "diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu",
  address: "2VKEH78tLMJ71KXzYQUFej5LmwprqiRSC44E2ax2tn8Bmca",
};

const accountEther1 = {
  privatekey:
    "ae538f3b1e286097a4c871084bec1dffd71814e49508c9a8a3e76ac46482aafeepr",
  publickey:
    "0413814cd14d791c59092b3498d8ba7bf24762c555b38371fc5ebcef9ca324074eb1496e25f11a9a5d08d449843a26a8053f4fe481e8929a6a7dc706d8c058e726epu",
  address: "a5dffe55e29d165889d4f74d633e4cc01d7f4ddfeca",
};

const accountEther2 = {
  privatekey:
    "7e035e9376beceea11f418dfa3ce2453910cebe71f10f3c603ee137bd82c832eepr",
  publickey:
    "04569fc4e3c36321ca0f9da4474a7c048d9aa43cfed9e5ff2814b5012514a599c8176b67a30609948a525d4ba75ff8d23507f126dec4fd4b72dc56d273da3ed03eepu",
  address: "b99b6f537a2cccb89b029d5a743d0f7e7da118b8eca",
};

const accountEther3 = {
  privatekey:
    "010c2b32a9b4363026d899aaabf8fd824097c9ba7058eeaf278a1adb61ae85b0epr",
  publickey:
    "048bbbc4796a0a310762f08611df35c3799ce2dcb46f77985b05473e332cad1ce38a60403e1742334d0391a64936b1d0a64517730e73ab14493c0c8b725e4b1130epu",
  address: "3053a018f11efb96750d49273cc8137dc11140dceca",
};

const multi1 = [
  {
    weight: 50,
    key: "28V9psXoGyjQ5cVtDLSFddHSaBnMYV95Y8kpJUk4rQKREmpu",
  },
  {
    weight: 50,
    key: "diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu",
  },
];

const multi2 = [
  {
    weight: 50,
    key: "04569fc4e3c36321ca0f9da4474a7c048d9aa43cfed9e5ff2814b5012514a599c8176b67a30609948a525d4ba75ff8d23507f126dec4fd4b72dc56d273da3ed03eepu",
  },
  {
    weight: 50,
    key: "048bbbc4796a0a310762f08611df35c3799ce2dcb46f77985b05473e332cad1ce38a60403e1742334d0391a64936b1d0a64517730e73ab14493c0c8b725e4b1130epu",
  },
];

export {
  currency,
  nodeKey,
  genesis,
  account1,
  account2,
  account3,
  accountEther1,
  accountEther2,
  accountEther3,
  BTC,
  ETH,
  multi1,
  multi2,
  node,
};
