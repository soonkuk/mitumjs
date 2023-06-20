import {
  currency,
  nodeKey,
  genesis,
  account1,
  account2,
  account3,
  accountEther1,
  accountEther2,
  accountEther3,
  BTC,
  ETH,
  multi1,
  multi2,
} from "./dummy";

import { Currency } from "../currency";

describe("Currency", () => {
  let currency: Currency;

  beforeEach(() => {
    currency = new Currency();
  });

  test("currency.getAll()", () => {
    // currency.getAll() test
  });

  test("currency.get()", () => {
    // currency.get() test
  });

  test("currency.mint()", () => {
    // currency.mint() test
  });

  test("currency.setPolicy()", () => {
    // currency.setPolicy() test
  });

  test("currency.transfer()", () => {
    // currency.transfer() test
  });

  test("currency.inflate()", () => {
    // currency.inflate() test
  });
});
