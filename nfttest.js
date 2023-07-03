const { Mitum } = require("./cjs");
const { CollectionRegisterFact } = require("./cjs/contract/nft/register");
const { OperationType } = require("./cjs/types/operation");
const { TimeStamp } = require("./cjs/utils/time");

const mitum = new Mitum("http://127.0.0.1:54320");

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
  const sender = "8DtafRFAvcvXgYHwvsUToY9UT4hkfRxi4AsCNPzWs5Y4mca";
  // const pubkey = "oxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQmpu";
  // const pubkeyEther =
  //   "0413814cd14d791c59092b3498d8ba7bf24762c555b38371fc5ebcef9ca324074eb1496e25f11a9a5d08d449843a26a8053f4fe481e8929a6a7dc706d8c058e726epu";
  const currencyID = "MCC";
  const privatekey = "DNQF7ruLFUD8ZXXrZimjFZdHAJSwc754dz1JdGADwTEDmpr";
  // const ca1 = mitum.contract.create(sender, pubkey, currencyID, 1000);
  // exp("mitum.contract.create() : BTC 컨트랙트 계정 생성", ca1);
  // const s1 = mitum.operation.sign(privatekey, ca1);
  // const res = await mitum.operation.send(s1);
  // exp("axios result", s1);
  //
  // 현재 error. 다음주 중 수정 예정
  //   const ca2 = mitum.contract.createEtherAccount(
  //     sender,
  //     pubkeyEther,
  //     currencyID,
  //     100
  //   );
  //   exp("mitum.contract.create() : ETH 컨트랙트 계정 생성", ca2);
  //   const s2 = mitum.operation.sign(privatekey, ca2);
  //   const res = await mitum.operation.send(s2);
  //   exp("axios result", s2);
  //   const keysArray = [
  //     { key: "28V9psXoGyjQ5cVtDLSFddHSaBnMYV95Y8kpJUk4rQKREmpu", weight: 50 },
  //     { key: "diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu", weight: 50 },
  //   ];
  //   const ca3 = mitum.contract.createMultiSig(
  //     sender,
  //     keysArray,
  //     currencyID,
  //     1000,
  //     100
  //   );
  //   const s2 = mitum.operation.sign(privatekey, ca3);
  //   const res = await mitum.operation.send(s2);
  //   exp("mitum.contract.create() : BTC 멀티시그 컨트랙트 계정 생성", res.data);
  //   const ca4 = mitum.contract.createEtherMultiSig();
  //   exp("mitum.contract.create() : ETH 멀티시그 컨트랙트 계정 생성", ca4);
  //   const wallet = mitum.contract.createWallet(sender, currencyID, 1000);
  //   exp("mitum.contract.create() : 컨트랙트 wallet 생성", wallet.wallet);
  //   const res = await mitum.contract.touch(privatekey, wallet);
  //   exp("mitum.contract.create() : 컨트랙트 wallet 생성", res.data);
  //

  const contract = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";
  const name = "Social infra tech";
  const symbol = "SIT";
  const uri = "www.socialinfratech.com";
  const royalty = 30;
  const whiteLists = ["3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca"];
  // const inputData = {
  //   contract: contract,
  //   name: name,
  //   symbol: symbol,
  //   uri: uri,
  //   royalty: royalty,
  //   whiteLists: whiteLists,
  //   currencyID: currencyID,
  // };
  // const c1 = mitum.nft.createCollection(sender, inputData);
  // const ss1 = mitum.operation.sign(privatekey, c1);
  // const res = await mitum.operation.send(ss1);
  // exp("mitum.nft.createCollection()", ss1);
  //
  const token = "2023-07-03 07:51:25.876 +0000 UTC";
  const fact = new CollectionRegisterFact(
    token,
    sender,
    contract,
    symbol,
    name,
    royalty,
    uri,
    whiteLists,
    currencyID
  );
  const oper = new OperationType("mitum", fact);
  const ss1 = mitum.operation.sign(privatekey, oper);
  exp("mitum.nft.createCollection()", ss1);

  //   const contractID = "SIT";
  //   mitum.nft.setGallery(contractAddress, contractID);
  //   exp(
  //     "mitum.nft.getContractAddress() : 갤러리 주소 반환",
  //     mitum.nft.getContractAddress()
  //   );
  //   exp("mitum.nft.getCollectionId() : 심볼 반환", mitum.nft.getCollectionId());
  // const sender = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";
  // const uri = "https://socialinfratech.com";
  // const hash =
  //   "oxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQoxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQ";
  // const currencyID = "MCC";
  // const creator = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";
  // const oper = mitum.nft.mint(sender, uri, hash, currencyID, creator);
  // exp("mitum.nft.mint() : minting test", oper);
};

test();
