import base58 from "bs58";

import { HintedObject, IBuffer, IHintedObject } from "../types/interface";
import { Assert, ECODE, MitumError } from "../utils/error";
import { SortFunc, sha3 } from "../utils/math";

import { CreateContractAccountsFact } from "../contract/create";
import { M2FactSign, M2NodeFactSign } from "./factSign";
import { CurrencyItem } from "../currency/currencyItem";
import { CreateAccountsFact } from "../account/create";
import { MITUM_NETWORK_ID } from "../intro";
import { Hint } from "./property";
import { Fact } from "./fact";

type FactSignType = M2FactSign | M2NodeFactSign;
type SigType = "M2FactSign" | "M2NodeFactSign" | null;
// type SignOption = {
//   node: string;
// };

export class Operation<T extends Fact> implements IBuffer, IHintedObject {
  readonly id: string;
  readonly hint: Hint;
  readonly memo: string;
  readonly fact: T;
  private _factSigns: FactSignType[];
  private _hash: Buffer;

  constructor(fact: T, memo?: string) {
    this.id = MITUM_NETWORK_ID;
    this.memo = memo ?? "";
    this.fact = fact;

    this.hint = new Hint(fact.operationHint);
    this._factSigns = [];
    this._hash = Buffer.from([]);
  }

  setFactSigns(factSigns: FactSignType[]) {
    if (!factSigns) {
      return;
    }

    Assert.check(
      new Set(factSigns.map((fs) => fs.signer.toString())).size ===
        factSigns.length,
      MitumError.detail(
        ECODE.INVALID_FACTSIGNS,
        "duplicate signers found in factsigns"
      )
    );

    const sigType = this.getSigType(factSigns);
    if (
      this.fact instanceof CreateAccountsFact ||
      this.fact instanceof CreateContractAccountsFact
    ) {
      switch (sigType) {
        case "M2FactSign":
        case "M2NodeFactSign":
          Assert.check(
            this.fact.items !== undefined &&
              (this.fact.items[0] as CurrencyItem).addressType !== "",
            MitumError.detail(ECODE.INVALID_FACTSIGN, "m2 factsign for m1 fact")
          );
          break;
        default:
          throw MitumError.detail(
            "EC_INVALID_SIG_TYPE",
            "invalid factsign type in factsigns"
          );
      }
    }

    this._factSigns = factSigns;
    this._hash = this.hashing();
  }

  get factSigns() {
    return this._factSigns;
  }

  get hash() {
    return this._hash;
  }

  get factSignType() {
    return this.getSigType();
  }

  private getSigType(factSigns?: FactSignType[]): SigType {
    if (!factSigns) {
      factSigns = this._factSigns;
    }

    if (factSigns.length === 0) {
      return null;
    }

    const set = new Set(
      factSigns.map((fs) => Object.getPrototypeOf(fs).constructor.name)
    );
    Assert.check(
      set.size === 1,
      MitumError.detail(
        ECODE.INVALID_FACTSIGNS,
        "multiple sig-type in operation"
      )
    );

    return Array.from(set)[0];
  }

  hashing(force?: "force") {
    let b: Buffer;
    switch (this.getSigType(this._factSigns)) {
      case "M2FactSign":
      case "M2NodeFactSign":
      default:
        b = sha3(this.toBuffer());
    }

    if (force && force === "force") {
      this._hash = b;
    }

    return b;
  }

  toBuffer(): Buffer {
    if (!this._factSigns) {
      return this.fact.hash;
    }

    this._factSigns = this._factSigns.sort(SortFunc);

    return Buffer.concat([
      this.fact.hash,
      Buffer.concat(this._factSigns.map((fs) => fs.toBuffer())),
    ]);
  }

  toHintedObject(): HintedObject {
    const op = {
      _hint: this.hint.toString(),
      fact: this.fact.toHintedObject(),
      hash: this._hash.length === 0 ? "" : base58.encode(this._hash),
    };

    const operation = this.memo ? op : { ...op, memo: this.memo };

    const factSigns =
      this._factSigns.length === 0 ? [] : this._factSigns.sort(SortFunc);

    switch (this.factSignType) {
      case "M2FactSign":
      case "M2NodeFactSign":
        return {
          ...operation,
          signs: factSigns.map((fs) => fs.toHintedObject()),
        };
      default:
        return operation;
    }
  }
}
