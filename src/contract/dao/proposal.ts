import { Address } from "../../account/address.js";
import { HintedObject, IBuffer, IHintedObject } from "../../types/interface.js";
import { Hint } from "../../types/property.js";
import { String } from "../../types/string.js";
import { Big, Uint8 } from "../../utils/math.js";
import { Calldata } from "./calldata.js";

const CryptoProposalHint = "mitum-dao-crypto-proposal";
const BizProposalHint = "mitum-dao-biz-proposal";

export interface Proposal extends IBuffer, IHintedObject {
  hint: Hint;
  proposer: Address;
  toBuffer(): Buffer;
  toHintedObject(): HintedObject;
}

export class CryptoProposal implements Proposal {
  readonly hint: Hint;
  readonly proposer: Address;
  readonly startTime: Big;
  readonly calldata: Calldata;

  constructor(proposer: string, startTime: number, calldata: Calldata) {
    this.hint = new Hint(CryptoProposalHint);

    this.proposer = new Address(proposer);
    this.startTime = new Big(startTime);
    this.calldata = calldata;
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.proposer.toBuffer(),
      this.startTime.toBuffer("fill"),
      this.calldata.toBuffer(),
    ]);
  }

  toHintedObject(): HintedObject {
    return {
      _hint: this.hint.toString(),
      proposer: this.proposer.toString(),
      start_time: this.startTime.v,
      call_data: this.calldata.toHintedObject(),
    };
  }
}

export class BizProposal implements Proposal {
  readonly hint: Hint;
  readonly proposer: Address;
  readonly startTime: Big;
  readonly url: String;
  readonly hash: String;
  readonly options: Uint8;

  constructor(
    proposer: string,
    startTime: number,
    url: string,
    hash: string,
    options: number
  ) {
    this.hint = new Hint(BizProposalHint);

    this.proposer = new Address(proposer);
    this.startTime = new Big(startTime);
    this.url = new String(url);
    this.hash = new String(hash);
    this.options = new Uint8(options);
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.proposer.toBuffer(),
      this.startTime.toBuffer("fill"),
      this.url.toBuffer(),
      this.hash.toBuffer(),
      this.options.toBuffer(),
    ]);
  }

  toHintedObject(): HintedObject {
    return {
      _hint: this.hint.toString(),
      proposer: this.proposer.toString(),
      start_time: this.startTime.v,
      url: this.url.toString(),
      hash: this.hash.toString(),
      options: this.options.v,
    };
  }
}
