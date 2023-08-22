const { Mitum } = require("./cjs");

const mitum = new Mitum("https://test.protocon.network");

const test = async () => {
  // const networkId = "bWl0dW0=";
  // mitum.setChain(networkId);

  // const pr = "D4QPRNSTgYmgRymYVS1mLgyGtCbzeAPYhd5r4jNQahwampr";
  // const aa = "FQacpLf7kQQQQGhHv43pehSZn4mCjz1qViky5DG36ZPAmca";
  // const ca = "DJFvWFZQ1xAurryfCjg3G6DyHuVbh5hxwA1C9m7oQW2wmca";

  // const pv0 = "Auf6amfGtuHRx5dbhvhGNpwt1EtLG4ZTnbriEiuihDfJmpr";
  // const pb0 = "27SnBRSvhX9eEswL4SXVRaewhoxuK6jVLUNyfWMThqHsZmpu";
  // const a0 = "5zPANS8TqGwvVh1bghiFQpX2v4GqPsW2Rx1xtonNPMsSmca";

  // const pv1 = "96UQnof9743WAykeq6a3f54vg9MENicWCrrqN9yam9aZmpr";
  // const pb1 = "oxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQmpu";
  // const a1 = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";

  // const pv2 = "CHNoLNrykannTec3L1Aa1kXsDkC2QS2tDXrTxhHAcySwmpr";
  // const pb2 = "28V9psXoGyjQ5cVtDLSFddHSaBnMYV95Y8kpJUk4rQKREmpu";
  // const a2 = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";

  // const pv3 = "6XXWmrBHyeX3q9n7DHx6g1et2md6KqNZR5Pdwe5cSDqZmpr";
  // const pb3 = "2BMCPdRL6qgk54he4Zh1H6DYpNcmLDdstZDTiuJSQt6Aqmpu";
  // const a3 = "5qA26ygWafSaiqJo7hwtrJBeFaz3ZBgJwnW6SKq2ZMVdmca";

  // const contractPubkey = "diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu";
  // const contractAddress = "2VKEH78tLMJ71KXzYQUFej5LmwprqiRSC44E2ax2tn8Bmca";

  // const currencyId = "MCC";

  // const serviceId = "TEST04";
  // mitum.dao.setContractAddress(contractAddress);
  // mitum.dao.setServiceId(serviceId);

  // // create dao service
  // const option01 = "crypto"; // ~04
  // const option02 = "biz"; // 05
  // const option03 = "any"; // must throw error
  // const voteToken = "MCC";
  // const threshold = 55555;
  // const fee = 100;
  // const proposers = [a0, a1, a2];
  // const waitingTime = 180000;
  // const registrationPeriod = 180000;
  // const preSnapPeriod = 180000;
  // const votingPeriod = 180000;
  // const postSnapPeriod = 180000;
  // const executionDelay = 180000;
  // const turnout = 33;
  // const quorum = 50;

  // const daoData = {
  //   serviceId: serviceId,
  //   option: option03,
  //   voteToken: voteToken,
  //   threshold: threshold,
  //   fee: fee,
  //   proposers: proposers,
  //   waitingTime: waitingTime,
  //   registrationPeriod: registrationPeriod,
  //   preSnapPeriod: preSnapPeriod,
  //   votingPeriod: votingPeriod,
  //   postSnapPeriod: postSnapPeriod,
  //   executionDelay: executionDelay,
  //   turnout: turnout,
  //   quorum: quorum,
  // };
  // const o = mitum.dao.createDAOService(a0, daoData, currencyId);
  // const s = mitum.operation.sign(pv0, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // console.log((await mitum.dao.getServiceInfo())._embedded.policy.whitelist);

  // const proposalId01 = "oCurmZciuXx6CBCjwPRve6nTqw2ZV7ZNzm7sMgzwDtf";
  // const proposalId02 = "oCurmZciuXx6CBCjwPRve6nTqw2ZV7ZNzm7s";
  // const proposalId03 = "oCurmZciuXx6CBCjwPRve6nTqw2Z";
  // const proposalId04 = "oCurmZciuXx6CBCjwPRve";
  // const proposalId05 = "oCurmZciuXx6CB";

  // const startTime = Date.now() + 1000 * 60 * 2;
  // const url = "www.socialinfratech.com/doc/example01.pdf";
  // const hash = "sf34DAtLMJ71KXzYQUFej5LmwprqiRSC44E2ax2tn8Badsf";
  // const voteOptions = 5;

  // propose

  // crypto : form transfer calldata
  // 제 3자의 송금을 dao 가 결정 (must throw error)
  // const transCall01 = mitum.dao.formTransferCalldata(a1, a2, currencyId, 33333);
  // dao 컨트랙트의 자금을 이동
  // const transCall02 = mitum.dao.formTransferCalldata(
  //   contractAddress,
  //   a3,
  //   currencyId,
  //   50
  // );

  // crypto : form set policy calldata
  // const policyData = {
  //   voteToken: currencyId,
  //   threshold: 10000,
  //   fee: 500,
  //   proposers: [a0, a1],
  //   waitingTime: waitingTime,
  //   registrationPeriod: registrationPeriod,
  //   preSnapPeriod: preSnapPeriod,
  //   votingPeriod: votingPeriod,
  //   postSnapPeriod: postSnapPeriod,
  //   executionDelay: executionDelay,
  //   turnout: turnout,
  //   quorum: quorum,
  // };
  // const policyCall01 = mitum.dao.formSetPolicyCalldata(policyData);

  // crypto : write crypto proposal
  // const cProposal01 = mitum.dao.writeCryptoProposal(a1, startTime, transCall01); // error
  // const cProposal02 = mitum.dao.writeCryptoProposal(a1, startTime, transCall02);
  // const cProposal03 = mitum.dao.writeCryptoProposal(a3, startTime, transCall02); // error

  // biz : write biz proposal
  // const bProposal01 = mitum.dao.writeBizProposal(
  //   a2,
  //   startTime,
  //   url,
  //   hash,
  //   voteOptions
  // );
  // const bProposal02 = mitum.dao.writeBizProposal(
  //   a3,
  //   startTime,
  //   url,
  //   hash,
  //   voteOptions
  // ); // error

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
  // const o = mitum.dao.register(a3, proposalId01, a3, currencyId);
  // const s = mitum.operation.sign(pv3, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // snap before voting

  // cast vote

  // snap after voting

  // execute

  // console.log(mitum.chain());
  // console.log((await mitum.node()).data);
  // console.log(mitum.getNode());

  const seed = "socialinfratechsocialinfratechsocialinfratech";
  const currencyId = "PEN";

  const pv0 =
    "37249101a6536b4bc80ec213711fcf2da5826f97e1bff4b41bf40c516d5c4e7depr";
  const pb0 =
    "02cb6cb7c01affb71c2f52023880ffd24a4ca97052ddc9d6d64b1ed7a6200737c2epu";
  const a0 = "970fa893ba3bf62aca1aa0bbf73e07857ab77d39eca";

  const mv0 = "2skTjRJUpkboDSRVyrykuqRByH5PfH2B7wgTPkeHV8ZGmpr";
  const mb0 = "271VZdsEUbQQaLiuBU11kktxxLpd1usVZcUWztDxhMwBwmpu";
  const m0 = "BT9puY7cdjKBkJDevLsCYGHNDChvEhCPo87AcJLUQqCDmca";

  // console.log(mitum.account.key());
  // console.log(mitum.account.etherKey());
  // console.log(mitum.account.etherKey(seed));
  // console.log(mitum.account.fromPrivateKey(pv0));
  // console.log(mitum.account.keys(3));
  // console.log(mitum.account.etherKeys(3));

  // sign test in ehereum scheme
  // const o1 = mitum.account.create(a0, pb2, currencyId, 77777);
  // const s1 = mitum.operation.sign(pv0, o1);
  // const res = await mitum.operation.send(s1);
  // console.log(res.status);

  // const o1 = mitum.account.createEtherAccount(a2, pb1, currencyId, 3333);
  // const s1 = mitum.operation.sign(pv2, o1);
  // const res = await mitum.operation.send(s1);
  // console.log(res.status);

  // mca => mca (ok)
  const pv4 = "6DkxJkvrwd7nMhXhubrHbjiBkDqRJpuGuvggwYdNcD95mpr";
  const pb4 = "22MU2wvVETcZpG5hqaLrUwjtooZc32DThX8qpmEg9xFnrmpu";
  const a4 = "2ra3B53EXbefbxay8326MRaWnb29pDxU7RaQFQuvmD25mca";
  // const o = mitum.account.create(m0, pb4, currencyId, 22);
  // const s = mitum.operation.sign(mv0, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // The code below tests the operation of the account using Ethereum scheme.
  // mca => eca (ok)
  const pv5 =
    "097af583d616f84fffe7b076cb35fd6fc9fa97ab1fbb1575da77f319da95b28depr";
  const pb5 =
    "021930c7bf6859c15fdd2ac3f9bfedf28986c00ca32f895f52763c9895705af4cfepu";
  const a5 = "1e811a09f0b7196133c01ddbff8d7e76a442712ceca";
  // const o = mitum.account.createEtherAccount(m0, pb5, currencyId, 77);
  // const s = mitum.operation.sign(mv0, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // eca => mca
  // const pv6 = "FvvDact8qsNKN86UtEDznTQcZSXJEg9Wu2U98BgSYvbQmpr";
  // const pb6 = "hHJZhC6uyyECQ3xxK9UaHfpa7e3wSps6rGEs3GWdQP6empu";
  // const a6 = "5ME921tui5GHZwE5KKBzv1FEM83RXP9DQbG6TrLwGe7Lmca";
  // const o = mitum.account.create(a0, mb0, currencyId, 888);
  // const s = mitum.operation.sign(pv0, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // eca => eca
  const pv7 =
    "95dbba4739eabee49dcbea13f2fe23c65793191558bf41e3cca1da7117d22ed2epr";
  const pb7 =
    "02e285b6bd231d7f9777095b744fbe1a7123f2d0ef348b4727b4df4c5ea6f63b23epu";
  const a7 = "8f04e0c119cd51546fc8cf555ca3b0f638bc0238eca";
  // const o = mitum.account.createEtherAccount(a0, pb7, currencyId, 77);
  // const s = mitum.operation.sign(pv0, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // contract address : mca => mca
  const pb8 = "e8MnySDndSXYc8if4WvmvyAF1zKUPEeer9vZqACJ7WJSmpu";
  const a8 = "4B8rPLHVdMrs2s9mLfmShgzi62gEhiXCoQazpiCTRV8Jmca";
  const o = mitum.contract.create(m0, pb8, currencyId, 321);
  const s = mitum.operation.sign(mv0, o);
  const res = await mitum.operation.send(s);
  console.log(res.status);

  // contract address : mca => eca
  const pb9 =
    "03992aa2889d44c3d1880f05dea85815236a170f0318b171a44192c6a6f7159fc5epu";
  const a9 = "f4c35553b3cf16c4049a79de5d3c62e48c476a7deca";
  // const o = mitum.contract.createEtherAccount(a2, pb9, currencyId, 99);
  // const s = mitum.operation.sign(pv2, o);
  // const res = await mitum.operation.send(s);
  // console.log(res.status);

  // contract address : eca => mca
  const pb10 = "urgNd8QvxDriqYk14R4qgNmFHxVD3ix5ZEAaKvnY4Eycmpu";
  const a10 = "8v7pK1qVe5kduD5zrdJS1CJxLx4UiJ8iFptDkQjBVV4Hmca";
  // const o = mitum.contract.create(a0, pb10, currencyId, 111);
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
