// import { AxiosResponse } from "axios";
import { OperationType } from "../../types/operation.js";
import { isIPAddress } from "../../utils/validation.js";
import { isAddress } from "../../utils/validation.js";
import { TimeStamp } from "../../utils/time.js";
import { AuthorizeOperatorsFact, AuthorizeOperatorsItem } from "./authorize.js";
import { IssueSecurityTokensFact, IssueSecurityTokensItem } from "./issue.js";
import { RedeemTokensFact, RedeemTokensItem } from "./redeem.js";
import { RevokeOperatorsFact, RevokeOperatorsItem } from "./revoke.js";
import { SetDocumentFact } from "./document.js";
import { TransferSecurityTokensPartitionFact, TransferSecurityTokensPartitionItem, } from "./transfer.js";
import { CreateSecurityTokensFact, CreateSecurityTokensItem, } from "./create.js";
export class St {
    constructor(networkID, provider) {
        this._networkID = "";
        this._node = "";
        this._contractAddress = "";
        this._serviceID = "";
        this._setNode(provider);
        this._setChain(networkID);
    }
    _setNode(provider) {
        if (isIPAddress(provider)) {
            this._node = provider;
        }
    }
    _setChain(networkID) {
        this._networkID = networkID;
    }
    setContractAddress(contractAddress) {
        if (this._contractAddress !== contractAddress &&
            isAddress(contractAddress)) {
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
        const token = new TimeStamp().UTC();
        const item = new AuthorizeOperatorsItem(this._contractAddress, this._serviceID, operator, partition, currencyID);
        const fact = new AuthorizeOperatorsFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
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
        const token = new TimeStamp().UTC();
        const item = new CreateSecurityTokensItem(this._contractAddress, data.serviceId, data.granularity, data.defaultPartition, data.controllers, currency);
        const fact = new CreateSecurityTokensFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    issue(sender, receiver, partition, amount, currency) {
        const token = new TimeStamp().UTC();
        const item = new IssueSecurityTokensItem(this._contractAddress, this._serviceID, receiver, amount, partition, currency);
        const fact = new IssueSecurityTokensFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    redeem(sender, tokenHolder, partition, amount, currency) {
        const token = new TimeStamp().UTC();
        const item = new RedeemTokensItem(this._contractAddress, this._serviceID, tokenHolder, amount, partition, currency);
        const fact = new RedeemTokensFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    revokeOperator(sender, operator, partition, currencyID) {
        const token = new TimeStamp().UTC();
        const item = new RevokeOperatorsItem(this._contractAddress, this._serviceID, operator, partition, currencyID);
        const fact = new RevokeOperatorsFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    setDocument(sender, title, uri, documentHash, currencyID) {
        const token = new TimeStamp().UTC();
        const fact = new SetDocumentFact(token, sender, this._contractAddress, this._serviceID, title, uri, documentHash, currencyID);
        return new OperationType(this._networkID, fact);
    }
    transferByPartition(sender, holder, receiver, partition, amount, currencyID) {
        const token = new TimeStamp().UTC();
        const item = new TransferSecurityTokensPartitionItem(this._contractAddress, this._serviceID, holder, receiver, partition, amount, currencyID);
        const fact = new TransferSecurityTokensPartitionFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    auxFunction() {
        return this._node;
    }
}
//# sourceMappingURL=index.js.map