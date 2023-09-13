import base58 from "bs58"
import { OperationJson, GeneralFactSign, NodeFactSign } from "./base"

import { sha3 } from "../utils"
import { NetworkID } from "../node"
import { Key, KeyPair, NodeAddress } from "../key"
import { HintedObject, FullTimeStamp, TimeStamp } from "../types"

export class Signer {
    readonly keypair: KeyPair
    readonly id: string

    constructor(privateKey: string | Key) {
        privateKey = Key.from(privateKey)
        this.keypair = KeyPair.fromPrivateKey(privateKey)
        this.id = NetworkID.get()
    }

    sign(json: HintedObject, option?: { node: string }) {
        return option ? this.nodeSign(json as OperationJson, option.node) : this.accSign(json as OperationJson)
    }

    private accSign(json: OperationJson) {
        const now = new TimeStamp()

        const fs = new GeneralFactSign(
            this.keypair.publicKey.toString(),
            this.keypair.sign(
                Buffer.concat([
                    Buffer.from(this.id),
                    base58.decode(json.fact.hash),
                    now.toBuffer(),
                ])
            ),
            now.toString(),
        ).toHintedObject()

        if (json.signs !== undefined) {
            json.signs = [...json.signs, fs]
        } else {
            json.signs = [fs]
        }

        const factSigns = json.signs
            .map((s) =>
                Buffer.concat([
                    Buffer.from(s.signer),
                    base58.decode(s.signature),
                    new FullTimeStamp(s.signed_at).toBuffer("super"),
                ])
            )
            .sort((a, b) => Buffer.compare(a, b))

        const msg = Buffer.concat([
            base58.decode(json.fact.hash),
            Buffer.concat(factSigns),
        ])

        json.hash = base58.encode(sha3(msg))

        return json
    }

    private nodeSign(json: OperationJson, node: string) {
        const nd = new NodeAddress(node)
        const now = new TimeStamp()
        const fs = new NodeFactSign(
            node,
            this.keypair.publicKey.toString(),
            this.keypair.sign(
                Buffer.concat([
                    Buffer.from(this.id),
                    nd.toBuffer(),
                    base58.decode(json.fact.hash),
                    now.toBuffer(),
                ])
            ),
            now.toString(),
        ).toHintedObject()

        if (json.signs) {
            json.signs = [...json.signs, fs]
        } else {
            json.signs = [fs]
        }

        const factSigns = json.signs
            .map((s) =>
                Buffer.concat([
                    Buffer.from(s.signer),
                    base58.decode(s.signature),
                    new FullTimeStamp(s.signed_at).toBuffer("super"),
                ])
            )
            .sort((a, b) => Buffer.compare(a, b))

        const msg = Buffer.concat([
            base58.decode(json.fact.hash),
            Buffer.concat(factSigns),
        ])

        json.hash = base58.encode(sha3(msg))

        return json
    }
}