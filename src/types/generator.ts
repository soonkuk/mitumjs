import { IP } from "./string"

export abstract class Generator {
    protected _networkID: string
    protected _api: IP | undefined

    protected constructor(networkID: string, api?: string | IP) {
        this._networkID = networkID
        this._api = api ? IP.from(api) : undefined
    }

    /**
     * @deprecated use setNetworkID(networkID: string)
     */
    setChainID(networkID: string) {
        this.setNetworkID(networkID)
    }

    setNetworkID(networkID: string) {
        this._networkID = networkID
    }

    /**
     * @deprecated use setAPI(api?: string | IP)
     */
    setNode(api?: string | IP) {
        this.setAPI(api)
    }

    setAPI(api?: string | IP) {
        this._api = api ? IP.from(api) : undefined
    }

    get networkID() {
        return this._networkID
    }

    get api() {
        return this._api ? this._api.toString() : ""
    }
}