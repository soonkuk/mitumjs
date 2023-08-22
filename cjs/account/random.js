"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M2EtherRandomN = exports.M2RandomN = void 0;
const key_js_1 = require("./key.js");
const publicKey_js_1 = require("./publicKey.js");
const error_js_1 = require("../utils/error.js");
const config_js_1 = require("../utils/config.js");
const MITUM = "mitum";
const ETH = "ether";
function getRandomKeys(n, f, keyType) {
    error_js_1.Assert.get(config_js_1.MitumConfig.KEYS_IN_ACCOUNT.satisfy(n)).excute();
    n = Math.floor(n);
    let weight = Math.floor(config_js_1.MitumConfig.THRESHOLD.max / n);
    if (config_js_1.MitumConfig.THRESHOLD.max % n) {
        weight += 1;
    }
    const ks = [];
    const kps = [];
    for (let i = 0; i < n; i++) {
        kps.push(f());
        ks.push(new publicKey_js_1.PubKey(kps[i].publicKey, weight));
    }
    if (keyType === MITUM) {
        return {
            keys: new publicKey_js_1.Keys(ks, config_js_1.MitumConfig.THRESHOLD.max),
            keypairs: kps,
        };
    }
    else if (keyType === ETH) {
        return {
            keys: new publicKey_js_1.EtherKeys(ks, config_js_1.MitumConfig.THRESHOLD.max),
            keypairs: kps,
        };
    }
    else {
        throw new Error("Invalid address type");
    }
}
const M2RandomN = (n, keyType) => {
    return getRandomKeys(n, () => key_js_1.M2KeyPair.random(keyType), keyType);
};
exports.M2RandomN = M2RandomN;
const M2EtherRandomN = (n, keyType) => {
    return getRandomKeys(n, () => key_js_1.M2KeyPair.random(keyType), keyType);
};
exports.M2EtherRandomN = M2EtherRandomN;
//# sourceMappingURL=random.js.map