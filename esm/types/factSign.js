import base58 from "bs58";
import { Assert, ECODE, MitumError } from "../utils/error";
import { FullTimeStamp } from "../utils/time";
import { NodeAddress } from "../account/address";
import { Key } from "../account/publicKey";
export class FactSign {
    constructor(signer, signature, signedAt) {
        this.signature = signature;
        this.signedAt = new FullTimeStamp(signedAt);
        this.signer = Key.from(signer);
        Assert.get(this.signer.isPriv, MitumError.detail(ECODE.INVALID_PUBLIC_KEY, "not public key"))
            .not()
            .excute();
    }
    toBuffer() {
        return Buffer.concat([
            this.signer.toBuffer(),
            this.signature,
            this.signedAt.toBuffer("super"),
        ]);
    }
    toHintedObject() {
        return {
            signer: this.signer.toString(),
            signature: base58.encode(this.signature),
            signed_at: this.signedAt.ISO(),
        };
    }
}
export class M2FactSign extends FactSign {
    constructor(signer, signature, signedAt) {
        super(signer, signature, signedAt);
    }
    toHintedObject() {
        return super.toHintedObject();
    }
}
export class M2NodeFactSign extends FactSign {
    constructor(node, signer, signature, signedAt) {
        super(signer, signature, signedAt);
        this.node = NodeAddress.from(node);
    }
    toBuffer() {
        return Buffer.concat([this.node.toBuffer(), super.toBuffer()]);
    }
    toHintedObject() {
        return {
            ...super.toHintedObject(),
            node: this.node.toString(),
        };
    }
}
//# sourceMappingURL=factSign.js.map