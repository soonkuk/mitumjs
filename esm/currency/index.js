var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isIPAddress } from "../utils/validation";
import { TimeStamp } from "../utils/time";
import { OperationType } from "../types/operation";
import { Amount } from "../types/property";
import { CurrencyPolicyUpdaterFact } from "./updatePolicy";
import { TransfersFact, TransfersItem } from "./transfer";
import { CurrencyRegisterFact } from "./register";
import currencyInfo from "./information";
import { NilFeeer, FixedFeeer, RatioFeeer, CurrencyPolicy, CurrencyDesign, } from "./design";
import { SuffrageInflationFact, SuffrageInflationItem } from "./inflate";
export class Currency {
    constructor(provider) {
        this._node = "";
        this._setNode(provider);
    }
    _setNode(provider) {
        if (isIPAddress(provider)) {
            this._node = provider;
        }
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield currencyInfo.getAllCurrencyInfo(this._node);
        });
    }
    get(currencyID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield currencyInfo.getCurrencyInfo(this._node, currencyID);
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
        const policy = new CurrencyPolicy(data.minBalance, feePolicy);
        if (data.totalSupply === undefined || data.genesisAddress === undefined) {
            throw new Error("The values for the 'totalSupply' or 'genesisAddress' fields were not entered.");
        }
        const amount = new Amount(data.currencyID, data.totalSupply);
        const design = new CurrencyDesign(amount, data.genesisAddress, policy);
        const token = new TimeStamp().UTC();
        const fact = new CurrencyRegisterFact(token, design);
        return new OperationType(fact);
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
        const policy = new CurrencyPolicy(data.minBalance, feePolicy);
        const token = new TimeStamp().UTC();
        const fact = new CurrencyPolicyUpdaterFact(token, data.currencyID, policy);
        return new OperationType(fact);
    }
    setFeePolicy(feeType, feeReceiver, fee, minFee, maxFee) {
        let feePolicy;
        if (feeType === "none") {
            feePolicy = new NilFeeer();
        }
        else if (feeType === "fixed" &&
            feeReceiver !== undefined &&
            fee !== undefined) {
            feePolicy = new FixedFeeer(feeReceiver, fee);
        }
        else if (feeType === "ratio" &&
            feeReceiver !== undefined &&
            fee !== undefined &&
            minFee !== undefined &&
            maxFee !== undefined) {
            feePolicy = new RatioFeeer(feeReceiver, fee, minFee, maxFee);
        }
        else {
            throw new Error("The fee-type and its fields-value were not entered correctly.");
        }
        return feePolicy;
    }
    transfer(sender, receiver, currencyID, amount) {
        const tokenAmount = new Amount(currencyID, amount);
        const token = new TimeStamp().UTC();
        const item = new TransfersItem(receiver, [tokenAmount]);
        const fact = new TransfersFact(token, sender, [item]);
        return new OperationType(fact);
    }
    mint(receiver, currencyID, amount) {
        const tokenAmount = new Amount(currencyID, amount);
        const token = new TimeStamp().UTC();
        const item = new SuffrageInflationItem(receiver, tokenAmount);
        const fact = new SuffrageInflationFact(token, [item]);
        return new OperationType(fact);
    }
}
//# sourceMappingURL=index.js.map