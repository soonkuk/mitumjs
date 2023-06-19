"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
const validation_1 = require("../utils/validation");
const time_1 = require("../utils/time");
const operation_1 = require("../types/operation");
const property_1 = require("../types/property");
const updatePolicy_1 = require("./updatePolicy");
const transfer_1 = require("./transfer");
const register_1 = require("./register");
const information_1 = __importDefault(require("./information"));
const design_1 = require("./design");
const inflate_1 = require("./inflate");
class Currency {
    constructor(provider) {
        this._node = "";
        this._setNode(provider);
    }
    _setNode(provider) {
        if ((0, validation_1.isIPAddress)(provider)) {
            this._node = provider;
        }
    }
    getAll() {
        return information_1.default.getAllCurrencyInfo(this._node);
    }
    get(currencyID) {
        return information_1.default.getCurrencyInfo(this._node, currencyID);
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
        const policy = new design_1.CurrencyPolicy(data.minBalance, feePolicy);
        if (data.totalSupply === undefined || data.genesisAddress === undefined) {
            throw new Error("The values for the 'totalSupply' or 'genesisAddress' fields were not entered.");
        }
        const amount = new property_1.Amount(data.currencyID, data.totalSupply);
        const design = new design_1.CurrencyDesign(amount, data.genesisAddress, policy);
        const token = new time_1.TimeStamp().UTC();
        const fact = new register_1.CurrencyRegisterFact(token, design);
        return new operation_1.OperationType(fact);
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
        const policy = new design_1.CurrencyPolicy(data.minBalance, feePolicy);
        const token = new time_1.TimeStamp().UTC();
        const fact = new updatePolicy_1.CurrencyPolicyUpdaterFact(token, data.currencyID, policy);
        return new operation_1.OperationType(fact);
    }
    setFeePolicy(feeType, feeReceiver, fee, minFee, maxFee) {
        let feePolicy;
        if (feeType === "none") {
            feePolicy = new design_1.NilFeeer();
        }
        else if (feeType === "fixed" &&
            feeReceiver !== undefined &&
            fee !== undefined) {
            feePolicy = new design_1.FixedFeeer(feeReceiver, fee);
        }
        else if (feeType === "ratio" &&
            feeReceiver !== undefined &&
            fee !== undefined &&
            minFee !== undefined &&
            maxFee !== undefined) {
            feePolicy = new design_1.RatioFeeer(feeReceiver, fee, minFee, maxFee);
        }
        else {
            throw new Error("The fee-type and its fields-value were not entered correctly.");
        }
        return feePolicy;
    }
    transfer(sender, receiver, currencyID, amount) {
        const tokenAmount = new property_1.Amount(currencyID, amount);
        const token = new time_1.TimeStamp().UTC();
        const item = new transfer_1.TransfersItem(receiver, [tokenAmount]);
        const fact = new transfer_1.TransfersFact(token, sender, [item]);
        return new operation_1.OperationType(fact);
    }
    mint(receiver, currencyID, amount) {
        const tokenAmount = new property_1.Amount(currencyID, amount);
        const token = new time_1.TimeStamp().UTC();
        const item = new inflate_1.SuffrageInflationItem(receiver, tokenAmount);
        const fact = new inflate_1.SuffrageInflationFact(token, [item]);
        return new operation_1.OperationType(fact);
    }
}
exports.Currency = Currency;
//# sourceMappingURL=index.js.map