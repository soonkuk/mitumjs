import { Currency } from "../../cjs/currency";
import { Operation } from "../../cjs/operation";
import { Account } from "../../cjs/account";
import operationInfo from "../../cjs/operation/information";
import { sendOperation } from "../../cjs/operation/send";
import { node, genesis, account1, account2 } from "./dummy";
import { OperationType } from "../../cjs/types/operation";
import { AxiosResponse } from "axios";

jest.mock("../../cjs/operation/send", () => ({
  sendOperation: jest.fn().mockResolvedValue({ data: "mocked" }),
}));
jest.mock("../../cjs/operation/information", () => ({
  getAllOperationsInfo: jest.fn().mockResolvedValue({ data: "mocked" }),
  getOperationInfo: jest.fn().mockResolvedValue({ data: "mocked" }),
}));

describe("Currency", () => {
  let operation: Operation;

  beforeEach(() => {
    operation = new Operation(node);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("create-account operation", () => {
    const sender = genesis.address;
    const receiver = account1.publickey;
    const currencyID = "MCC";
    const amount = 1000;

    const privateKey = genesis.privatekey;

    const rawOperation = new Account(node).create(
      sender,
      receiver,
      currencyID,
      amount
    );
    expect(rawOperation).toBeInstanceOf(OperationType);

    const signedOperation = operation.sign(privateKey, rawOperation);
    expect(signedOperation.signs !== null).toBe(true);
  });

  it("sendOperation() by create-account", async () => {
    const sender = genesis.address;
    const receiver = account1.publickey;
    const currencyID = "MCC";
    const amount = 1000;

    const privateKey = genesis.privatekey;

    const rawOperation = new Account(node).create(
      sender,
      receiver,
      currencyID,
      amount
    );

    const signedOperation = operation.sign(privateKey, rawOperation);

    const response: AxiosResponse = await operation.send(signedOperation);
    expect(sendOperation).toHaveBeenCalledTimes(1);
    expect(sendOperation).toHaveBeenCalledWith(
      signedOperation,
      node,
      undefined
    );
    expect(response.data).toEqual("mocked");
  });

  test("currency-transfer operation", () => {
    const sender = account1.address;
    const receiver = account2.address;
    const currencyID = "MCC";
    const amount = 1000;

    const privateKey = account1.privatekey;

    const rawOperation = new Currency(node).transfer(
      sender,
      receiver,
      currencyID,
      amount
    );
    expect(rawOperation).toBeInstanceOf(OperationType);

    const signedOperation = operation.sign(privateKey, rawOperation);
    expect(signedOperation.signs !== null).toBe(true);
  });

  it("sendOperation() by currency-transfer", async () => {
    const sender = account1.address;
    const receiver = account2.address;
    const currencyID = "MCC";
    const amount = 1000;

    const privateKey = account1.privatekey;

    const rawOperation = new Currency(node).transfer(
      sender,
      receiver,
      currencyID,
      amount
    );
    expect(rawOperation).toBeInstanceOf(OperationType);

    const signedOperation = operation.sign(privateKey, rawOperation);

    const response: AxiosResponse = await operation.send(signedOperation);
    expect(sendOperation).toHaveBeenCalledTimes(1);
    expect(sendOperation).toHaveBeenCalledWith(
      signedOperation,
      node,
      undefined
    );
    expect(response.data).toEqual("mocked");
  });

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
