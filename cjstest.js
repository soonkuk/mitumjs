const { Mitum } = require("./cjs");

const mitum = new Mitum("https://test.protocon.network");

const test = async () => {
  // const networkId = "bWl0dW0=";
  // mitum.setChain(networkId);

  const pv0 =
    "37249101a6536b4bc80ec213711fcf2da5826f97e1bff4b41bf40c516d5c4e7depr";
  const pb0 =
    "02cb6cb7c01affb71c2f52023880ffd24a4ca97052ddc9d6d64b1ed7a6200737c2epu";
  const a0 = "7b2358c6786841d01111044f0407bc139d46c640eca";

  const pv1 =
    "0e2bd427fc0188581dea6e21657ce2ee7104dce5aa2a3197bed9bcf23cfde58bepr";
  const pb1 =
    "03220807c129b62c3a57bc44f6689a5948a8fe29562fe187e0711e842060799c2fepu";
  const a1 = "1f3f9b262f235819e9cabc7b1ddf6376d3a2d7d2eca";

  const pv2 = "96UQnof9743WAykeq6a3f54vg9MENicWCrrqN9yam9aZmpr";
  const pb2 = "oxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQmpu";
  const a2 = "EzusPPPU5ZSShwrdrwd5mEfu8nsyY9xWY1bcdddsqWvcmca";

  const pv3 = "CHNoLNrykannTec3L1Aa1kXsDkC2QS2tDXrTxhHAcySwmpr";
  const pb3 = "28V9psXoGyjQ5cVtDLSFddHSaBnMYV95Y8kpJUk4rQKREmpu";
  const a3 = "3ebZbBhDA8So68yjG4pGM7pjYYc5qNbi3zubN4VbvqbGmca";

  const contractPubkey =
    "0390822552b36fa7a18ca3796d50c90e7258c743583cbbb4afb34ea6ad09281600epu";
  const contractAddress = "a10526ec4727489419b6c7ef38a5b5722bb0ac1feca";

  const contractPubkey2 = "scHrM2TojMZZ4narvJjrdDtSD8BVvecAinZNvCHfqcKBmpu";
  const contractAddress2 = "DUpDUefjC7waCA52wrd3qNYNhWxT3KWzmnWKvRuiFvWwmca";

  const currencyId = "PEN";

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
  const o = mitum.contract.createEtherAccount(a0, pb11, currencyId, 888);
  const s = mitum.operation.sign(pv0, o);
  const res = await mitum.operation.send(s);
  console.log(res.status);
};

test();
