import { Currency } from "../currency";
import { Operation } from "../operation";
import { Account } from "../account";
import operationInfo from "../operation/information";
import { sendOperation } from "../operation/send";
import { node, genesis, account1, account2 } from "./dummy";
import { OperationType } from "../types/operation";
import { AxiosResponse } from "axios";

const provider = node;

describe("Currency", () => {
  let operation: Operation;

  beforeEach(() => {
    operation = new Operation(node);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  jest.mock("../operation/send", () => ({
    sendOperation: jest.fn().mockResolvedValue({ data: "mocked" }),
  }));

  test("create-account operation", () => {
    const sender = genesis.address;
    const receiver = account1.publickey;
    const currencyID = "MCC";
    const amount = 1000;

    const privateKey = genesis.privatekey;

    // oper 생성 => sign => send 까지 모두 한 번에
    const rawOperation = new Account(node).create(
      sender,
      receiver,
      currencyID,
      amount
    );
    expect(rawOperation).toBeInstanceOf(OperationType);

    const signedOperation = operation.sign(privateKey, rawOperation);
    expect(signedOperation).toBeInstanceOf(OperationType);

    expect(signedOperation.toHintedObject().signs !== undefined).toBe(true);

    it("sendOperation() by create-account", async () => {
      const response: AxiosResponse = await operation.send(signedOperation);
      expect(sendOperation).toHaveBeenCalledTimes(1);
      expect(sendOperation).toHaveBeenCalledWith(privateKey, signedOperation);
      expect(response.data).toEqual("mocked");
    });
  });

  test("currency-transfer operation", () => {
    const sender = account1.address;
    const receiver = account2.address;
    const currencyID = "MCC";
    const amount = 1000;

    const privateKey = account1.privatekey;

    // oper 생성 => sign => send 까지 모두 한 번에
    const rawOperation = new Currency(node).transfer(
      sender,
      receiver,
      currencyID,
      amount
    );
    expect(rawOperation).toBeInstanceOf(OperationType);

    const signedOperation = operation.sign(privateKey, rawOperation);
    expect(signedOperation).toBeInstanceOf(OperationType);

    expect(signedOperation.toHintedObject().signs !== undefined).toBe(true);

    it("sendOperation() by currency-transfer", async () => {
      const response: AxiosResponse = await operation.send(signedOperation);
      expect(sendOperation).toHaveBeenCalledTimes(1);
      expect(sendOperation).toHaveBeenCalledWith(privateKey, signedOperation);
      expect(response.data).toEqual("mocked");
    });
  });

  jest.mock("../operation/information", () => ({
    getAllOperationsInfo: jest.fn().mockResolvedValue({ data: "mocked" }),
    getOperationInfo: jest.fn().mockResolvedValue({ data: "mocked" }),
  }));

  // operation 조회. it 함수
  it("block.getAll()", async () => {
    await operation.getAll();

    expect(operationInfo.getAllOperationsInfo).toHaveBeenCalledTimes(1);
    expect(operationInfo.getAllOperationsInfo).toHaveBeenCalledWith(node);
  });

  it("block.get()", async () => {
    const factHash = "2rmEZi4YYdN4G6HSnyWHHMi63BrkyYuFPbuajiuEuU3V";
    await operation.get(factHash);

    expect(operationInfo.getOperationInfo).toHaveBeenCalledTimes(1);
    expect(operationInfo.getOperationInfo).toHaveBeenCalledWith(node, factHash);
  });
});
