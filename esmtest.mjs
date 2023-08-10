import EthWallet from "ethereumjs-wallet";

const w = EthWallet.generate();
const privateKey = w.getPrivateKeyString();
console.log(privateKey);
