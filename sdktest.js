const { Mitum } = require("./cjs/mitum.js");

const exp = (str, obj) => {
  console.log(
    "=================================================================="
  );
  console.log(str);
  console.log(
    "=================================================================="
  );
  console.log(obj);
};

const mitum = new Mitum("http://127.0.0.1:54320");

const rawOper = mitum.account.create(
  "AQT1QVva7ABTuAVPQWGDuGBfoAyszadyvMxi3k7Eoo3mca",
  "diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu",
  "MCC",
  777777
);

const oper = mitum.operation.sign(
  "DNQF7ruLFUD8ZXXrZimjFZdHAJSwc754dz1JdGADwTEDmpr",
  rawOper
);

exp("operation", oper);

const res = mitum.operation.send(oper);

exp("result", res);

// const res = send(oper.toHintedObject());
// exp("result", oper.toHintedObject());
// createEtherAccount(
//     senderAddr: string,
//     recieverPub: string,
//     currentID: string,
//     amount: number
//   )
// createMultiSig(
//     senderAddr: string,
//     recieverPubArr: Array<{ weight: number; key: string }>,
//     currentID: string,
//     amount: number,
//     threshold: number
//   )
// createEtherMultiSig(
//     senderAddr: string,
//     recieverPubArr: Array<{ weight: number; key: string }>,
//     currentID: string,
//     amount: number,
//     threshold: number
//   )
// updateKey(
//     targetAddr: string,
//     newPubArr: Array<{ weight: number; key: string }>,
//     currentID: string,
//     threshold: number
//   )
