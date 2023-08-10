const { Wallet } = require("ethers");
const { Mitum } = require("./cjs");
const { publicKeyCreate } = require("secp256k1");

const mitum = new Mitum("http://15.165.34.166:54320");

function privateKeyToPublicKey(privateKey) {
  if (!Buffer.isBuffer(privateKey)) {
    if (typeof privateKey !== "string") {
      throw new Error("Expected Buffer or string as argument");
    }

    privateKey =
      privateKey.slice(0, 2) === "0x" ? privateKey.slice(2) : privateKey;
    privateKey = Buffer.from(privateKey, "hex");
  }

  return publicKeyCreate(privateKey, false);
}

// 무작위 개인 키 생성

const randomWallet = Wallet.createRandom();
console.log(randomWallet.privateKey.substring(2) + "epr");
console.log(randomWallet.publicKey);

const b = privateKeyToPublicKey(randomWallet.privateKey);

// x 좌표 추출
const xCoordinate = b.slice(1, 33);

// y 좌표 추출
const yCoordinate = b.slice(33);

// y 좌표의 최하위 비트에 따라서 y 좌표 선택
const compressedPublicKey = Buffer.concat([
  Buffer.from([0x02 + (yCoordinate[yCoordinate.length - 1] % 2)]),
  xCoordinate,
]);

console.log(compressedPublicKey.toString("hex"));

// console.log(mitum.account.etherKey(seed));

// const seed = "aksdfjakfjakfjekjfakjsdkjfdkajdkfjafadsfdasfkajdskfek";
// // const entropy = ethers.utils.id(seed);
// const wallet = Wallet.fromMnemonic(seed);
// console.log(wallet);

// const privatekey =
//   "0xb15dc39334d2e4fcc189ce921d3d40067c678805946d3d734fe0401ccf5f0bb6";
// // 기존 개인 키로 지갑 생성
// const wallet = new Wallet(privatekey);
// console.log(wallet.publicKey);
