import { M2KeyPair } from "./key";
import { Keys, PubKey } from "./publicKey";
import { Assert } from "../utils/error";
import { MitumConfig } from "../utils/config";
function getRandomKeys(n, f) {
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
    return {
        keys: new Keys(ks, MitumConfig.THRESHOLD.max),
        keypairs: kps,
    };
}
export const M2RandomN = (n, keyType) => {
    return getRandomKeys(n, () => M2KeyPair.random(keyType));
};
export const M2EtherRandomN = (n, keyType) => {
    return getRandomKeys(n, () => M2KeyPair.random(keyType));
};
//# sourceMappingURL=random.js.map