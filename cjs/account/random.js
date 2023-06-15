"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M2EtherRandomN = exports.M2RandomN = void 0;
const key_1 = require("./key");
const publicKey_1 = require("./publicKey");
const error_1 = require("../utils/error");
const config_1 = require("../utils/config");
function getRandomKeys(n, f) {
    error_1.Assert.get(config_1.MitumConfig.KEYS_IN_ACCOUNT.satisfy(n)).excute();
    n = Math.floor(n);
    let weight = Math.floor(config_1.MitumConfig.THRESHOLD.max / n);
    if (config_1.MitumConfig.THRESHOLD.max % n) {
        weight += 1;
    }
    const ks = [];
    const kps = [];
    for (let i = 0; i < n; i++) {
        kps.push(f());
        ks.push(new publicKey_1.PubKey(kps[i].publicKey, weight));
    }
    return {
        keys: new publicKey_1.Keys(ks, config_1.MitumConfig.THRESHOLD.max),
        keypairs: kps,
    };
}
const M2RandomN = (n, keyType) => {
    return getRandomKeys(n, () => key_1.M2KeyPair.random(keyType));
};
exports.M2RandomN = M2RandomN;
const M2EtherRandomN = (n, keyType) => {
    return getRandomKeys(n, () => key_1.M2KeyPair.random(keyType));
};
exports.M2EtherRandomN = M2EtherRandomN;
//# sourceMappingURL=random.js.map