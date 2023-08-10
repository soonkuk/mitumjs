const { Mitum } = require("./cjs");

const mitum = new Mitum("https://test.protocon.network");

const test = () => {
  console.log(mitum.account.etherKey());
};

test();
