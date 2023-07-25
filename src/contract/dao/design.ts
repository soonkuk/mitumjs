import { IBuffer, IString } from "../../types/interface.js";
import { Uint8 } from "../../utils/math.js";

export const CRYPTO = "crypto";
export const BIZ = "biz";

export type DaoType = typeof CRYPTO | typeof BIZ;

export class DaoOption implements IBuffer, IString {
  private o: DaoType;

  constructor(o: string) {
    if (o === CRYPTO || o === BIZ) {
      this.o = o as DaoType;
    } else {
      throw new Error(`Invalid dao's option-value: ${o}`);
    }
  }

  toBuffer(): Buffer {
    return Buffer.from(this.o);
  }

  toString(): string {
    return this.o;
  }
}

export type policyData = {
  voteToken: string;
  threshold: number;
  fee: number;
  proposers: string[];
  waitingTime: number;
  registrationPeriod: number;
  preSnapPeriod: number;
  votingPeriod: number;
  postSnapPeriod: number;
  executionDelay: number;
  turnout: number;
  quorum: number;
};

export type daoData = policyData & {
  serviceId: string;
  option: string;
};

export class Percent implements IBuffer, IString {
  readonly p: Uint8;

  constructor(p: number) {
    if (p > 100) {
      throw new Error("The turnout or quorum value can't exceed 100 percent.");
    }

    this.p = new Uint8(p);
  }

  toBuffer(): Buffer {
    return this.p.toBuffer();
  }

  toString(): string {
    return this.p.toString();
  }

  get v(): number {
    return this.p.v;
  }
}
