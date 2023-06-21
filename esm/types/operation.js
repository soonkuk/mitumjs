import base58 from "bs58";
import { Assert, ECODE, MitumError } from "../utils/error.js";
import { SortFunc, sha3 } from "../utils/math.js";
import { TimeStamp } from "../utils/time.js";
import { MITUM_NETWORK_ID } from "../intro.js";
import { Hint } from "./property.js";
import { CreateContractAccountsFact } from "../contract/create.js";
import { M2FactSign, M2NodeFactSign } from "./factSign.js";
import { NodeAddress } from "../account/address.js";
import { CreateAccountsFact } from "../account/create.js";
import { M2KeyPair } from "../account/key.js";
import { Key } from "../account/publicKey.js";
export class OperationType {
    constructor(fact, memo) {
        this.id = MITUM_NETWORK_ID;
        this.memo = memo ?? "";
        this.fact = fact;
        this.hint = new Hint(fact.operationHint);
        this._factSigns = [];
        this._hash = Buffer.from([]);
    }
    setFactSigns(factSigns) {
        if (!factSigns) {
            return;
        }
        Assert.check(new Set(factSigns.map((fs) => fs.signer.toString())).size ===
            factSigns.length, MitumError.detail(ECODE.INVALID_FACTSIGNS, "duplicate signers found in factsigns"));
        const sigType = this.getSigType(factSigns);
        if (this.fact instanceof CreateAccountsFact ||
            this.fact instanceof CreateContractAccountsFact) {
            switch (sigType) {
                case "M2FactSign":
                case "M2NodeFactSign":
                    Assert.check(this.fact.items !== undefined &&
                        this.fact.items[0].addressType !== "", MitumError.detail(ECODE.INVALID_FACTSIGN, "m2 factsign"));
                    break;
                default:
                    throw MitumError.detail("EC_INVALID_SIG_TYPE", "invalid factsign type in factsigns");
            }
        }
        this._factSigns = factSigns;
        this._hash = this.hashing();
    }
    get factSigns() {
        return this._factSigns;
    }
    get hash() {
        return this._hash;
    }
    get factSignType() {
        return this.getSigType();
    }
    getSigType(factSigns) {
        if (!factSigns) {
            factSigns = this._factSigns;
        }
        if (factSigns.length === 0) {
            return null;
        }
        const set = new Set(factSigns.map((fs) => Object.getPrototypeOf(fs).constructor.name));
        Assert.check(set.size === 1, MitumError.detail(ECODE.INVALID_FACTSIGNS, "multiple sig-type in operation"));
        return Array.from(set)[0];
    }
    hashing(force) {
        let b = sha3(this.toBuffer());
        if (force && force === "force") {
            this._hash = b;
        }
        return b;
    }
    // The option is node's address
    sign(privateKey, option) {
        privateKey = Key.from(privateKey);
        const keypair = M2KeyPair.fromPrivate(privateKey);
        const sigType = this.factSignType;
        if (sigType === "M2NodeFactSign") {
            Assert.check(option !== undefined, MitumError.detail(ECODE.FAIL_SIGN, "no node address in sign option"));
        }
        if (!sigType &&
            (this.fact instanceof CreateAccountsFact ||
                this.fact instanceof CreateContractAccountsFact)) {
            Assert.check(this.fact.items !== undefined &&
                this.fact.items[0].addressType !== "", MitumError.detail(ECODE.FAIL_SIGN, "m2 keypair"));
        }
        const factSign = this.signWithSigType(sigType, keypair, option ? new NodeAddress(option) : undefined);
        const idx = this._factSigns
            .map((fs) => fs.signer.toString())
            .indexOf(keypair.publicKey.toString());
        if (idx < 0) {
            this._factSigns.push(factSign);
        }
        else {
            this._factSigns[idx] = factSign;
        }
        this._hash = this.hashing();
    }
    signWithSigType(sigType, keypair, node) {
        const getM2FactSign = (keypair, hash) => {
            const now = new TimeStamp();
            return new M2FactSign(keypair.publicKey, keypair.sign(Buffer.concat([Buffer.from(this.id), hash, now.toBuffer()])), now.toString());
        };
        const getM2NodeFactSign = (node, keypair, hash) => {
            const now = new TimeStamp();
            return new M2NodeFactSign(node.toString(), keypair.publicKey, keypair.sign(Buffer.concat([
                Buffer.from(this.id),
                node.toBuffer(),
                hash,
                now.toBuffer(),
            ])), now.toString());
        };
        const hash = this.fact.hash;
        //  const hash = this._hash ? this._hash : Buffer.from([]);
        if (sigType) {
            switch (sigType) {
                case "M2FactSign":
                    Assert.check(keypair.privateKey.version === "m2", MitumError.detail(ECODE.FAIL_SIGN, "not m2 keypair factsign type != keypair type"));
                    return getM2FactSign(keypair, hash);
                case "M2NodeFactSign":
                    Assert.check(keypair.privateKey.version === "m2", MitumError.detail(ECODE.FAIL_SIGN, "not m2 keypair factsign type != keypair type"));
                    Assert.check(node !== undefined, MitumError.detail(ECODE.FAIL_SIGN, "no node address"));
                    return getM2NodeFactSign(node, keypair, hash);
                default:
                    throw MitumError.detail(ECODE.FAIL_SIGN, "invalid factsign type");
            }
        }
        else {
            switch (keypair.privateKey.version) {
                case "m2":
                    if (node) {
                        return getM2NodeFactSign(node, keypair, hash);
                    }
                    else {
                        return getM2FactSign(keypair, hash);
                    }
                default:
                    throw MitumError.detail(ECODE.FAIL_SIGN, "invalid private key");
            }
        }
    }
    toBuffer() {
        if (!this._factSigns) {
            return this.fact.hash;
        }
        this._factSigns = this._factSigns.sort(SortFunc);
        return Buffer.concat([
            this.fact.hash,
            Buffer.concat(this._factSigns.map((fs) => fs.toBuffer())),
        ]);
    }
    toHintedObject() {
        const op = {
            _hint: this.hint.toString(),
            fact: this.fact.toHintedObject(),
            hash: this._hash.length === 0 ? "" : base58.encode(this._hash),
        };
        const operation = this.memo ? op : { ...op, memo: this.memo };
        const factSigns = this._factSigns.length === 0 ? [] : this._factSigns.sort(SortFunc);
        switch (this.factSignType) {
            case "M2FactSign":
            case "M2NodeFactSign":
                return {
                    ...operation,
                    signs: factSigns.map((fs) => fs.toHintedObject()),
                };
            default:
                return operation;
        }
    }
}
//# sourceMappingURL=operation.js.map