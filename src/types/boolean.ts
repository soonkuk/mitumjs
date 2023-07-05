import { IBuffer, IString } from "./interface.js";

export class Boolean implements IBuffer, IString {
  private b: boolean;

  constructor(b: boolean) {
    this.b = b;
  }

  toBuffer(): Buffer {
    return this.b ? Buffer.from([1]) : Buffer.from([0]);
  }

  get v(): boolean {
    return this.b;
  }
}
