const { Mitum } = require("./cjs");

const mitum = new Mitum();

const exp = (s, b) => {
  console.log(s + " test : " + b);
};

const test = async () => {
  const provider = "http://15.165.34.166:54320";

  const pv1 = "Auf6amfGtuHRx5dbhvhGNpwt1EtLG4ZTnbriEiuihDfJmpr";
  const pb1 = "27SnBRSvhX9eEswL4SXVRaewhoxuK6jVLUNyfWMThqHsZmpu";
  const a1 = "5zPANS8TqGwvVh1bghiFQpX2v4GqPsW2Rx1xtonNPMsSmca";

  const pv2 = "96UQnof9743WAykeq6a3f54vg9MENicWCrrqN9yam9aZmpr";
  const pb2 = "oxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQmpu";
  const a2 = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";

  const pv3 = "CHNoLNrykannTec3L1Aa1kXsDkC2QS2tDXrTxhHAcySwmpr";
  const pb3 = "28V9psXoGyjQ5cVtDLSFddHSaBnMYV95Y8kpJUk4rQKREmpu";
  const a3 = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";

  const pv4 = "6XXWmrBHyeX3q9n7DHx6g1et2md6KqNZR5Pdwe5cSDqZmpr";
  const pb4 = "2BMCPdRL6qgk54he4Zh1H6DYpNcmLDdstZDTiuJSQt6Aqmpu";
  const a4 = "5qA26ygWafSaiqJo7hwtrJBeFaz3ZBgJwnW6SKq2ZMVdmca";

  const pv5 = "3JYWgX9crWgHYtJP2Ruihm9tnVdmw214E2hfgG3Ak8rrmpr";
  const pb5 = "nDdo1BSUcMTTscutiCNkBVczirdTtcNLyVmVuDTUTuUYmpu";
  const a5 = "8NyArMw2BcNGWorqZYkCEYNDAvAEZTEUaDojBA7hKog6mca";

  const pv6 = "FNNVNzxM6UbogpP7nqEEjPEXyGrr5zz3LuKVMjK2VjoVmpr";
  const pb6 = "2BJb4ksGffeEN1zNU7NPi3z38TaVbEBNqjthMEnSiAMXimpu";
  const a6 = "24qC9thJohPEjvXQTXXkntG316spDUWHRs33k13XF987mca";

  const pv7 = "ABvkDgqNwxeD8TyJHMBBEJyCpTFJ1iLH1MhueAKen1CKmpr";
  const pb7 = "xS334fNtVW7awzTDo5mKzSkWBCY4f6v9bDfFfx8fxZkNmpu";
  const a7 = "4EzNupMKVqK2SzprmAFCdhosJQi8AqocWRuGcBH7UCdjmca";

  const contractPubkey = "diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu";
  const contractAddress = "DBs9tyMUodWgPiMkxGNjjUwVX6YDm2Kh3rQaDZQcHrYnmca";

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

  const w1 = mitum.account.create(a1, pb7, currencyID, 100);
  const o1 = mitum.operation.sign(pv1, w1);
  // const res = await mitum.operation.send(o1);
  exp("mitum.account.create()", o1);

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

  //   console.log("===== nft test =====");
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
  //   exp("mitum.nft.getNFTInfo()", await mitum.nft.getNFTInfo(2));

  console.log("===== timestamp test =====");
  mitum.timestamp.setContractAddress(contractAddress);
  //   exp(
  //     "mitum.timestamp.getContractAddress()",
  //     mitum.timestamp.getContractAddress()
  //   );

  //   const f10 = mitum.timestamp.createTimestampService(a1, symbol, currencyID);
  //   const s10 = mitum.operation.sign(pv1, f10);
  //   const res10 = await mitum.operation.send(s10);
  //   exp("mitum.timestamp.creatSevice()", res10.status);
  mitum.timestamp.setServiceId(symbol);

  //   const projectID = "protocon";
  //   const requestTime = 10000000;
  //   const data = "exampleRequestDataexampleRequestDataexampleRequestData";
  //   const tID = 0;
  //   const f11 = mitum.timestamp.append(
  //     a1,
  //     projectID,
  //     requestTime,
  //     data,
  //     currencyID
  //   );
  //   const s11 = mitum.operation.sign(pv1, f11);
  //   const res11 = await mitum.operation.send(s11);
  //   exp("mitum.timestamp.append()", res11.status);
  //   const result = await mitum.timestamp.getTimestampInfo(symbol, projectID, tID);
  //   exp("mitum.timestamp.getTimestampInfo()", result.data);

  //   const sres = await mitum.timestamp.getServiceInfo();
  //   exp("mitum.timestamp.getServiceInfo()", sres.status);

  console.log("===== credential test =====");
  mitum.credential.setContractAddress(contractAddress);
  //   exp(
  //     "mitum.credential.getContractAddress()",
  //     mitum.credential.getContractAddress()
  //   );

  // const sId = "dri";
  // const f20 = mitum.credential.createCredentialService(a4, sId, currencyID);
  // const s20 = mitum.operation.sign(pv4, f20);
  // // const res20 = await mitum.operation.send(s20);
  // exp("mitum.credential.createCredentialService()", s20);
  // mitum.credential.setServiceId(symbol);

  const templateId = 12;
  const templateName = "social";
  const serviceDate = "2023-07-03";
  const expirationDate = "2023-12-31";
  const templateShare = true;
  const multiAudit = false;
  const displayName = "SITcredential";
  const subjectKey = "sitsubjectkey";
  const description = "sitcredentialservice";
  const creator = a1;
  //   const data = {
  //     templateId: templateId,
  //     templateName: templateName,
  //     serviceDate: serviceDate,
  //     expirationDate: expirationDate,
  //     templateShare: templateShare,
  //     multiAudit: multiAudit,
  //     displayName: displayName,
  //     subjectKey: subjectKey,
  //     description: description,
  //     creator: creator,
  //   };
  //   const f21 = mitum.credential.addTemplate(a1, data, currencyID);
  //   const s21 = mitum.operation.sign(pv1, f21);
  //   const res = await mitum.operation.send(s21);
  //   exp("mitum.credential.addTemplate()", res.status);

  const holder = a3;
  const id = "serfthia1";
  const value = "authenticated";
  const validFrom = 100;
  const validUntil = 200;
  const did = "2023k654212048";
  //   const issueData = {
  //     holder: holder,
  //     templateId: templateId,
  //     id: id,
  //     value: value,
  //     validFrom: validFrom,
  //     validUntil: validUntil,
  //     did: did,
  //   };
  //   const f22 = mitum.credential.issue(a1, issueData, currencyID);
  //   const s22 = mitum.operation.sign(pv1, f22);
  //   const res22 = await mitum.operation.send(s22);
  //   exp("mitum.credential.issue()", res22.status);

  //   const f23 = mitum.credential.revoke(a1, a2, templateId, id, currencyID);
  //   const s23 = mitum.operation.sign(pv1, f23);
  //   const res23 = await mitum.operation.send(s23);
  //   exp("mitum.credential.revoke()", res23.status);

  //   const info2 = await mitum.credential.getServiceInfo();
  //   exp("mitum.credential.getServiceInfo()", info2);

  //   const info3 = await mitum.credential.getCredentialInfo(
  //     symbol,
  //     templateId,
  //     id
  //   );
  //   exp("mitum.credential.getCredentialInfo()", info3);

  //   const info4 = await mitum.credential.getTemplate(symbol, templateId);
  //   exp("mitum.credential.getTemplate()", info4);

  //   const info5 = await mitum.credential.claimCredential(symbol, holder);
  //   exp("mitum.credential.claimCredential()", info5);
};

test();
