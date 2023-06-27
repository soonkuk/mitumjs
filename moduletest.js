const Wallet = require("ethereumjs-wallet").default;
const { ethers } = require("ethers");
const { Key } = require("./cjs/account/publicKey.js");
const { Mitum } = require("./cjs/index.js");

// const mitum = new Mitum();
// const etherkey = mitum.account.etherKey();
// console.log(etherkey);

// const wallet = Wallet.generate().getPrivateKeyString();
// console.log(wallet);

const privatekey = new Key(
  "6ffdac89cd77d8fce1cdf8794f11d8dc76609eaa8a1d496e01c69e23b2b9f75fepr"
);

const getSigner = () => {
  return Wallet.fromPrivateKey(Buffer.from(privatekey.noSuffix, "hex"));
};
const getSigner2 = () => {
  return new ethers.Wallet(privatekey.noSuffix);
};

// // const wallet2 = Wallet.fromPrivateKey(Buffer.from(wallet.slice(2), "hex"));
// const wallet2 = getSigner();

// const wallet4 = wallet2.getPublicKeyString();
// console.log(wallet2);
// console.log(wallet4);

const wallet = ethers.Wallet.createRandom();
console.log(wallet.privateKey);
console.log(wallet.publicKey);
const ethWallet = new ethers.Wallet(wallet.privateKey);
console.log(ethWallet.publicKey);
// const wallet3 = getSigner2();
// console.log(wallet3);

// private : 0x6ffdac89cd77d8fce1cdf8794f11d8dc76609eaa8a1d496e01c69e23b2b9f75f
// public : 0x034857cbeec64be12271ea961a2580c9ee2761eefa2882f0498b1ae6918e26d0e3

// Wallet {
//     privateKey: <Buffer 6a 6a 37 5d 6e 61 93 84 be db 1c 27 ed 8b 32 63 e6 91 0b c0 37 9d 8b cc 28 4c 20 17 96 2b a9 bd>,
//     publicKey: <Buffer e3 f4 30 5e 89 bf a6 e8 e7 75 9a 43 f6 18 75 3c 42 70 ef 9d 2a e6 45 17 42 13 12 ae 72 ea d5 ef 49 f8 cf 7e 93 c0 38 1d d9 ea f5 0c c6 d9 37 b5 f6 a0 ... 14 more bytes>
