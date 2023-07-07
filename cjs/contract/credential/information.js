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
const axios_1 = __importDefault(require("axios"));
exports.default = {
    getServiceInfo(provider, contract, serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (provider === "" || contract === "" || serviceId === "") {
                return Promise.reject(new Error("RPC-URL is not provided or You need to set 'contract address and credential id'."));
            }
            try {
                const res = yield axios_1.default.get(`${provider}/did/${contract}/issuer/${serviceId}`);
                return res;
            }
            catch (error) {
                return Promise.reject(new Error(`Error getting node information: ${error.message}`));
            }
        });
    },
    getCredentialInfo(provider, contract, serviceId, templateId, credentialId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (provider === "" || contract === "" || serviceId === "") {
                return Promise.reject(new Error("RPC-URL is not provided or You need to set 'contract address and credential id'."));
            }
            try {
                const res = yield axios_1.default.get(`${provider}/did/${contract}/issuer/${serviceId}/template/${templateId}/credential/${credentialId}`);
                return res;
            }
            catch (error) {
                return Promise.reject(new Error(`Error getting node information: ${error.message}`));
            }
        });
    },
    getTemplate(provider, contract, serviceId, templateId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (provider === "" || contract === "" || serviceId === "") {
                return Promise.reject(new Error("RPC-URL is not provided or You need to set 'contract address and credential id'."));
            }
            try {
                const res = yield axios_1.default.get(`${provider}/did/${contract}/issuer/${serviceId}/template/${templateId}`);
                return res;
            }
            catch (error) {
                return Promise.reject(new Error(`Error getting node information: ${error.message}`));
            }
        });
    },
    getCredentialByHolder(provider, contract, serviceId, holder) {
        return __awaiter(this, void 0, void 0, function* () {
            if (provider === "" || contract === "" || serviceId === "") {
                return Promise.reject(new Error("RPC-URL is not provided or You need to set 'contract address and credential id'."));
            }
            try {
                const res = yield axios_1.default.get(`${provider}/did/${contract}/issuer/${serviceId}/holder/${holder}`);
                return res;
            }
            catch (error) {
                return Promise.reject(new Error(`Error getting node information: ${error.message}`));
            }
        });
    },
};
//# sourceMappingURL=information.js.map