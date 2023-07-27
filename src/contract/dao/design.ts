import { IBuffer, IString } from "../../types/interface.js";

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
