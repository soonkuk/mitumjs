import { isIPAddress } from "../utils/validation";

import { Operation } from "../types/operation";
import { Fact } from "../types/fact";

import axios, { AxiosResponse } from "axios";

import currencyInfo from "./information";

export class Currency {
  private _node: string = "";

  constructor(provider?: string) {
    this._setNode(provider);
  }

  private _setNode(provider?: string) {
    if (isIPAddress(provider)) {
      this._node = provider as string;
    }
  }

  getAll(): Promise<AxiosResponse> {
    return currencyInfo.getAllCurrencyInfo(this._node);
  }

  get(currencyID: string): any {
    return currencyInfo.getCurrencyInfo(this._node, currencyID);
  }

  // 여기부터 작업
  create(obj: any): Operation<Fact> {
    // 새로운 currency 등록
    // 반환값은 오퍼레이션

    return new Operation(fact);
  }

  setPolicy(obj: any): Operation<Fact> {
    // currency 정책 변경
    // 반환값은 오퍼레이션
    return new Operation(fact);
  }

  transfer(
    sender: string,
    receiver: string,
    currencyID: string,
    amount: number
  ): any {
    // currency 전송
    // 반환값은 실제 반환하는 객체를 우선 확인.
  }

  mint(obj: any): Operation<Fact> {
    // currency 추가 발행
    // 반환값은 오퍼레이션
    return new Operation(fact);
  }
}
