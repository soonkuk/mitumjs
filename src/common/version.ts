import { MITUM_JS_VERSION } from "../intro.js";

export class Version {
  private _version: string = "";

  constructor() {
    const version = MITUM_JS_VERSION;
    this._setVersion(version);
  }

  private _setVersion(version: string) {
    this._version = version;
  }

  getVersion(): string {
    return this._version;
  }
}
