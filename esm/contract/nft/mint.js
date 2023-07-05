import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact.js";
import { MitumConfig } from "../../utils/config.js";
import { HINT_NFT } from "../../types/hintNft.js";
import { NFTSigners } from "./sign.js";
import { NFTURI } from "./policy.js";
import { NFTItem } from "./item.js";
export class NFTHash {
    constructor(s) {
        Assert.check(typeof s === "string", MitumError.detail(ECODE.INVALID_PARAMETER, "The type of Hash is not 'string'."));
        Assert.check(MitumConfig.MAX_NFT_HASH_LENGTH.satisfy(s.length), MitumError.detail(ECODE.INVALID_PARAMETER, "The NFT-hash's length is out of range."));
        this.s = s;
    }
    toBuffer() {
        return Buffer.from(this.s);
    }
    toString() {
        return this.s;
    }
}
export class MintItem extends NFTItem {
    constructor(contract, collection, hash, uri, creators, currency) {
        super(HINT_NFT.HINT_MINT_ITEM, contract, collection, currency);
        this.hash = new NFTHash(hash);
        this.uri = new NFTURI(uri);
        Assert.check(creators instanceof NFTSigners, MitumError.detail(ECODE.INVALID_PARAMETER, "The type of creators is incorrect."));
        this.creators = creators;
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.hash.toBuffer(),
            this.uri.toBuffer(),
            this.creators.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            hash: this.hash.toString(),
            uri: this.uri.toString(),
            creators: this.creators.toHintedObject(),
        };
    }
    toString() {
        return this.collection.toString();
    }
}
export class MintFact extends OperationFact {
    constructor(token, sender, items) {
        super(HINT_NFT.HINT_MINT_OPERATION_FACT, token, sender, items);
        items.forEach((item) => Assert.check(item instanceof MintItem, MitumError.detail(ECODE.INVALID_PARAMETER, "The type of item is incorrect.")));
    }
    get operationHint() {
        return HINT_NFT.HINT_MINT_OPERATION;
    }
}
//# sourceMappingURL=mint.js.map