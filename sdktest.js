const { Mitum } = require("./cjs/mitum.js");

const exp = (str, obj) => {
  console.log(
    "=================================================================="
  );
  console.log(str);
  console.log(
    "=================================================================="
  );
  console.log(obj);
};

const mitum = new Mitum("http://127.0.0.1");

// exp("mt.version", mitum.version());
// exp("mt.node()", mitum.node());
// mitum.setNode("https://127.0.0.2");
// exp("mt.getNode()", mitum.getNode());
// exp("mt.chain()", mitum.chain());
// mitum.setChain("mitumX");
// exp("mt.chain()", mitum.chain());

const sample = [
  {
    weight: 50,
    key: "23RWZ9McmTt5EpPYdLBeGYDn7nwyEB6qiPdU8DMjZ3dnkmpu",
  },
  {
    weight: 50,
    key: "vcsQ2fYSU5YVW5zRtpACXSLHtppkjCUo3tJ5witmAyZPmpu",
  },
];

const account1 = {
  privatekey: "BPtp8HQ7MaJ4eabMG6XUHK9sGcf9EZuDnnyt4v9Hpjuampr",
  publickey: "rhshczFyuvJa8Uf5tbowx7KkXfhLy3dv2djRin5ttt22mpu",
  address: "6b7f92a1f6d886394a5acb935be2b43bcc9e4336eca",
};

const accountEther = {
  private:
    "bb974c13cddf921da82190ce92aefc42a6c9afaf0290982b53ead51c3e9b61a8epr",
  public:
    "04125b770c2f4aaecf1c3632694d8bb12ed6403d84b6b4899f4f2156f3cda590cb4d80baede71ebfc5137c04ec018fad8924a19c05bb7158cef7a220ab4583dd0aepu",
  address: "fc44aa45090109854ffdcac424408271a57d631ceca",
};

const test1 = mitum.account.key();
exp("account.key()", test1);
const test2 = mitum.account.keys(3);
exp("account.keys()", test2);
const test3 = mitum.account.key(
  "aasjkdfjkeqljfkewkajsekfjakdsjfkajsfkjakfjas-seed-seed-seed"
);
exp("account.key(seed)", test3);
const test4 = mitum.account.fromPrivateKey(account1.privatekey);
exp(
  "account.fromPrivateKey()",
  test4.publicKey.key + "mpu" === account1.publickey
);

const test5 = mitum.account.etherKey();
exp("account.etherKey()", test5);
const test6 = mitum.account.etherKey(
  "aasjkdfjkeqljfkewkajsekfjakdsjfkajsfkjakfjas"
);
exp("account.etherKey(seed)", test6);
const test7 = mitum.account.etherKeys(3);
exp("account.etherKeys()", test7);
const test8 = mitum.account.fromPrivateKey(accountEther.private);
exp(
  "account.fromPrivateKey()",
  test8.publicKey.key + "epu" === accountEther.public
);

const test9 = mitum.account.address();
const test10 = mitum.account.addressForMultiSig();
const test11 = mitum.account.etherAddress();
