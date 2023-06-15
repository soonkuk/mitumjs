"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
const bs58_1 = __importDefault(require("bs58"));
const error_1 = require("../utils/error");
const math_1 = require("../utils/math");
const create_1 = require("../contract/create");
const create_2 = require("../account/create");
const intro_1 = require("../intro");
const property_1 = require("./property");
// type SignOption = {
//   node: string;
// };
class Operation {
    constructor(fact, memo) {
        this.id = intro_1.MITUM_NETWORK_ID;
        this.memo = memo !== null && memo !== void 0 ? memo : "";
        this.fact = fact;
        this.hint = new property_1.Hint(fact.operationHint);
        this._factSigns = [];
        this._hash = Buffer.from([]);
    }
    setFactSigns(factSigns) {
        if (!factSigns) {
            return;
        }
        error_1.Assert.check(new Set(factSigns.map((fs) => fs.signer.toString())).size ===
            factSigns.length, error_1.MitumError.detail(error_1.ECODE.INVALID_FACTSIGNS, "duplicate signers found in factsigns"));
        const sigType = this.getSigType(factSigns);
        if (this.fact instanceof create_2.CreateAccountsFact ||
            this.fact instanceof create_1.CreateContractAccountsFact) {
            switch (sigType) {
                case "M2FactSign":
                case "M2NodeFactSign":
                    error_1.Assert.check(this.fact.items !== undefined &&
                        this.fact.items[0].addressType !== "", error_1.MitumError.detail(error_1.ECODE.INVALID_FACTSIGN, "m2 factsign for m1 fact"));
                    break;
                default:
                    throw error_1.MitumError.detail("EC_INVALID_SIG_TYPE", "invalid factsign type in factsigns");
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
        error_1.Assert.check(set.size === 1, error_1.MitumError.detail(error_1.ECODE.INVALID_FACTSIGNS, "multiple sig-type in operation"));
        return Array.from(set)[0];
    }
    hashing(force) {
        let b;
        switch (this.getSigType(this._factSigns)) {
            case "M2FactSign":
            case "M2NodeFactSign":
            default:
                b = (0, math_1.sha3)(this.toBuffer());
        }
        if (force && force === "force") {
            this._hash = b;
        }
        return b;
    }
    toBuffer() {
        if (!this._factSigns) {
            return this.fact.hash;
        }
        this._factSigns = this._factSigns.sort(math_1.SortFunc);
        return Buffer.concat([
            this.fact.hash,
            Buffer.concat(this._factSigns.map((fs) => fs.toBuffer())),
        ]);
    }
    toHintedObject() {
        const op = {
            _hint: this.hint.toString(),
            fact: this.fact.toHintedObject(),
            hash: this._hash.length === 0 ? "" : bs58_1.default.encode(this._hash),
        };
        const operation = this.memo ? op : Object.assign(Object.assign({}, op), { memo: this.memo });
        const factSigns = this._factSigns.length === 0 ? [] : this._factSigns.sort(math_1.SortFunc);
        switch (this.factSignType) {
            case "M2FactSign":
            case "M2NodeFactSign":
                return Object.assign(Object.assign({}, operation), { signs: factSigns.map((fs) => fs.toHintedObject()) });
            default:
                return operation;
        }
    }
}
exports.Operation = Operation;
//# sourceMappingURL=operation.js.map