import { IBuffer, IString } from "./interface.js";

export class Date implements IBuffer, IString {
  private d: string;

  constructor(d: string) {
    this.d = d;
  }

  toBuffer(): Buffer {
    return Buffer.from(this.d);
  }

  get v(): string {
    return this.d;
  }
}
