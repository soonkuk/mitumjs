const { Mitum } = require("./cjs");

const mitum = new Mitum("http://127.0.0.1:54320");

const EthWallet = require("ethereumjs-wallet");
const { ethers } = require("ethers");

// 랜덤한 private key 생성
const wallet = ethers.Wallet.createRandom();
console.log(wallet);
console.log(wallet.privateKey);
const pubkey = wallet.publicKey;
const uncompressedPublicKey = ethers.utils.computePublicKey(pubkey, false);
console.log(uncompressedPublicKey);
// const wallet = new ethers.Wallet(privateKey);
// console.log(wallet.publicKey);

// const k1 = EthWallet["default"].generate().getPrivateKeyString().substring(2);
// console.log(k1);

// const m1 = mitum.account.key();
// const e1 = mitum.account.etherKey();
// console.log(m1);
// console.log(e1);
