import Mitum from "./esm/index.js";

const mitum = new Mitum("http://127.0.0.1:54320");

const cCurrency = mitum.currency.transfer(
  "7aHM8e7DcN5moToy9JyHijG7iM4sY33VVNewfvtTZPhemca",
  "cb271a20026ab44c931fd9436b5d7263a3e42c6beca",
  "MCC",
  1000
);

const getAAA = async () => {
  const info = await mitum.account.get(
    "7aHM8e7DcN5moToy9JyHijG7iM4sY33VVNewfvtTZPhemca"
  );
  console.log(info.data._embedded.balance);
};
getAAA();
