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
  const sender = "8DtafRFAvcvXgYHwvsUToY9UT4hkfRxi4AsCNPzWs5Y4mca";
  const currencyID = "MCC";
  const pubkey = "oxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQmpu";
  const privatekey = "DNQF7ruLFUD8ZXXrZimjFZdHAJSwc754dz1JdGADwTEDmpr";

  //   const ca1 = mitum.contract.create(sender, pubkey, currencyID, 100000);
  //   const s1 = mitum.operation.sign(privatekey, ca1);
  //   const res = await mitum.operation.send(s1);
  //   exp("axios result", res.data);

  // const token = "2023-07-03 07:51:25.876 +0000 UTC";
  const contract = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";
  const credentialId = "PIK";

  // set
  mitum.credential.setContractAddress(contract);
  mitum.credential.setCredentialId(credentialId);

  //   const c11 = mitum.credential.createCredential(
  //     sender,
  //     credentialId,
  //     currencyID
  //   );
  //   const s11 = mitum.operation.sign(privatekey, c11);
  //   const res = await mitum.operation.send(s11);
  //   exp("create credential test", res.data);

  //   const temData = {
  //     templateId: 77,
  //     templateName: "default",
  //     serviceDate: "2023-07-03",
  //     expirationDate: "2023-12-31",
  //     templateShare: true,
  //     multiAudit: false,
  //     displayName: "SITcredentials",
  //     subjectKey: "SITdevcredential",
  //     description: "proofofdev",
  //     creator: "8DtafRFAvcvXgYHwvsUToY9UT4hkfRxi4AsCNPzWs5Y4mca",
  //   };
  //   const f2 = mitum.credential.addTemplate(sender, temData, currencyID);
  //   const o2 = mitum.operation.sign(privatekey, f2);
  //   const s2 = await mitum.operation.send(o2);
  //   exp("add template", s2.data);

  //   const issueData = {
  //     holder: sender,
  //     templateId: 77,
  //     id: "sefthia100",
  //     value: "sefthia200",
  //     validFrom: 100,
  //     validUntil: 200,
  //     did: "sefthia300",
  //   };
  //   const f3 = mitum.credential.issue(sender, issueData, currencyID);
  //   const o3 = mitum.operation.sign(privatekey, f3);
  //   const s3 = await mitum.operation.send(o3);
  //   exp("issue credential", s3.status);

  const f4 = mitum.credential.revoke(
    sender,
    sender,
    77,
    "sefthia100",
    currencyID
  );
  const o4 = mitum.operation.sign(privatekey, f4);
  const s4 = await mitum.operation.send(o4);
  exp("revoke credential", s4.status);
};

test();
