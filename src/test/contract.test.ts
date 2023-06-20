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

import { Contract } from "../contract";

describe("Currency", () => {
  let contract: Contract;

  beforeEach(() => {
    contract = new Contract();
  });

  describe("nft", () => {
    test("nft.trasfer()", () => {
      // nft.trasfer() test
    });
  });
});
