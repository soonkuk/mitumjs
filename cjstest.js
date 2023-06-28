const { Mitum } = require("./cjs");

const mitum = new Mitum("http://127.0.0.1:54320");

const sub = (str) => {
  console.log(
    "=================================================================="
  );
  console.log(
    "=================================================================="
  );
  console.log("");
  console.log(str);
  console.log("");
};
const exp = (str, value) => {
  console.log("");
  console.log(
    "=================================================================="
  );
  console.log(str);
  console.log(
    "------------------------------------------------------------------"
  );
  console.log(value);
  console.log("");
};

const test = async () => {
  // common
  sub("common 기능 테스트");
  exp("mitum.version() : 사용중인 mitum.js 버전 확인", mitum.version());
  const info = await mitum.node();
  exp("mitum.node() : RPC를 지원하는 노드의 정보 확인", info.data);
  exp("mitum.getNode() : RPC URL 확인", mitum.getNode());
  exp("mitum.chain() : mitum network의 chain ID 확인", mitum.chain());
  exp("mitum.setNode() : RPC URL 재설정", "출력값 없음");
  exp("mitum.setChain() : 사용 중인 mitum network 변경", "출력값 없음");

  // account
  sub("Account 기능 테스트");
  exp("mitum.account.key() : 랜덤 BTC key-pair 생성", mitum.account.key());
  exp(
    "mitum.account.key(seed) : seed 값에 따른 BTC key-pair 생성",
    mitum.account.key(
      "The socialinfratech is the future of blockchain industry!"
    )
  );
  exp(
    "mitum.account.keys(2) : 2개의 랜덤 BTC key-pair 생성",
    mitum.account.keys(2)
  );
  exp(
    "mitum.account.fromPrivateKey(privatekey) : BTC private key 로부터 key-pair 생성",
    mitum.account.fromPrivateKey(
      "62LMhQdA2BabwWTyA5Y4gipeby8uUtz39MWJt8vSXxGvmpr"
    )
  );
  exp(
    "mitum.account.fromPrivateKey(privatekey) : ETH private key 로부터 key-pair 생성",
    mitum.account.fromPrivateKey(
      "010c2b32a9b4363026d899aaabf8fd824097c9ba7058eeaf278a1adb61ae85b0epr"
    )
  );
  exp(
    "mitum.account.etherKey() : 랜덤 ETH key-pair 생성",
    mitum.account.etherKey()
  );
  exp(
    "mitum.account.etherKey(seed) : seed 값에 따른 ETH key-pair 생성",
    mitum.account.etherKey(
      "The socialinfratech is the future of blockchain industry!"
    )
  );
  exp(
    "mitum.account.etherKeys(n) : n개의 랜덤 ETH key-pairs 생성",
    mitum.account.etherKeys(2)
  );
  exp(
    "mitum.account.address(pubkey) : public key 로부터 address 계산",
    mitum.account.address("diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu")
  );
  exp(
    "mitum.account.etherAddress(pubkey) : ETH public key 로부터 address 계산",
    mitum.account.etherAddress(
      "048bbbc4796a0a310762f08611df35c3799ce2dcb46f77985b05473e332cad1ce38a60403e1742334d0391a64936b1d0a64517730e73ab14493c0c8b725e4b1130epu"
    )
  );
  const keysArray = [
    { key: "28V9psXoGyjQ5cVtDLSFddHSaBnMYV95Y8kpJUk4rQKREmpu", weight: 50 },
    { key: "diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu", weight: 50 },
  ];
  exp(
    "mitum.account.addressForMultiSig : n 개의 public key로부터 BTC multi sig 계정 생성",
    mitum.account.addressForMultiSig(keysArray, 100)
  );
  const etherkeysArray = [
    {
      key: "04569fc4e3c36321ca0f9da4474a7c048d9aa43cfed9e5ff2814b5012514a599c8176b67a30609948a525d4ba75ff8d23507f126dec4fd4b72dc56d273da3ed03eepu",
      weight: 50,
    },
    {
      key: "048bbbc4796a0a310762f08611df35c3799ce2dcb46f77985b05473e332cad1ce38a60403e1742334d0391a64936b1d0a64517730e73ab14493c0c8b725e4b1130epu",
      weight: 50,
    },
  ];
  exp(
    "mitum.account.etherAddressForMultiSig : n 개의 public key로부터 ETH multi sig 계정 생성",
    mitum.account.etherAddressForMultiSig(etherkeysArray, 100)
  );
  const senderAddress = "8DtafRFAvcvXgYHwvsUToY9UT4hkfRxi4AsCNPzWs5Y4mca";
  const receiverPublickey = "oxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQmpu";
  const receiverEtherPublickey =
    "0413814cd14d791c59092b3498d8ba7bf24762c555b38371fc5ebcef9ca324074eb1496e25f11a9a5d08d449843a26a8053f4fe481e8929a6a7dc706d8c058e726epu";
  const currencyID = "MCC";
  const amount = 10;
  const seed2 = "The MITUM blockchain is evolving every day.";
  const weight2 = 80;
  const { wallet, operation } = mitum.account.createWallet(
    senderAddress,
    currencyID,
    amount,
    seed2,
    weight2
  );
  exp(
    "mitum.account.createWallet() : 랜덤 또는 seed로부터 privatekey/publickey/address 즉시 생성",
    wallet
  );
  exp(
    "mitum.account.createWallet() : createWallet의 operation 부분 출력",
    operation
  );

  const createOperation = mitum.account.create(
    senderAddress,
    receiverPublickey,
    currencyID,
    amount
  );
  exp("mitum.account.create() : 새로운 계정 생성", createOperation);
  const createOperation2 = mitum.account.createEtherAccount(
    senderAddress,
    receiverEtherPublickey,
    currencyID,
    amount
  );
  exp(
    "mitum.account.createEtherAccount() : ETH publickey로부터 새로운 계정 생성",
    createOperation2
  );
  const createOperation3 = mitum.account.createMultiSig(
    senderAddress,
    keysArray,
    currencyID,
    amount,
    100
  );
  exp(
    "mitum.account.createMultiSig() : n개의 BTC publickey로부터 새로운 multi sig 계정 생성",
    createOperation3
  );
  const createOperation4 = mitum.account.createEtherMultiSig(
    senderAddress,
    etherkeysArray,
    currencyID,
    amount,
    100
  );
  exp(
    "mitum.account.createEtherMultiSig() : n개의 ETH publickey로부터 새로운 multi sig 계정 생성",
    createOperation4
  );
  const targetAddress = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";
  const newPublickey = "28V9psXoGyjQ5cVtDLSFddHSaBnMYV95Y8kpJUk4rQKREmpu";
  const updateOperation = mitum.account.update(
    targetAddress,
    newPublickey,
    currencyID
  );
  exp(
    "mitum.account.update() : single 또는 multi sig account 를 새로운 single account 로 변경",
    updateOperation
  );
  const updateOperation2 = mitum.account.updateMultiSig(
    targetAddress,
    keysArray,
    currencyID,
    100
  );
  exp(
    "mitum.account.updateMultiSig() : single 또는 multi sig account 를 새로운 multi sig account 로 변경",
    updateOperation2
  );
  const info2 = await mitum.account.getAccount(
    "8DtafRFAvcvXgYHwvsUToY9UT4hkfRxi4AsCNPzWs5Y4mca"
  );
  exp("mitum.account.getAccountInfo() : 특정 주소의 정보 확인", info2.data);
  const signedOperation = mitum.operation.sign(
    "DNQF7ruLFUD8ZXXrZimjFZdHAJSwc754dz1JdGADwTEDmpr",
    createOperation
  );

  // block
  sub("Block 기능 테스트");
  const res1 = await mitum.block.getBlock(1536);
  exp("mitum.block.get() : 특정 블럭의 정보 확인", res1.data);
  const res2 = await mitum.block.getOperation(1536);
  exp("mitum.block.getOperation() : 특정 블럭의 operation 확인", res2.data);

  // currency
  sub("Currency 기능 테스트");
  const res9 = await mitum.currency.getAllCurrencies();
  exp("mitum.currency.getAll() : 모든 currency 정보 확인", res9.data);
  const res10 = await mitum.currency.getCurrency("MCC");
  exp("mitum.currency.getAll() : 모든 currency 정보 확인", res10.data);
  const inputData = {
    currencyID: "SIT",
    genesisAddress: "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca",
    totalSupply: 1000000000000,
    minBalance: 10,
    feeType: "fixed",
    feeReceiver: "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca",
    fee: 10,
  };
  const rawOperation1 = mitum.currency.create(inputData);
  exp("mitum.currency.create() : 새로운 currency 생성", rawOperation1);
  const inputData2 = {
    currencyID: "SIT",
    minBalance: 5,
    feeType: "ratio",
    feeReceiver: "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca",
    fee: 3, // 3%
    minFee: 5,
    maxFee: 10000,
  };
  const rawOperation = mitum.currency.setPolicy(inputData2);
  exp("mitum.currency.setPolicy() : currency 정책 변경", rawOperation);
  const sender = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";
  const receiver = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";
  const rawOperation2 = mitum.currency.transfer(
    sender,
    receiver,
    currencyID,
    25000
  );
  exp("mitum.currency.transfer() : currency 전송", rawOperation2);
  const rawOperation3 = mitum.currency.mint(receiver, currencyID, amount);
  exp(
    "mitum.currency.mint() : 특정 currency를 추가 발행하여 유동성 증가",
    rawOperation3
  );

  // operation
  sub("Operation 기능 테스트");
  const res100 = await mitum.operation.getAllOperations();
  exp("mitum.operation.getAll() : 모든 operation 정보 확인", res100.data);
  const facthash = "EhvvH6AAYEQus8gKk2m43cLTogiULe9PMvsfczacUZoT";
  const info22 = await mitum.operation.getOperation(facthash);
  exp(
    "mitum.operation.get() : fact hash로 특정 operation 정보 확인",
    info22.data
  );
  const privatekey = "96UQnof9743WAykeq6a3f54vg9MENicWCrrqN9yam9aZmpr";
  const signedOperation2 = mitum.operation.sign(privatekey, rawOperation2);
  exp(
    "mitum.operation.sign() : raw operation 메시지에 개인키로 서명",
    signedOperation2
  );

  // new function
  const newWallet = mitum.account.createWallet(
    "8DtafRFAvcvXgYHwvsUToY9UT4hkfRxi4AsCNPzWs5Y4mca",
    currencyID,
    10
  );
  exp("mitum.account.createWallet() : 새로운 wallet", newWallet.wallet);
  exp(
    "mitum.account.createWallet() : 새로 생성된 operation",
    newWallet.operation
  );
  const data = await mitum.account.touch(
    "DNQF7ruLFUD8ZXXrZimjFZdHAJSwc754dz1JdGADwTEDmpr",
    newWallet
  );
};

// test();

const s1 = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";
const s2 = "3053a018f11efb96750d49273cc8137dc11140dceca";
console.log(s1.length, s2.length);
