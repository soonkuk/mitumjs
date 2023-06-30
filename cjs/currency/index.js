"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
const validation_js_1 = require("../utils/validation.js");
const time_js_1 = require("../utils/time.js");
const operation_js_1 = require("../types/operation.js");
const property_js_1 = require("../types/property.js");
const updatePolicy_js_1 = require("./updatePolicy.js");
const transfer_js_1 = require("./transfer.js");
const register_js_1 = require("./register.js");
const information_js_1 = __importDefault(require("./information.js"));
const design_js_1 = require("./design.js");
const inflate_js_1 = require("./inflate.js");
class Currency {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._setNode(provider);
        this._setChain(networkID);
    }
    _setNode(provider) {
        if ((0, validation_js_1.isIPAddress)(provider)) {
            this._node = provider;
        }
    }
    _setChain(networkID) {
        this._networkID = networkID;
    }
    getAllCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield information_js_1.default.getAllCurrencyInfo(this._node);
        });
    }
    getCurrency(currencyID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield information_js_1.default.getCurrencyInfo(this._node, currencyID);
        });
    }
    /** structure
     * inputData = {
     *    currencyID: string;
     *    genesisAddress: string;
     *    totalSupply: number;
     *    minBalance: number;
     *    feeType: feeType; // "none" or "fixed" or "ratio"
     *    feeReceiver?: string; // receiver address
     *    fee?: number; // case of "fixed" fee or ratio
     *    minFee?: number;
     *    maxFee?: number;
     * }
     */
    create(data) {
        const feePolicy = this.setFeePolicy(data.feeType, data.feeReceiver, data.fee, data.minFee, data.maxFee);
        const policy = new design_js_1.CurrencyPolicy(data.minBalance, feePolicy);
        if (data.totalSupply === undefined || data.genesisAddress === undefined) {
            throw new Error("The values for the 'totalSupply' or 'genesisAddress' fields were not entered.");
        }
        const amount = new property_js_1.Amount(data.currencyID, data.totalSupply);
        const design = new design_js_1.CurrencyDesign(amount, data.genesisAddress, policy);
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new register_js_1.CurrencyRegisterFact(token, design);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    /** structure
     * inputData = {
     *    currencyID: string;
     *    minBalance: number;
     *    feeType: feeType; // "none" or "fixed" or "ratio"
     *    feeReceiver?: string; // receiver address
     *    fee?: number; // case of "fixed" fee or ratio
     *    minFee?: number;
     *    maxFee?: number;
     * }
     */
    setPolicy(data) {
        const feePolicy = this.setFeePolicy(data.feeType, data.feeReceiver, data.fee, data.minFee, data.maxFee);
        const policy = new design_js_1.CurrencyPolicy(data.minBalance, feePolicy);
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new updatePolicy_js_1.CurrencyPolicyUpdaterFact(token, data.currencyID, policy);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    setFeePolicy(feeType, feeReceiver, fee, minFee, maxFee) {
        let feePolicy;
        if (feeType === "none") {
            feePolicy = new design_js_1.NilFeeer();
        }
        else if (feeType === "fixed" &&
            feeReceiver !== undefined &&
            fee !== undefined) {
            feePolicy = new design_js_1.FixedFeeer(feeReceiver, fee);
        }
        else if (feeType === "ratio" &&
            feeReceiver !== undefined &&
            fee !== undefined &&
            minFee !== undefined &&
            maxFee !== undefined) {
            feePolicy = new design_js_1.RatioFeeer(feeReceiver, fee, minFee, maxFee);
        }
        else {
            throw new Error("The fee-type and its fields-value were not entered correctly.");
        }
        return feePolicy;
    }
    transfer(sender, receiver, currencyID, amount) {
        const tokenAmount = new property_js_1.Amount(currencyID, amount);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new transfer_js_1.TransfersItem(receiver, [tokenAmount]);
        const fact = new transfer_js_1.TransfersFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    mint(receiver, currencyID, amount) {
        const tokenAmount = new property_js_1.Amount(currencyID, amount);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new inflate_js_1.SuffrageInflationItem(receiver, tokenAmount);
        const fact = new inflate_js_1.SuffrageInflationFact(token, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
}
exports.Currency = Currency;
//# sourceMappingURL=index.js.map