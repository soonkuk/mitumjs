const { Mitum } = require("./cjs");

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
  const publickey3 = "diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu";
  const contract = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";

  const sender = "8DtafRFAvcvXgYHwvsUToY9UT4hkfRxi4AsCNPzWs5Y4mca";
  const currencyID = "MCC";
  const privatekey = "DNQF7ruLFUD8ZXXrZimjFZdHAJSwc754dz1JdGADwTEDmpr";
  const name = "Protocon";
  const symbol = "SIT";
  const uri = "www.protocon.com";
  const royalty = 15;
  const white = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";
  const whiteLists = [white];

  const token = "2023-07-03 07:51:25.876 +0000 UTC";

  // set contract account & collection id
  mitum.nft.setContractAddress(contract);
  mitum.nft.setCollectionId(symbol);

  // collection 생성
  // const collectionData = {
  //   name: name,
  //   symbol: symbol,
  //   uri: uri,
  //   royalty: royalty,
  //   whiteLists: whiteLists,
  // };
  // const c1 = mitum.nft.createCollection(sender, collectionData, currencyID);
  // const ss1 = mitum.operation.sign(privatekey, c1);
  // const res = await mitum.operation.send(ss1);
  // exp("adkfjs", c1);
  // exp("mitum.nft.createCollection()", res.status);

  // collection 정보 조회
  // const info1 = await mitum.nft.getCollectionPolicy();
  // console.log(info1);

  // update policy 일단 넘어감 ************************************************************************
  // const oper1 = mitum.nft.setPolicy(sender, collectionData, currencyID);
  // const s222 = mitum.operation.sign(privatekey, oper1);
  // const res = await mitum.operation.send(s222);
  // console.log(s222);

  // mint
  // const hash =
  //   "381yXYxtWCavzPxeUXRewT412gbLt2hx7VanKazkBrsnyfPPBdXfoG52Yb2wkF8vC3KJyoWgETpsN6k97mQ8tUXr1CmTedcj";
  // const creator = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";
  // const mintOper = mitum.nft.mint(sender, uri, hash, currencyID, creator);
  // const s333 = mitum.operation.sign(privatekey, mintOper);
  // const res = await mitum.operation.send(s333);
  // exp("single minting", s333);

  // 화이트 리스트에 있는 사람이 minting 하는 경우 ************************************************************************
  // const mintOper2 = mitum.nft.mint(white, uri, hash, currencyID, creator);
  // const s3333 = mitum.operation.sign(privatekey, mintOper2);
  // const res = await mitum.operation.send(s3333);
  // exp("white's minting", res.status);

  // 여러 creator 가 minting
  // share의 합 total 은 100을 넘으면 안됨.
  // const creator1 = {
  //   account: "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca",
  //   share: 33,
  // };
  // const creator2 = {
  //   account: "2VKEH78tLMJ71KXzYQUFej5LmwprqiRSC44E2ax2tn8Bmca",
  //   share: 66,
  // };
  // const mintOper3 = mitum.nft.mintForMultiCreators(
  //   sender,
  //   uri,
  //   hash,
  //   currencyID,
  //   [creator1, creator2]
  // );
  // const s33333 = mitum.operation.sign(privatekey, mintOper3);
  // const res = await mitum.operation.send(s33333);
  // exp("creator group minting", res.status);

  // 정보 조회
  // const info = await mitum.nft.ownerOf(1);
  // console.log(info);
  // const info2 = await mitum.nft.ownerOf(2);
  // console.log(info2);

  // token uri 조회
  // const tokenID = 2;
  // const uri333 = await mitum.nft.tokenURI(tokenID);
  // console.log(uri333);

  // 전체 nft 발행량 조회
  // const count = await mitum.nft.totalSupply();
  // console.log(count);

  // approve
  const owner = "8DtafRFAvcvXgYHwvsUToY9UT4hkfRxi4AsCNPzWs5Y4mca";
  const operator = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";
  const f4 = mitum.nft.approve(owner, operator, 0, currencyID);
  const s4 = mitum.operation.sign(privatekey, f4);
  const res = await mitum.operation.send(s4);
  console.log(res.status);
};

test();
