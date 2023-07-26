import { Address } from "../../account/address.js";
import { Hint } from "../../types/property.js";
import { String } from "../../types/string.js";
import { Big, Uint8 } from "../../utils/math.js";
const CryptoProposalHint = "mitum-dao-crypto-proposal";
const BizProposalHint = "mitum-dao-biz-proposal";
export class CryptoProposal {
    constructor(proposer, startTime, calldata) {
        this.hint = new Hint(CryptoProposalHint);
        this.proposer = new Address(proposer);
        this.startTime = new Big(startTime);
        this.calldata = calldata;
    }
    toBuffer() {
        return Buffer.concat([
            this.proposer.toBuffer(),
            this.startTime.toBuffer("fill"),
            this.calldata.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            proposer: this.proposer.toString(),
            start_time: this.startTime.v,
            call_data: this.calldata.toHintedObject(),
        };
    }
}
export class BizProposal {
    constructor(proposer, startTime, url, hash, options) {
        this.hint = new Hint(BizProposalHint);
        this.proposer = new Address(proposer);
        this.startTime = new Big(startTime);
        this.url = new String(url);
        this.hash = new String(hash);
        this.options = new Uint8(options);
    }
    toBuffer() {
        return Buffer.concat([
            this.proposer.toBuffer(),
            this.startTime.toBuffer("fill"),
            this.url.toBuffer(),
            this.hash.toBuffer(),
            this.options.toBuffer(),
        ]);
    }
    toHintedObject() {
        return {
            _hint: this.hint.toString(),
            proposer: this.proposer.toString(),
            start_time: this.startTime.v,
            url: this.url.toString(),
            hash: this.hash.toString(),
            options: this.options.v,
        };
    }
}
//# sourceMappingURL=proposal.js.map