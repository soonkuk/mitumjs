import { Address } from "../../account/address.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { Item } from "../../types/item.js";
import { HintedObject } from "../../types/interface.js";

export abstract class NFTItem extends Item {
  readonly contract: Address;
  readonly collection: ContractID;
  readonly currency: CurrencyID;

  constructor(
    hint: string,
    contract: string,
    collection: string,
    currency: string
  ) {
    super(hint);

    this.contract = new Address(contract);
    this.collection = new ContractID(collection);
    this.currency = new CurrencyID(currency);
  }

  toBuffer(): Buffer {
    return Buffer.concat([
      this.contract.toBuffer(),
      this.collection.toBuffer(),
    ]);
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      contract: this.contract.toString(),
      collection: this.collection.toString(),
      currency: this.currency.toString(),
    };
  }
}
