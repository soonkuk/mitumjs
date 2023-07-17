const { Mitum } = require("./cjs");

const mitum = new Mitum();

const exp = (s, b) => {
  console.log(s + " test : " + b);
};

const test = async () => {
  const provider = "http://15.165.34.166:54320";

  const pv1 = "KiDrbhuX5i3tc7G2gR3e1KAejCaxL6FtrfctULgU8z1mpr";
  const pb1 = "2522xqjYEeidYJkEzjokcyvYihwHn1eNkvdygkPSQgaw1mpu";
  const a1 = "CWLZQXfx72u5z82MFZAKUGwejwYED5jNy1X4hRjeU4VNmca";

  const pv2 = "96UQnof9743WAykeq6a3f54vg9MENicWCrrqN9yam9aZmpr";
  const pb2 = "oxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQmpu";
  const a2 = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";

  const pv3 = "CHNoLNrykannTec3L1Aa1kXsDkC2QS2tDXrTxhHAcySwmpr";
  const pb3 = "28V9psXoGyjQ5cVtDLSFddHSaBnMYV95Y8kpJUk4rQKREmpu";
  const a3 = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";

  const pv4 = "EKqiTgBbHxJnv6vbTSywXUb31gDasDHWKkoxbUnm3JD5mpr";
  const pb4 = "iYrk7D6nv4EpCRr2pMSuQfSE8XmyEtLKziCEAKngErBDmpu";
  const a4 = "3bLWFGHhYLA4QDEKjP6QhSdTtdSTRJVk37DNR8ZNnUAEmca";

  const contractPubkey = "diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu";
  const contractAddress = "2VKEH78tLMJ71KXzYQUFej5LmwprqiRSC44E2ax2tn8Bmca";

  const currencyID = "PEN";

  //   console.log("===== base function test =====");
  //   const mitumVersion = mitum.version();
  //   exp("mitum.version()", mitumVersion);
  mitum.setNode(provider);
  //   const mitumNode = mitum.getNode();
  //   exp("mitum.getNode()", mitumNode);
  //   const nodeInfo = await mitum.node();
  //   exp("mitum.node()", nodeInfo.status);
  //   const chain = mitum.chain();
  //   exp("mitum.chain()", chain);

  //   console.log("===== account function test =====");
  //   const rPub = mitum.account.fromPrivateKey(pv1);
  //   console.log(rPub.publicKey.toString() === pb1);

  //   const rAddr = mitum.account.address(pb1);
  //   console.log(rAddr === a1);

  //   const wallet1 = mitum.account.createWallet(a1, currencyID, 100);
  //   const res = await mitum.account.touch(pv1, wallet1);
  //   exp("mitum.account.createWallet()", res);
  //   console.log(wallet1.wallet);

  //   const w1 = mitum.account.create(a1, pb3, currencyID, 100);
  //   const o1 = mitum.operation.sign(pv1, w1);
  //   const res = await mitum.operation.send(o1);
  //   exp("mitum.account.create()", res.status);

  // contract address 생성
  //   const c1 = mitum.contract.create(a1, contractPubkey, currencyID, 100);
  //   const o2 = mitum.operation.sign(pv1, c1);
  //   const res = await mitum.operation.send(o2);
  //   exp("mitum.contract.create()", res.status);

  //   console.log("===== currency function test =====");
  //   const allCurrenciesInfo = await mitum.currency.getAllCurrencies();
  //   exp("mitum.currency.getAllCurrencies()", allCurrenciesInfo.status);
  //   const currencyInfo = await mitum.currency.getCurrency(currencyID);
  //   exp("mitum.currency.getCurrency", currencyInfo.status);
  //   const tFact = mitum.currency.transfer(a1, a2, currencyID, 100);
  //   const o3 = mitum.operation.sign(pv1, tFact);
  //   const res = await mitum.operation.send(o3);
  //   exp("mitum.currency.transfer()", res.status);

  //   console.log("===== operation test =====");
  //   const ao = await mitum.operation.getAllOperations();
  //   console.log(ao);

  //   console.log("===== contract test =====");
  //   const wc = mitum.contract.createWallet(a1, currencyID, 100);
  //   const res = mitum.contract.touch(pv1, wc);
  //   exp("mitum.contract.createWallet()", res);
  //   console.log(wc.wallet);

  console.log("===== nft test =====");
  mitum.nft.setContractAddress(contractAddress);
  //   exp("mitum.getContractAddress()", mitum.nft.getContractAddress());

  const name = "socialinfratechnft";
  const symbol = "SIT";
  mitum.nft.setCollectionId(symbol);
  const uri = "www.socialinfratech.com";
  const royalty = 10;
  const whitelists = [a2, a3, a4];
  const hash = "9hXmYsMbpC2RmjStKdkZjeoFCWuWys8WsDwVV5Rgb9uZ";
  //   const data = {
  //     name: name,
  //     symbol: symbol,
  //     uri: uri,
  //     royalty: royalty,
  //     whiteLists: whitelists,
  //   };
  //   const cco = mitum.nft.createCollection(a1, data, currencyID);
  //   const ns = mitum.operation.sign(pv1, cco);
  //   console.log(ns);
  //   const res = await mitum.operation.send(ns);
  //   exp("mitum.nft.createCollection()", res.status);

  //   const m1 = mitum.nft.mint(a1, uri, hash, currencyID, a1);
  //   const mo = mitum.operation.sign(pv1, m1);
  //   const res = await mitum.operation.send(mo);
  //   exp("mitum.nft.mint()", res.status);
  //   const creators = [
  //     { account: a2, share: 40 },
  //     { account: a3, share: 60 },
  //   ];
  //   const m2 = mitum.nft.mintForMultiCreators(
  //     a1,
  //     uri,
  //     hash,
  //     currencyID,
  //     creators
  //   );
  //   const mo2 = mitum.operation.sign(pv1, m2);
  //   const res2 = await mitum.operation.send(mo2);
  //   exp("mitum.nft.mintForMultiCreators()", res2.status);

  // **** approve one nft item ****
  //   const f1 = mitum.nft.approve(a1, a2, 2, currencyID);
  //   const s1 = mitum.operation.sign(pv1, f1);
  //   const res = await mitum.operation.send(s1);
  //   exp("mitum.nft.approve()", res.status);

  // **** set approval for all ****
  //   const f1 = mitum.nft.setApprovalForAll(a1, a2, true, currencyID);
  //   const s1 = mitum.operation.sign(pv1, f1);
  //   const res1 = await mitum.operation.send(s1);
  //   exp("mitum.nft.setApprovalForAll()", res1.status);

  // **** delegate check ****
  //   const res = await mitum.nft.isApprovedForAll(a1);
  //   exp("mitum.nft.isApprovedForAll()", res.data);

  // **** transfer ****
  //   const f2 = mitum.nft.transfer(a2, a3, 4, currencyID);
  //   const s2 = mitum.operation.sign(pv2, f2);
  //   const res = await mitum.operation.send(s2);
  //   exp("mitum.nft.transfer()", res.status);

  //   exp("mitum.nft.ownerOf()", await mitum.nft.ownerOf(3));
  //   exp("mitum.nft.name()", await mitum.nft.name());
  //   exp("mitum.nft.symbol()", mitum.nft.symbol());
  //   exp("mitum.nft.tokenURI()", await mitum.nft.tokenURI(3));
  //   exp("mitum.nft.totalSupply()", await mitum.nft.totalSupply());

  //   exp("mitum.nft.getApproved()", await mitum.nft.getApproved(2));
  //   exp("mitum.nft.getCollectionInfo()", await mitum.nft.getCollectionInfo());
};

test();
