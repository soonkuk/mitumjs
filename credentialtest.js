const { Mitum } = require("./cjs");

const mitum = new Mitum("http://15.165.34.166:54320");

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
  const pv0 = "Auf6amfGtuHRx5dbhvhGNpwt1EtLG4ZTnbriEiuihDfJmpr";
  const pb0 = "27SnBRSvhX9eEswL4SXVRaewhoxuK6jVLUNyfWMThqHsZmpu";
  const a0 = "5zPANS8TqGwvVh1bghiFQpX2v4GqPsW2Rx1xtonNPMsSmca";

  const currencyID = "PEN";
  const contractPubkey = "jdxEaVHTBSu94HcqG7K4oKF6jTPPqnhbrA7fN8qm3tvzmpu";
  const contractAddress = "8DtafRFAvcvXgYHwvsUToY9UT4hkfRxi4AsCNPzWs5Y4mca";

  // const ca1 = mitum.contract.create(a0, contractPubkey, currencyID, 100);
  // const s1 = mitum.operation.sign(pv0, ca1);
  // const res = await mitum.operation.send(s1);
  // exp("axios result", res.status);

  // const token = "2023-07-03 07:51:25.876 +0000 UTC";
  const credentialId = "sit";

  // set
  mitum.credential.setContractAddress(contractAddress);
  mitum.credential.setServiceId(credentialId);

  //   const g1 = mitum.credential.getContractAddress();
  //   exp("", g1);
  //   const g2 = mitum.credential.getServiceId();
  //   exp("", g2);

  // const newService = mitum.credential.createCredentialService(
  //   a0,
  //   credentialId,
  //   currencyID
  // );
  // const s11 = mitum.operation.sign(pv0, newService);
  // const res = await mitum.operation.send(s11);
  // exp("create credential test", res.status);

  const templateId = "adsfadfdsdfasf";
  // const temData = {
  //   templateId: templateId,
  //   templateName: "default",
  //   serviceDate: "2023-07-03",
  //   expirationDate: "2023-12-31",
  //   templateShare: true,
  //   multiAudit: false,
  //   displayName: "SITcredentials",
  //   subjectKey: "SITdevcredential",
  //   description: "proofofdev",
  //   creator: a0,
  // };
  // const f2 = mitum.credential.addTemplate(a0, temData, currencyID);
  // const o2 = mitum.operation.sign(pv0, f2);
  // const s2 = await mitum.operation.send(o2);
  // exp("add template", s2.status);

  // const issueData = {
  //   holder: a0,
  //   templateId: templateId,
  //   id: "sefthia10",
  //   value: "sefthia20",
  //   validFrom: 100,
  //   validUntil: 200,
  //   did: "sefthia30",
  // };
  // const f3 = mitum.credential.issue(a0, issueData, currencyID);
  // const o3 = mitum.operation.sign(pv0, f3);
  // const s3 = await mitum.operation.send(o3);
  // exp("issue credential", s3.status);

  // const f4 = mitum.credential.revoke(
  //   a0,
  //   a0,
  //   templateId,
  //   "sefthia100",
  //   currencyID
  // );
  // const o4 = mitum.operation.sign(pv0, f4);
  // const s4 = await mitum.operation.send(o4);
  // console.log(s4.status);

  console.log(await mitum.credential.getTemplate(credentialId, templateId));
};

test();
