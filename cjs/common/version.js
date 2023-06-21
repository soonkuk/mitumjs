"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = void 0;
const intro_js_1 = require("../intro.js");
class Version {
    constructor() {
        this._version = "";
        const version = intro_js_1.MITUM_JS_VERSION;
        this._setVersion(version);
    }
    _setVersion(version) {
        this._version = version;
    }
    getVersion() {
        return this._version;
    }
}
exports.Version = Version;
//# sourceMappingURL=version.js.map