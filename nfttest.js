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
const contractAddress = "9BU7UbMqTerfFTNN7mJ692kYXHfEfC19TdL6cZHUW8s3mca";
const contractID = "SITNFT";
mitum.nft.setGallery(contractAddress, contractID);
exp(
  "mitum.nft.getContractAddress() : 갤러리 주소 반환",
  mitum.nft.getContractAddress()
);
exp("mitum.nft.getCollectionId() : 심볼 반환", mitum.nft.getCollectionId());

const sender = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";
const uri = "https://socialinfratech.com";
const hash =
  "oxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQoxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQ";
const currencyID = "MCC";
const creator = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";
const oper = mitum.nft.mint(sender, uri, hash, currencyID, creator);
exp("mitum.nft.mint() : minting test", oper);
