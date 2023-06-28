import { Hint } from "../../types/property.js";
import { Assert, MitumError, ECODE } from "../../utils/error.js";
import { OperationFact } from "../../types/fact.js";
import { MitumConfig } from "../../utils/config.js";
import { HINT_NFT } from "../../types/hintNft.js";
import { SortFunc } from "../../utils/math.js";
import { Big } from "../../utils/math.js";
import { Address } from "../../account/address.js";
import { NFTItem } from "./item.js";
export class NFTSigner {
    constructor(account, share) {
        this.hint = new Hint(HINT_NFT.HINT_NFT_SIGNER);
        this.account = new Address(account);
        this.share = new Big(share);
        Assert.check(MitumConfig.MAX_NFT_SIGNER_SHARE.satisfy(this.share.v), MitumError.detail(ECODE.INVALID_PARAMETER, "NFT-signer's share is out of range."));
        this.signed = false;
    }
    toBuffer() {
        return Buffer.concat([
            this.account.toBuffer(),
            this.share.toBuffer(),
            this.signed ? Buffer.from([1]) : Buffer.from([0]),
        ]);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            account: this.account.toString(),
            share: this.share.v,
            signed: this.signed,
        };
    }
}
export class NFTSigners {
    constructor(total, signers) {
        this.hint = new Hint(HINT_NFT.HINT_NFT_SIGNERS);
        this.total = new Big(total);
        Assert.check(MitumConfig.MAX_NFT_SIGNERS_TOTAL.satisfy(this.total.v), MitumError.detail(ECODE.INVALID_PARAMETER, "Total NFT-signers are out of range."));
        Assert.check(Array.isArray(signers), MitumError.detail(ECODE.INVALID_PARAMETER, "The type of 'signers' must be of type 'Array'."));
        const signerSet = new Set(signers.map((s) => {
            Assert.check(s instanceof NFTSigner, MitumError.detail(ECODE.INVALID_PARAMETER, "NFTSigner's type is incorrect."));
            return s.account.toString();
        }));
        Assert.check(signerSet.size === signers.length, MitumError.detail(ECODE.INVALID_PARAMETER, "A duplicate value exists in the signers."));
        const sum = signers.reduce((prev, s) => prev + s.share.v, 0);
        Assert.check(sum === this.total.v, MitumError.detail(ECODE.INVALID_PARAMETER, "The sum of 'share' does not equal total."));
        this.signers = signers;
    }
    toBuffer() {
        return Buffer.concat([
            this.total.toBuffer(),
            Buffer.concat(this.signers.sort(SortFunc).map((s) => s.toBuffer())),
        ]);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            total: this.total.v,
            signers: this.signers.sort(SortFunc).map((s) => s.toHintedObject()),
        };
    }
}
export class NFTSignItem extends NFTItem {
    constructor(contract, collection, nft, currency) {
        super(HINT_NFT.HINT_NFT_SIGN_ITEM, contract, collection, currency);
        this.nft = new Big(nft);
    }
    toBuffer() {
        return Buffer.concat([
            super.toBuffer(),
            this.nft.toBuffer(),
            this.currency.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            contract: this.contract.toString(),
            collection: this.collection.toString(),
            currency: this.currency.toString(),
            nft: this.nft.v,
        };
    }
    toString() {
        return this.nft.toString();
    }
}
export class NFTSignFact extends OperationFact {
    constructor(token, sender, items) {
        super(HINT_NFT.HINT_NFT_SIGN_OPERATION_FACT, token, sender, items);
        items.forEach((item) => {
            Assert.check(item instanceof NFTSignItem, MitumError.detail(ECODE.INVALID_PARAMETER, "Not NFTSignItem's instance."));
            Assert.check(item.contract.toString() !== sender, MitumError.detail(ECODE.INVALID_PARAMETER, "The contract address is the same as the sender address."));
        });
        const iSet = new Set(items.map((item) => item.toString()));
        Assert.check(iSet.size === items.length, MitumError.detail(ECODE.INVALID_PARAMETER, "A duplicate value exists in the NFTSignItems Array."));
    }
    get operationHint() {
        return HINT_NFT.HINT_NFT_SIGN_OPERATION;
    }
}
//# sourceMappingURL=sign.js.map