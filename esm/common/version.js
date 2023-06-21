import { MITUM_JS_VERSION } from "../intro.js";
export class Version {
    constructor() {
        this._version = "";
        const version = MITUM_JS_VERSION;
        this._setVersion(version);
    }
    _setVersion(version) {
        this._version = version;
    }
    getVersion() {
        return this._version;
    }
}
//# sourceMappingURL=version.js.map