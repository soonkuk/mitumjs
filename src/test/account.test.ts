import {
  genesis,
  account1,
  account2,
  account3,
  accountEther1,
  accountEther2,
  accountEther3,
  multi1,
  multi2,
} from "./dummy";

import { Account } from "../account";
import { M2KeyPair } from "../account/key";
import { Keys } from "../account/publicKey";

describe("Account", () => {
  let account: Account;

  beforeEach(() => {
    account = new Account();
  });

  test("account.key()", () => {
    const result = account.key();
    expect(result).toBeInstanceOf(M2KeyPair);
    expect(result.privateKey.toString().slice(-3)).toBe("mpr");
    expect(result.publicKey.toString().slice(-3)).toBe("mpu");
  });

  test("account.key(seed)", () => {
    const seed = "your_seed_equal_or_greate_than_36_characters";
    const result = account.key(seed);
    expect(result).toBeInstanceOf(M2KeyPair);
    expect(result.privateKey.toString().slice(-3)).toBe("mpr");
    expect(result.publicKey.toString().slice(-3)).toBe("mpu");
  });

  test("account.keys(int n)", () => {
    const n = 5;
    const result = account.keys(n);
    expect(result.keys).toBeDefined();
    expect(result.keys).toBeInstanceOf(Keys);
    expect(result.keypairs).toBeDefined();
    expect(result.keypairs).toHaveLength(n);
    expect(result.keypairs[0]).toBeInstanceOf(M2KeyPair);
    expect(result.keypairs[0].privateKey.toString().slice(-3)).toBe("mpr");
    expect(result.keypairs[0].publicKey.toString().slice(-3)).toBe("mpu");
  });

  test("account.fromPrivateKey()", () => {
    const privateKey1 = account1.privatekey;
    const result1 = account.fromPrivateKey(privateKey1);
    expect(result1).toBeInstanceOf(M2KeyPair);
    expect(result1.publicKey.toString()).toBe(account1.publickey);

    const privateKey2 = accountEther1.privatekey;
    const result2 = account.fromPrivateKey(privateKey2);
    expect(result2).toBeInstanceOf(M2KeyPair);
    expect(result2.publicKey.toString()).toBe(accountEther1.publickey);
  });

  test("account.etherKey()", () => {
    const result = account.etherKey();
    expect(result).toBeInstanceOf(M2KeyPair);
    expect(result.privateKey.toString().slice(-3)).toBe("epr");
    expect(result.publicKey.toString().slice(-3)).toBe("epu");
  });

  test("account.etherKey(seed)", () => {
    const seed = "your_seed_equal_or_greate_than_36_characters";
    const result = account.etherKey(seed);
    expect(result).toBeInstanceOf(M2KeyPair);
    expect(result.privateKey.toString().slice(-3)).toBe("epr");
    expect(result.publicKey.toString().slice(-3)).toBe("epu");
  });

  test("account.etherKeys(int n)", () => {
    const n = 5;
    const result = account.etherKeys(n);
    expect(result.keys).toBeDefined();
    expect(result.keys).toBeInstanceOf(Keys);
    expect(result.keypairs).toBeDefined();
    expect(result.keypairs).toHaveLength(n);
    expect(result.keypairs[0].privateKey.toString().slice(-3)).toBe("epr");
    expect(result.keypairs[0].publicKey.toString().slice(-3)).toBe("epu");
  });

  test("account.address()", () => {
    const pubKey1 = account1.publickey;
    const result1 = account.address(pubKey1);
    expect(result1).toBe(account1.address);

    const pubKey2 = account1.publickey;
    const result2 = account.address(pubKey2);
    expect(result2).toBe(account1.address);
  });

  test("account.etherAddress()", () => {
    const pubKey = accountEther1.publickey;
    const result = account.etherAddress(pubKey);
    expect(result).toBe(accountEther1.address);
  });

  test("account.addressForMultiSig()", () => {
    const pubKeys = multi1;
    const threshold = 100;
    const result = account.addressForMultiSig(pubKeys, threshold);
    expect(result).toBe("6oCL7apRgGuH78PAvahZdRQW5LsyKxz8YbJsVWw3Pasvmca");
  });

  test("account.etherAddressForMultiSig()", () => {
    const pubKeys = multi2;
    const threshold = 100;
    const result = account.etherAddressForMultiSig(pubKeys, threshold);
    expect(result).toBe("1b9c04fc629cac2525847c87be3e9ea7201f154eeca");
  });

  test("account.create()", () => {
    const senderAddr = genesis.address;
    const recieverPub = account1.publickey;
    const currentID = "MCC";
    const amount = 100;

    const result = account.create(senderAddr, recieverPub, currentID, amount);
    expect(result.fact.hash !== null).toBe(true);
  });

  test("account.createEtherAccount()", () => {
    const senderAddr = genesis.address;
    const recieverPub = accountEther1.publickey;
    const currentID = "MCC";
    const amount = 100;

    const result = account.createEtherAccount(
      senderAddr,
      recieverPub,
      currentID,
      amount
    );
    expect(result.fact.hash !== null).toBe(true);
  });

  test("account.createMultiSig()", () => {
    const senderAddr = genesis.address;
    const recieverPubArr = [
      { weight: 50, key: account2.publickey },
      { weight: 50, key: account3.publickey },
    ];
    const currentID = "MCC";
    const amount = 100000;
    const threshold = 100;

    const result = account.createMultiSig(
      senderAddr,
      recieverPubArr,
      currentID,
      amount,
      threshold
    );
    expect(result.fact.hash !== null).toBe(true);
  });

  test("account.createEtherMultiSig()", () => {
    const senderAddr = genesis.address;
    const recieverPubArr = [
      { weight: 50, key: accountEther2.publickey },
      { weight: 50, key: accountEther3.publickey },
    ];
    const currentID = "MCC";
    const amount = 100000;
    const threshold = 100;

    const result = account.createMultiSig(
      senderAddr,
      recieverPubArr,
      currentID,
      amount,
      threshold
    );
    expect(result.fact.hash !== null).toBe(true);
  });
});
