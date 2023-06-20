// Optional: The option is node's address
export function signOperation(privateKey, operation, option) {
    operation.sign(privateKey, option);
    return JSON.stringify(operation.toHintedObject());
}
//# sourceMappingURL=sign.js.map