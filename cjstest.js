const { Mitum } = require("./cjs");

const mitum = new Mitum("http://127.0.0.1:54320");

const sub = (str) => {
  console.log(
    "=================================================================="
  );
  console.log(
    "=================================================================="
  );
  console.log("");
  console.log(str);
  console.log("");
};
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

const sending = async (obj) => {
  return await mitum.operation.send(obj);
};

const test = async () => {
  // common
  sub("common 기능 테스트");
  exp("mitum.version() : 사용중인 mitum.js 버전 확인", mitum.version());
  const info = await mitum.node();
  exp("mitum.node() : RPC를 지원하는 노드의 정보 확인", info.data);
  exp("mitum.getNode() : RPC URL 확인", mitum.getNode());
  exp("mitum.chain() : mitum network의 chain ID 확인", mitum.chain());
  exp("mitum.setNode() : RPC URL 재설정", "출력값 없음");
  exp("mitum.setChain() : 사용 중인 mitum network 변경", "출력값 없음");

  // account
  sub("Account 기능 테스트");

  // block
  sub("Block 기능 테스트");

  // currency
  sub("Currency 기능 테스트");
};

test();

//

// const getAAA = async () => {
//   const info = await mitum.account.get(
//     "7aHM8e7DcN5moToy9JyHijG7iM4sY33VVNewfvtTZPhemca"
//   );
//   console.log(info.data._embedded.balance);
// };
// getAAA();
