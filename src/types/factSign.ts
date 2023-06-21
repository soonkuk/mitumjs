import base58 from "bs58";

import { Assert, ECODE, MitumError } from "../utils/error.js";
import { FullTimeStamp } from "../utils/time.js";

import { Address, NodeAddress } from "../account/address.js";
import { FS, M2FS, NodeFS } from "./iFact.js";
import { Key } from "../account/publicKey.js";
import { IBuffer } from "./interface.js";

export abstract class FactSign implements IBuffer {
  readonly signer: Key;
  readonly signature: Buffer;
  readonly signedAt: FullTimeStamp;

  constructor(signer: string | Key, signature: Buffer, signedAt: string) {
    this.signature = signature;
    this.signedAt = new FullTimeStamp(signedAt);

    this.signer = Key.from(signer);
    Assert.get(
      this.signer.isPriv,
      MitumError.detail(ECODE.INVALID_PUBLIC_KEY, "not public key")
    )
      .not()
      .excute();
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.signer.toBuffer(),
      this.signature,
      this.signedAt.toBuffer("super"),
    ]);
  }

  toHintedObject(): FS {
    return {
      signer: this.signer.toString(),
      signature: base58.encode(this.signature),
      signed_at: this.signedAt.ISO(),
    };
  }
}

export class M2FactSign extends FactSign {
  constructor(signer: string | Key, signature: Buffer, signedAt: string) {
    super(signer, signature, signedAt);
  }

  toHintedObject(): M2FS {
    return super.toHintedObject();
  }
}

export class M2NodeFactSign extends FactSign {
  readonly node: Address;

  constructor(
    node: string | NodeAddress,
    signer: string | Key,
    signature: Buffer,
    signedAt: string
  ) {
    super(signer, signature, signedAt);
    this.node = NodeAddress.from(node);
  }

  toBuffer(): Buffer {
    return Buffer.concat([this.node.toBuffer(), super.toBuffer()]);
  }

  toHintedObject(): NodeFS {
    return {
      ...super.toHintedObject(),
      node: this.node.toString(),
    };
  }
}
