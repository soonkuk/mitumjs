import { M2KeyPair } from "./key.js";
import { Keys, PubKey } from "./publicKey.js";
import { Assert } from "../utils/error.js";
import { MitumConfig } from "../utils/config.js";
const MITUM = "mitum";
const ETH = "ether";
const MCA = "mca";
const ECA = "eca";
function getRandomKeys(n, f, keyType) {
    Assert.get(MitumConfig.KEYS_IN_ACCOUNT.satisfy(n)).excute();
    n = Math.floor(n);
    let weight = Math.floor(MitumConfig.THRESHOLD.max / n);
    if (MitumConfig.THRESHOLD.max % n) {
        weight += 1;
    }
    const ks = [];
    const kps = [];
    for (let i = 0; i < n; i++) {
        kps.push(f());
        ks.push(new PubKey(kps[i].publicKey, weight));
    }
    let type;
    if (keyType === MITUM) {
        type = MCA;
    }
    else if (keyType === ETH) {
        type = ECA;
    }
    else {
        throw new Error("Invalid address type");
    }
    return {
        keys: new Keys(ks, MitumConfig.THRESHOLD.max, type),
        keypairs: kps,
    };
}
export const M2RandomN = (n, keyType) => {
    return getRandomKeys(n, () => M2KeyPair.random(keyType), keyType);
};
export const M2EtherRandomN = (n, keyType) => {
    return getRandomKeys(n, () => M2KeyPair.random(keyType), keyType);
};
//# sourceMappingURL=random.js.map