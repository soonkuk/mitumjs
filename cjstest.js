const { Mitum } = require("./cjs");

const mitum = new Mitum("http://127.0.0.1:54320");

const test = async () => {
  // const networkId = "bWl0dW0=";
  // mitum.setChain(networkId);

  const pr = "D4QPRNSTgYmgRymYVS1mLgyGtCbzeAPYhd5r4jNQahwampr";
  const aa = "FQacpLf7kQQQQGhHv43pehSZn4mCjz1qViky5DG36ZPAmca";
  const ca = "DJFvWFZQ1xAurryfCjg3G6DyHuVbh5hxwA1C9m7oQW2wmca";

  const pv0 = "Auf6amfGtuHRx5dbhvhGNpwt1EtLG4ZTnbriEiuihDfJmpr";
  const pb0 = "27SnBRSvhX9eEswL4SXVRaewhoxuK6jVLUNyfWMThqHsZmpu";
  const a0 = "5zPANS8TqGwvVh1bghiFQpX2v4GqPsW2Rx1xtonNPMsSmca";

  const pv1 = "96UQnof9743WAykeq6a3f54vg9MENicWCrrqN9yam9aZmpr";
  const pb1 = "oxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQmpu";
  const a1 = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";

  const pv2 = "CHNoLNrykannTec3L1Aa1kXsDkC2QS2tDXrTxhHAcySwmpr";
  const pb2 = "28V9psXoGyjQ5cVtDLSFddHSaBnMYV95Y8kpJUk4rQKREmpu";
  const a2 = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";

  const pv3 = "6XXWmrBHyeX3q9n7DHx6g1et2md6KqNZR5Pdwe5cSDqZmpr";
  const pb3 = "2BMCPdRL6qgk54he4Zh1H6DYpNcmLDdstZDTiuJSQt6Aqmpu";
  const a3 = "5qA26ygWafSaiqJo7hwtrJBeFaz3ZBgJwnW6SKq2ZMVdmca";

  const contractPubkey = "diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu";
  const contractAddress = "2VKEH78tLMJ71KXzYQUFej5LmwprqiRSC44E2ax2tn8Bmca";

  const currencyId = "MCC";

  const serviceId = "TEST04";
  mitum.dao.setContractAddress(contractAddress);
  mitum.dao.setServiceId(serviceId);

  // create dao service
  const option01 = "crypto"; // ~04
  const option02 = "biz"; // 05
  const option03 = "any"; // must throw error
  const voteToken = "MCC";
  const threshold = 55555;
  const fee = 100;
  const proposers = [a0, a1, a2];
  const waitingTime = 180000;
  const registrationPeriod = 180000;
  const preSnapPeriod = 180000;
  const votingPeriod = 180000;
  const postSnapPeriod = 180000;
  const executionDelay = 180000;
  const turnout = 33;
  const quorum = 50;

  const daoData = {
    serviceId: serviceId,
    option: option03,
    voteToken: voteToken,
    threshold: threshold,
    fee: fee,
    proposers: proposers,
    waitingTime: waitingTime,
    registrationPeriod: registrationPeriod,
    preSnapPeriod: preSnapPeriod,
    votingPeriod: votingPeriod,
    postSnapPeriod: postSnapPeriod,
    executionDelay: executionDelay,
    turnout: turnout,
    quorum: quorum,
  };
  // const o = mitum.dao.createDAOService(a0, daoData, currencyId);
  // const s = mitum.operation.sign(pv0, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // console.log((await mitum.dao.getServiceInfo())._embedded.policy.whitelist);

  const proposalId01 = "oCurmZciuXx6CBCjwPRve6nTqw2ZV7ZNzm7sMgzwDtf";
  const proposalId02 = "oCurmZciuXx6CBCjwPRve6nTqw2ZV7ZNzm7s";
  const proposalId03 = "oCurmZciuXx6CBCjwPRve6nTqw2Z";
  const proposalId04 = "oCurmZciuXx6CBCjwPRve";
  const proposalId05 = "oCurmZciuXx6CB";

  const startTime = Date.now() + 1000 * 60 * 2;
  const url = "www.socialinfratech.com/doc/example01.pdf";
  const hash = "sf34DAtLMJ71KXzYQUFej5LmwprqiRSC44E2ax2tn8Badsf";
  const voteOptions = 5;

  // propose

  // crypto : form transfer calldata
  // 제 3자의 송금을 dao 가 결정 (must throw error)
  const transCall01 = mitum.dao.formTransferCalldata(a1, a2, currencyId, 33333);
  // dao 컨트랙트의 자금을 이동
  const transCall02 = mitum.dao.formTransferCalldata(
    contractAddress,
    a3,
    currencyId,
    50
  );

  // crypto : form set policy calldata
  const policyData = {
    voteToken: currencyId,
    threshold: 10000,
    fee: 500,
    proposers: [a0, a1],
    waitingTime: waitingTime,
    registrationPeriod: registrationPeriod,
    preSnapPeriod: preSnapPeriod,
    votingPeriod: votingPeriod,
    postSnapPeriod: postSnapPeriod,
    executionDelay: executionDelay,
    turnout: turnout,
    quorum: quorum,
  };
  const policyCall01 = mitum.dao.formSetPolicyCalldata(policyData);

  // crypto : write crypto proposal
  const cProposal01 = mitum.dao.writeCryptoProposal(a1, startTime, transCall01); // error
  const cProposal02 = mitum.dao.writeCryptoProposal(a1, startTime, transCall02);
  const cProposal03 = mitum.dao.writeCryptoProposal(a3, startTime, transCall02); // error

  // biz : write biz proposal
  const bProposal01 = mitum.dao.writeBizProposal(
    a2,
    startTime,
    url,
    hash,
    voteOptions
  );
  const bProposal02 = mitum.dao.writeBizProposal(
    a3,
    startTime,
    url,
    hash,
    voteOptions
  ); // error

  // const o = mitum.dao.propose(a1, proposalId03, cProposal03, currencyId);
  // const s = mitum.operation.sign(pv1, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // biz
  // mitum.dao.setServiceId("TEST05");

  // const o = mitum.dao.propose(a2, proposalId04, bProposal02, currencyId);
  // const s = mitum.operation.sign(pv2, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // status
  // console.log(await mitum.dao.getProposalInfo(serviceId, proposalId02));
  // console.log(startTime - 180000);

  // register
  const o = mitum.dao.register(a3, proposalId01, a3, currencyId);
  const s = mitum.operation.sign(pv3, o);
  const res = await mitum.operation.send(s);
  console.log(res.status);

  // snap before voting

  // cast vote

  // snap after voting

  // execute

  // console.log(mitum.chain());
  // console.log((await mitum.node()).data);
  // console.log(mitum.getNode());

  // const seed = "socialinfratechsocialinfratechsocialinfratech";

  // console.log(mitum.account.key());
  // console.log(mitum.account.etherKey());
  // console.log(mitum.account.etherKey(seed));
  // console.log(mitum.account.fromPrivateKey(pv0));
  // console.log(mitum.account.keys(2));
  // console.log(mitum.account.etherKeys(2));

  // const auxpv = "6mKiXJvanSsEwa4xU2JSiuNZ8EjAwborajCfeNsy75jSmpr";
  // const auxpb = "wZj9UqiA9WEXUDvJWbLcxJM34RYPrp8WYTeBbGouM4gxmpu";
  // const auxa = "A8op6PqiV6DgjDmbzTxqcqpUGPvou7trp7vTkHrYpqQGmca";

  // sign test in ehereum scheme : "working correctly"
  // const o1 = mitum.account.create(a0, pb2, currencyId, 77777);
  // const s1 = mitum.operation.sign(pv0, o1);
  // const res = await mitum.operation.send(s1);
  // console.log(res.status);

  // const o1 = mitum.account.createEtherAccount(a2, pb1, currencyId, 3333);
  // const s1 = mitum.operation.sign(pv2, o1);
  // const res = await mitum.operation.send(s1);
  // console.log(res.status);

  // mca => mca (ok)
  const pv4 = "8KGWFktHf4eEb4afxumSpujW39DJfCTsMDXdavUNMPqRmpr";
  const pb4 = "hi6yRUuWe7bDf8qRReEowwU6JDQAD2XqGoKztwydUnYEmpu";
  const a4 = "8K67PuVpCWLETPTkkf8HLMespeYuLqbGRDkUvCKVnrNZmca";
  // const o = mitum.account.create(a2, auxpb, currencyId, 111);
  // const s = mitum.operation.sign(pv2, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // mca => eca (ok)
  const pv5 =
    "18e7ccb711aeb86cfc20d5eaa08c369745a1ca29a865b357b8d879690935e9a5epr";
  const pb5 =
    "03ab985e5c6e850688241e385df9569587eebc34b88fc52017f5786bd32f1526d4epu";
  const a5 = "2e24a871db8449b7c79284473e1e49ff1be5f5efeca";
  // const o = mitum.account.createEtherAccount(a4, pb5, currencyId, 555);
  // const s = mitum.operation.sign(pv4, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // eca => mca
  const pv6 = "24QQfMReMRiVzSU7bLu2EUhtNLT8pzHKvf5FP5gM8Pzxmpr";
  const pb6 = "24wQjCuGouT1RNHhrbRWz1osmwwULF8P686ZorLxqdUUcmpu";
  const a6 = "eatB5Qu22UEY5T9U1GE9NF2HYrfJcRU2YaTYc76ZJSgmca";
  // const o = mitum.account.create(a0, pb6, currencyId, 66666);
  // const s = mitum.operation.sign(pv0, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // eca => eca
  const pv7 =
    "8b31ae59927ef7c5eab12b5cb1c3431630927e0a9b90a7facbfe2f76580a527bepr";
  const pb7 =
    "02ece11c40c9547f9bdab1592a63f59f6d2c0edc3201f8741484111475f0e0c20fepu";
  const a7 = "c759249f51c54e44bf9b272a65aeb053b868d809eca";
  // const o = mitum.account.createEtherAccount(a0, pb7, currencyId, 1111);
  // const s = mitum.operation.sign(pv0, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // contract address : mca => mca
  const pb8 = "25CXgVbM1H4BAMPGt5a8YpdGvgGvq6hxDdHGVGXTDSKTpmpu";
  const a8 = "G59ogKtDXGDqAFPZxmAk2Co3QwQebzArVRd5oKCYYmKzmca";
  // const o = mitum.contract.create(a2, pb8, currencyId, 100);
  // const s = mitum.operation.sign(pv2, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // contract address : mca => eca
  const pb9 =
    "02307738ea247e8d0cb61572e0114416bc8a43255b4a39dd808a8b6e2b9c46684cepu";
  const a9 = "93747c00c750404e3369d784e706575e8a6ceccaeca";
  // const o = mitum.contract.createEtherAccount(a2, pb9, currencyId, 100);
  // const s = mitum.operation.sign(pv2, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // contract address : eca => mca
  const pb10 = "urgNd8QvxDriqYk14R4qgNmFHxVD3ix5ZEAaKvnY4Eycmpu";
  const a10 = "8v7pK1qVe5kduD5zrdJS1CJxLx4UiJ8iFptDkQjBVV4Hmca";
  // const o = mitum.contract.create(a0, pb10, currencyId, 777);
  // const s = mitum.operation.sign(pv0, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // contract address : eca => eca
  const pb11 =
    "02e8806c518b55e8fe4d7795f0aeda6aa46c74226feb8c7fbdd8ababf8b4485477epu";
  const a11 = "a2cb65794ef8a19edc9906238df8d6df56c0bc39eca";
  // const o = mitum.contract.createEtherAccount(a0, pb11, currencyId, 888);
  // const s = mitum.operation.sign(pv0, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);
};

test();
