const { Mitum } = require("./cjs");
const { CollectionRegisterFact } = require("./cjs/contract/nft/register");
const { OperationType } = require("./cjs/types/operation");
const { TimeStamp } = require("./cjs/utils/time");
const { Big, sha3 } = require("./cjs/utils/math");

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
  // const pubkeyEther =
  //   "0413814cd14d791c59092b3498d8ba7bf24762c555b38371fc5ebcef9ca324074eb1496e25f11a9a5d08d449843a26a8053f4fe481e8929a6a7dc706d8c058e726epu";

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

  const white = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";

  const sender = "8DtafRFAvcvXgYHwvsUToY9UT4hkfRxi4AsCNPzWs5Y4mca";
  const currencyID = "MCC";
  const privatekey = "DNQF7ruLFUD8ZXXrZimjFZdHAJSwc754dz1JdGADwTEDmpr";
  const contract = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";
  const name = "Socialinfratech";
  const symbol = "SIT";
  const uri = "www.socialinfratech.com";
  const royalty = 30;
  const whiteLists = [white];
  const token = "2023-07-03 07:51:25.876 +0000 UTC";

  // collection 생성
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
  // exp("mitum.nft.createCollection()", res.data);

  mitum.nft.setGallery(contract, symbol);
  exp(
    "mitum.nft.getContractAddress() : 갤러리 주소 반환",
    mitum.nft.getContractAddress()
  );
  exp("mitum.nft.getCollectionId() : 심볼 반환", mitum.nft.getCollectionId());

  const hash = "FJh7QsZDMxUPWfFTYEfcNSYicYgTZxkCGBAeHxKXg3Gq";

  const cprivate = "CHNoLNrykannTec3L1Aa1kXsDkC2QS2tDXrTxhHAcySwmpr";
  const creator = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";
  const oper = mitum.nft.mint(creator, uri, hash, currencyID, creator);
  const ss3 = mitum.operation.sign(cprivate, oper);
  // const res2 = await mitum.operation.send(ss3);
  exp("mitum.nft.mint() : minting test", ss3);
};

test();
