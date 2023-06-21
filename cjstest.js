const { Mitum } = require("./cjs");

const mitum = new Mitum("http://127.0.0.1:54320");

const exp = (str, value) => {
  console.log("=========================================");
  console.log(str);
  console.log("=========================================");
  console.log(value);
  console.log("=========================================");
};

const sending = async (obj) => {
  return await mitum.operation.send(obj);
};

const keys = mitum.account.key();
exp("keys", keys);
// common

// account

// block

// currency

//

const getAAA = async () => {
  const info = await mitum.account.get(
    "7aHM8e7DcN5moToy9JyHijG7iM4sY33VVNewfvtTZPhemca"
  );
  console.log(info.data._embedded.balance);
};
getAAA();
