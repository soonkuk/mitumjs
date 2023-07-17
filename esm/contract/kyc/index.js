// import { AxiosResponse } from "axios";
import { OperationType } from "../../types/operation.js";
import { isIPAddress } from "../../utils/validation.js";
import { isAddress } from "../../utils/validation.js";
import { TimeStamp } from "../../utils/time.js";
import { AddControllersFact, AddControllersItem } from "./addController.js";
import { RemoveControllersFact, RemoveControllersItem } from "./remove.js";
import { UpdateCustomersFact, UpdateCustomersItem } from "./update.js";
import { AddCustomersFact, AddCustomersItem } from "./addCustomer.js";
import { CreateKYCServiceFact } from "./create.js";
export class Kyc {
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
    addController(sender, controller, currency) {
        const token = new TimeStamp().UTC();
        const item = new AddControllersItem(this._contractAddress, this._serviceID, controller, currency);
        const fact = new AddControllersFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    addCustomer(sender, customer, status, currency) {
        const token = new TimeStamp().UTC();
        const item = new AddCustomersItem(this._contractAddress, this._serviceID, customer, status, currency);
        const fact = new AddCustomersFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    createKYCService(sender, serviceID, controllers, currency) {
        const token = new TimeStamp().UTC();
        const fact = new CreateKYCServiceFact(token, sender, this._contractAddress, serviceID, controllers, currency);
        this.setServiceId(serviceID);
        return new OperationType(this._networkID, fact);
    }
    removeController(sender, controller, currency) {
        const token = new TimeStamp().UTC();
        const item = new RemoveControllersItem(this._contractAddress, this._serviceID, controller, currency);
        const fact = new RemoveControllersFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    updateCustomer(sender, customer, status, currency) {
        const token = new TimeStamp().UTC();
        const item = new UpdateCustomersItem(this._contractAddress, this._serviceID, customer, status, currency);
        const fact = new UpdateCustomersFact(token, sender, [item]);
        return new OperationType(this._networkID, fact);
    }
    auxFunction() {
        return this._node;
    }
}
//# sourceMappingURL=index.js.map