import { isIPAddress } from "../utils/validation";
// import { Sign } from "./sign";
// import { Send } from "./send";

export class Operation {
  private _node: string = "";

  constructor(provider?: string) {
    this._setNode(provider);
  }

  private _setNode(provider?: string) {
    if (isIPAddress(provider)) {
      this._node = provider as string;
    }
  }

  //   // sign: privatekey와 operation을 인자로 받아 signedOperation을 반환한다.
  //   sign(privatekey: , operation: ): signedOperation {
  //     // operation에 서명을 추가하는 함수. Sign 에서 실행
  //     return signedOperation;
  //   }
  //   // send: signedOperation을 노드에 request 하고, 처리 결과(json?)를 반환한다.
  //   send(signedOperation: ): result {
  //     return result;
  //   }
}
