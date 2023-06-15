import { Hint } from "./property";
import { HintedObject, IBuffer, IHintedObject, IString } from "./interface";

export abstract class Item implements IBuffer, IString, IHintedObject {
  private hint: Hint;

  constructor(hint: string) {
    this.hint = new Hint(hint);
  }

  abstract toBuffer(): Buffer;
  abstract toString(): string;

  toHintedObject(): HintedObject {
    return {
      _hint: this.hint.toString(),
    };
  }
}
