import Mitum from "./esm/index.js";

const rpcUrl = "http://127.0.0.1:54320";
const mitum = new Mitum(rpcUrl);

const test = () => {
  console.log(mitum.version());
};

test();
