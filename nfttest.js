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
  const publickey3 = "diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu";

  const white = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";
  const whiteLists = [white];

  const sender = "8DtafRFAvcvXgYHwvsUToY9UT4hkfRxi4AsCNPzWs5Y4mca";
  const currencyID = "MCC";
  const privatekey = "DNQF7ruLFUD8ZXXrZimjFZdHAJSwc754dz1JdGADwTEDmpr";
  const name = "Socialinfratech";
  const contract = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";
  const symbol = "SIT";
  const uri = "www.socialinfratech.com";
  const royalty = 30;

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
  // const info1 = await mitum.nft.getCollectionInfo();
  // console.log(info1);
};

test();
