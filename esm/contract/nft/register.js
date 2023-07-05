// import bs58 from "bs58";
import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { MitumConfig } from "../../utils/config.js";
import { HINT_NFT } from "../../types/hintNft.js";
import { SortFunc } from "../../utils/math.js";
import { Fact } from "../../types/fact.js";
import { CollectionName, PaymentParam, NFTURI } from "./policy.js";
import { Address } from "../../account/address.js";
export class CollectionRegisterFact extends Fact {
    constructor(token, sender, contract, collection, name, royalty, uri, whites, currency) {
        super(HINT_NFT.HINT_COLLECTION_REGISTER_OPERATION_FACT, token);
        this.sender = new Address(sender);
        this.contract = new Address(contract);
        this.collection = new ContractID(collection);
        this.name = new CollectionName(name);
        this.royalty = new PaymentParam(royalty);
        this.uri = new NFTURI(uri);
        this.currency = new CurrencyID(currency);
        Assert.check(Array.isArray(whites), MitumError.detail(ECODE.INVALID_PARAMETER, "'white-lists' of the params is not Array."));
        Assert.check(MitumConfig.MAX_WHITELIST_IN_COLLECTION.satisfy(whites.length), MitumError.detail(ECODE.INVALID_PARAMETER, "'white-lists' length is out of range."));
        this.whites = whites.map((w) => new Address(w));
        const wSet = new Set(whites);
        Assert.check(wSet.size === whites.length, MitumError.detail(ECODE.INVALID_PARAMETER, "A duplicate item exists."));
        this._hash = this.hashing();
    }
    toBuffer() {
        return Buffer.concat([
            this.token.toBuffer(),
            this.sender.toBuffer(),
            this.contract.toBuffer(),
            this.collection.toBuffer(),
            this.name.toBuffer(),
            this.royalty.toBuffer("fill"),
            this.uri.toBuffer(),
            this.currency.toBuffer(),
            Buffer.concat(this.whites.sort(SortFunc).map((w) => w.toBuffer())),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            sender: this.sender.toString(),
            contract: this.contract.toString(),
            collection: this.collection.toString(),
            name: this.name.toString(),
            royalty: this.royalty.v,
            uri: this.uri.toString(),
            whites: this.whites.sort(SortFunc).map((w) => w.toString()),
            currency: this.currency.toString(),
        };
    }
    get operationHint() {
        return HINT_NFT.HINT_COLLECTION_REGISTER_OPERATION;
    }
}
//# sourceMappingURL=register.js.map