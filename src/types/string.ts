import { IBuffer, IString } from "./interface.js";

export class String implements IBuffer, IString {
  private s: string;

  constructor(s: string) {
    this.s = s;
  }

  toBuffer(): Buffer {
    return Buffer.from(this.s);
  }

  toString(): string {
    return this.s;
  }
}
