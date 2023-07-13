import { IBuffer, IString } from "../../types/interface.js";

export class Partition implements IBuffer, IString {
  private p: string;

  constructor(p: string) {
    this.p = p;
  }

  toBuffer(): Buffer {
    return Buffer.from(this.p);
  }

  toString(): string {
    return this.p;
  }
}
