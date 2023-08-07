const { Mitum } = require("./cjs");

const provider = "http://15.165.34.166:54320";
const mitum = new Mitum(provider);

const test = async () => {
  //   console.log(mitum.version());
  //   console.log(await mitum.node());
  //   console.log(mitum.chain());

  //   console.log(mitum.account.etherKeys(2));

  const currencyId = "PEN";

  const pv0 = "Auf6amfGtuHRx5dbhvhGNpwt1EtLG4ZTnbriEiuihDfJmpr";
  const pb0 = "27SnBRSvhX9eEswL4SXVRaewhoxuK6jVLUNyfWMThqHsZmpu";
  const a0 = "5zPANS8TqGwvVh1bghiFQpX2v4GqPsW2Rx1xtonNPMsSmca";

  const pv1 =
    "4fe8458a1dc9bb2a800d76e48f936c62e4840c3018502f7faa28d567a6b8fb92epr";
  const pb1 =
    "049f80e60414fa9f6aba98c7d04db065eabb25e060215c0d81eb5eab610bee9f3ee835f24436bad162406cca2c3786f999ff54c2524554c8cb4569d8f46b894cf8epu";
  const a1 = "12617a9a5636e2c5ae7c9b94f45bf1d93d9f0b58eca";

  const pv2 =
    "91e5287e97affa159bbfe567cfbfb32dd0015e3e0f16ad1babf5c549818c5e9fepr";
  const pb2 =
    "0468354b1e01e492b7d7e57474d443f39aeb9ebf1644b2a6fe6cac5b0f5e27f0954712ca1601ebb7d0a82055116f954bd05cbd45e190fbd0cc7df90951b49c2442epu";
  const a2 = "fe7c39073796b70dc5f92168c89b3db9270f9b53eca";

  const pv3 =
    "a82dc20475df25679a64a3c2bd2160c495d7c95a12e524a51bfde17275f64dfaepr";
  const pb3 =
    "04121348c9447cb1ae40f2b9afb6cfa4a209bfd29e7930130dc5e57140e273b0fdffbfc5fb0c58325a8263443a30693bc1bd691350e8192de458dbda5d76534273epu";
  const a3 = "ac935f511bd16e915ea80d673329fd7834c6f60beca";

  const contractPubkey =
    "04dc84f8831487d7eea629ead69ce7933d14483d1d371c546a06c02c4afe0c80bbd38935093c0d201fa5f57cc6220426b2660abdf727bcfb21fd0ea96ff224731fepu";
  const contractAddress = "9515dce6f66792f0acacc01dc55402212214e140eca";
  const contractAddress2 = "DBs9tyMUodWgPiMkxGNjjUwVX6YDm2Kh3rQaDZQcHrYnmca";
  mitum.nft.setContractAddress(contractAddress2);

  //   const f1 = mitum.account.createEtherAccount(a0, pb3, currencyId, 30000);
  //   const s1 = mitum.operation.sign(pv0, f1);
  //   const r1 = await mitum.operation.send(s1);
  //   console.log(r1.status);

  //   // transfer
  //   const f2 = mitum.currency.transfer(a3, a1, currencyId, 300);
  //   const s2 = mitum.operation.sign(pv3, f2);
  //   // const r3 = await mitum.operation.send(s2);
  //   console.log(s2);

  //   console.log(await mitum.account.balance(a1));

  // create contract account
  //   const f3 = mitum.contract.createEtherAccount(
  //     a0,
  //     contractPubkey,
  //     currencyId,
  //     1000
  //   );
  //   const s3 = mitum.operation.sign(pv0, f3);
  //   const r3 = await mitum.operation.send(s3);
  //   console.log(r3.status);

  const name = "socialinfratech";
  const symbol = "SIT5";
  const uri = "www.socialinfratech.com";
  const royalty = 10;
  const whiteLists = [a1, a2];

  // create collection
  const collectionData = {
    name: name,
    symbol: symbol,
    uri: uri,
    royalty: royalty,
    whiteLists: whiteLists,
  };
  const f4 = mitum.nft.createCollection(a0, collectionData, currencyId);
  const s4 = mitum.operation.sign(pv0, f4);
  //   const r4 = await mitum.operation.send(s4);
  console.log(s4);
};

test();
