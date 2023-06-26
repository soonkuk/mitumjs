import { Currency } from "../../cjs/currency";
import currencyInfo from "../../cjs/currency/information";
import { AxiosResponse } from "axios";
import { account1, account2, account3, node } from "./dummy";

jest.mock("../../cjs/currency/information", () => ({
  getAllCurrencyInfo: jest.fn().mockResolvedValue({ data: "mocked" }),
  getCurrencyInfo: jest.fn().mockResolvedValue({ data: "mocked" }),
}));

const provider = node;

describe("Currency", () => {
  let currency: Currency;

  beforeEach(() => {
    currency = new Currency(node);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("currency.getAllCurrencies()", async () => {
    const response: AxiosResponse = await currency.getAllCurrencies();
    expect(currencyInfo.getAllCurrencyInfo).toHaveBeenCalledTimes(1);
    expect(currencyInfo.getAllCurrencyInfo).toHaveBeenCalledWith(provider);
    expect(response.data).toEqual("mocked");
  });

  it("currency.getCurrency()", async () => {
    const currencyID = "MCC";
    const response: AxiosResponse = await currency.getCurrency(currencyID);
    expect(currencyInfo.getCurrencyInfo).toHaveBeenCalledTimes(1);
    expect(currencyInfo.getCurrencyInfo).toHaveBeenCalledWith(
      provider,
      currencyID
    );
    expect(response.data).toEqual("mocked");
  });

  test("currency.mint()", () => {
    const receiver = account1.address;
    const currencyID = "MCC";
    const amount = 50000;

    const operation = currency.mint(receiver, currencyID, amount);
    expect(operation.hint.toString()).toBe(
      "mitum-currency-suffrage-inflation-operation-v0.0.1"
    );
  });

  test("currency.transfer()", () => {
    const sender = account2.address;
    const receiver = account3.address;
    const currencyID = "MCC";
    const amount = 500;

    const operation = currency.transfer(sender, receiver, currencyID, amount);
    expect(operation.hint.toString()).toBe(
      "mitum-currency-transfers-operation-v0.0.1"
    );
  });
});
