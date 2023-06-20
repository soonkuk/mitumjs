"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOperation = void 0;
// Optional: The option is node's address
function signOperation(privateKey, operation, option) {
    operation.sign(privateKey, option);
    return JSON.stringify(operation.toHintedObject());
}
exports.signOperation = signOperation;
//# sourceMappingURL=sign.js.map