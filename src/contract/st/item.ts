import { Address } from "../../account/address.js";
import { ContractID, CurrencyID } from "../../types/property.js";
import { Item } from "../../types/item.js";
import { HintedObject } from "../../types/interface.js";

export abstract class STItem extends Item {
  readonly contract: Address;
  readonly service: ContractID;
  readonly currency: CurrencyID;

  constructor(
    hint: string,
    contract: string,
    serviceId: string,
    currency: string
  ) {
    super(hint);

    this.contract = new Address(contract);
    this.service = new ContractID(serviceId);
    this.currency = new CurrencyID(currency);
  }

  toBuffer(): Buffer {
    return Buffer.concat([this.contract.toBuffer(), this.service.toBuffer()]);
  }

  toHintedObject(): HintedObject {
    return {
      ...super.toHintedObject(),
      contract: this.contract.toString(),
      stoid: this.service.toString(),
      currency: this.currency.toString(),
    };
  }
}
