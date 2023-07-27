const { Mitum } = require("./cjs");

const mitum = new Mitum("http://127.0.0.1:54320");

const test = async () => {
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

  const contractPubkey = "diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu";
  const contractAddress = "2VKEH78tLMJ71KXzYQUFej5LmwprqiRSC44E2ax2tn8Bmca";

  const currencyID = "MCC";

  // create contract
  //   const o1 = mitum.contract.create(a1, contractPubkey, currencyID, 100);
  //   const s1 = mitum.operation.sign(pv1, o1);
  //   const res = await mitum.operation.send(s1);
  //   console.log("contract 생성: ", res.status);

  // 계정 생성
  //   const o = mitum.account.create(a1, pb4, currencyID, 100000);
  //   const s = mitum.operation.sign(pv1, o);
  //   const res1 = await mitum.operation.send(s);
  //   console.log(res1.status);

  const serviceId = "TEST03";
  const serviceId2 = "SST";
  const serviceId3 = "SSP";
  const serviceId4 = "PIK";
  mitum.dao.setContractAddress(contractAddress);
  mitum.dao.setServiceId(serviceId);

  // create dao service
  const option01 = "crypto";
  const option02 = "biz";
  const option03 = "any"; // must throw error
  const voteToken = "MCC";
  const threshold = 50001;
  const fee = 100;
  const proposers = [];
  const waitingTime = 180000;
  const registrationPeriod = 180000;
  const preSnapPeriod = 180000;
  const votingPeriod = 180000;
  const postSnapPeriod = 180000;
  const executionDelay = 180000;
  const turnout = 33;
  const quorum = 50;
  //   const daoData = {
  //     serviceId: "TEST03",
  //     option: option01,
  //     voteToken: voteToken,
  //     threshold: threshold,
  //     fee: fee,
  //     proposers: proposers,
  //     waitingTime: waitingTime,
  //     registrationPeriod: registrationPeriod,
  //     preSnapPeriod: preSnapPeriod,
  //     votingPeriod: votingPeriod,
  //     postSnapPeriod: postSnapPeriod,
  //     executionDelay: executionDelay,
  //     turnout: turnout,
  //     quorum: quorum,
  //   };
  //   const o = mitum.dao.createDAOService(a1, daoData, currencyID);
  //   const s = mitum.operation.sign(pv1, o);
  //   const res = await mitum.operation.send(s);
  //   console.log(res.status);

  const proposalId01 = "2VKEH78tLMJ71KXzYQUFej5LmwprqiRSC44E2ax2tn8B";
  const proposalId02 = "2VKEH78tLMJ71KXzYQUFej";
  const proposalId03 = "2VKEH78tLMJ";

  // start 시간은 실행 시간 기준으로 5분 뒤로 임의 설정
  const startTime = Date.now() + 300000;
  const url = "www.socialinfratech.com/doc/example01.pdf";
  const hash = "sf34DAtLMJ71KXzYQUFej5LmwprqiRSC44E2ax2tn8Badsf";
  const voteOptions = 5;

  const policyData = {
    voteToken: voteToken,
    threshold: threshold,
    fee: fee,
    proposers: [],
    waitingTime: waitingTime,
    registrationPeriod: registrationPeriod,
    preSnapPeriod: preSnapPeriod,
    votingPeriod: votingPeriod,
    postSnapPeriod: postSnapPeriod,
    executionDelay: executionDelay,
    turnout: 10,
    quorum: 50,
  };

  // create proposal
  const calldata01 = mitum.dao.formSetPolicyCalldata(policyData);
  const calldata02 = mitum.dao.formTransferCalldata(a3, a4, currencyID, 777);

  const proposal01 = mitum.dao.writeCryptoProposal(a2, startTime, calldata01);
  const proposal02 = mitum.dao.writeCryptoProposal(a2, startTime, calldata02);
  const proposal03 = mitum.dao.writeBizProposal(
    a2,
    startTime,
    url,
    hash,
    voteOptions
  );

  const o = mitum.dao.propose(a2, proposalId01, proposal01, currencyID);
  const s = mitum.operation.sign(pv2, o);
  const res = await mitum.operation.send(s);
  console.log(res.status);

  //   const toBuffer = () => {
  //     // const b = new Uint16Array(1);
  //     // b[0] = 129;
  //     // return Buffer.from(b.buffer);
  //     const buffer = Buffer.alloc(1);
  //     buffer.writeUint8(129);
  //     return buffer;
  //   };
  //   console.log(toBuffer());
};

test();
