"use strict";
// import { AxiosResponse } from "axios";
Object.defineProperty(exports, "__esModule", { value: true });
exports.St = void 0;
const operation_js_1 = require("../../types/operation.js");
const validation_js_1 = require("../../utils/validation.js");
const validation_js_2 = require("../../utils/validation.js");
const time_js_1 = require("../../utils/time.js");
const authorize_js_1 = require("./authorize.js");
const issue_js_1 = require("./issue.js");
const redeem_js_1 = require("./redeem.js");
const revoke_js_1 = require("./revoke.js");
const document_js_1 = require("./document.js");
const transfer_js_1 = require("./transfer.js");
const create_js_1 = require("./create.js");
class St {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._contractAddress = "";
        this._serviceID = "";
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
    setContractAddress(contractAddress) {
        if (this._contractAddress !== contractAddress &&
            (0, validation_js_2.isAddress)(contractAddress)) {
            this._contractAddress = contractAddress;
            console.log("Contract address is changed : ", this._contractAddress);
        }
        else {
            console.error("This is invalid address type");
        }
    }
    setServiceId(serviceId) {
        if (this._serviceID !== serviceId) {
            this._serviceID = serviceId;
            console.log("Service ID is changed : ", this._serviceID);
        }
    }
    getContractAddress() {
        return this._contractAddress.toString();
    }
    getServiceId() {
        return this._serviceID.toString();
    }
    authorizeOperator(sender, operator, partition, currencyID) {
        const token = new time_js_1.TimeStamp().UTC();
        const item = new authorize_js_1.AuthorizeOperatorsItem(this._contractAddress, this._serviceID, operator, partition, currencyID);
        const fact = new authorize_js_1.AuthorizeOperatorsFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    /** structure
     * stData = {
     *    serviceId: string;
     *    granularity: number;
     *    defaultPartition: string;
     *    controllers: string[];
     * }
     */
    createSTService(sender, data, currency) {
        this.setServiceId(data.serviceId);
        const token = new time_js_1.TimeStamp().UTC();
        const item = new create_js_1.CreateSecurityTokensItem(this._contractAddress, data.serviceId, data.granularity, data.defaultPartition, data.controllers, currency);
        const fact = new create_js_1.CreateSecurityTokensFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    issue(sender, receiver, partition, amount, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const item = new issue_js_1.IssueSecurityTokensItem(this._contractAddress, this._serviceID, receiver, amount, partition, currency);
        const fact = new issue_js_1.IssueSecurityTokensFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    redeem(sender, tokenHolder, partition, amount, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const item = new redeem_js_1.RedeemTokensItem(this._contractAddress, this._serviceID, tokenHolder, amount, partition, currency);
        const fact = new redeem_js_1.RedeemTokensFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    revokeOperator(sender, operator, partition, currencyID) {
        const token = new time_js_1.TimeStamp().UTC();
        const item = new revoke_js_1.RevokeOperatorsItem(this._contractAddress, this._serviceID, operator, partition, currencyID);
        const fact = new revoke_js_1.RevokeOperatorsFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    setDocument(sender, title, uri, documentHash, currencyID) {
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new document_js_1.SetDocumentFact(token, sender, this._contractAddress, this._serviceID, title, uri, documentHash, currencyID);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    transferByPartition(sender, holder, receiver, partition, amount, currencyID) {
        const token = new time_js_1.TimeStamp().UTC();
        const item = new transfer_js_1.TransferSecurityTokensPartitionItem(this._contractAddress, this._serviceID, holder, receiver, partition, amount, currencyID);
        const fact = new transfer_js_1.TransferSecurityTokensPartitionFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    auxFunction() {
        return this._node;
    }
}
exports.St = St;
//# sourceMappingURL=index.js.map