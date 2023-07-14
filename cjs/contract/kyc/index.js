"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.St = void 0;
const operation_js_1 = require("../../types/operation.js");
const validation_js_1 = require("../../utils/validation.js");
const validation_js_2 = require("../../utils/validation.js");
const time_js_1 = require("../../utils/time.js");
const addController_js_1 = require("./addController.js");
const remove_js_1 = require("./remove.js");
const update_js_1 = require("./update.js");
const addCustomer_js_1 = require("./addCustomer.js");
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
    addController(sender, controller, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const item = new addController_js_1.AddControllersItem(this._contractAddress, this._serviceID, controller, currency);
        const fact = new addController_js_1.AddControllersFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    addCustomer(sender, customer, status, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const item = new addCustomer_js_1.AddCustomersItem(this._contractAddress, this._serviceID, customer, status, currency);
        const fact = new addCustomer_js_1.AddCustomersFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    createSTService(sender, serviceID, controllers, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const fact = new create_js_1.CreateKYCServiceFact(token, sender, this._contractAddress, serviceID, controllers, currency);
        this.setServiceId(serviceID);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    removeController(sender, controller, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const item = new remove_js_1.RemoveControllersItem(this._contractAddress, this._serviceID, controller, currency);
        const fact = new remove_js_1.RemoveControllersFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
    updateCustomer(sender, customer, status, currency) {
        const token = new time_js_1.TimeStamp().UTC();
        const item = new update_js_1.UpdateCustomersItem(this._contractAddress, this._serviceID, customer, status, currency);
        const fact = new update_js_1.UpdateCustomersFact(token, sender, [item]);
        return new operation_js_1.OperationType(this._networkID, fact);
    }
}
exports.St = St;
//# sourceMappingURL=index.js.map