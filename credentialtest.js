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
  const credentialId = "SIT";

  // set
  mitum.credential.setContractAddress(contract);
  mitum.credential.setCredentialId(credentialId);
  mitum.credential.createCredential();
  mitum.credential.addTemplate();
  mitum.credential.issue();
  mitum.credential.revoke();
};

test();
