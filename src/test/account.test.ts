import { account1, account2, accountEther } from "./dummy";

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
    expect(result1.publicKey).toBe(account1.publickey);

    const privateKey2 = account2.privatekey;
    const result2 = account.fromPrivateKey(privateKey2);
    expect(result2).toBeInstanceOf(M2KeyPair);
    expect(result2.publicKey).toBe(account2.publickey);
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
    expect(result.keypairs[0].privateKey.toString().slice(-3)).toBe("mpr");
    expect(result.keypairs[0].publicKey.toString().slice(-3)).toBe("mpu");
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
    const pubKey = accountEther.public;
    const result = account.etherAddress(pubKey);
    expect(result).toBe(accountEther.address);
  });

  test("account.addressForMultiSig()", () => {
    // const pubKeys = [
    //   { key: "abcdef1234567890", weight: 100 },
    //   { key: "1234567890abcdef", weight: 200 },
    // ];
    // const threshold = 2;
    // const result = account.addressForMultiSig(pubKeys, threshold);
    // expect(result).toBe("expected_multisig_address");
  });

  test("account.etherAddressForMultiSig()", () => {
    // const pubKeys = [
    //   { weight: 100, key: "abcdef1234567890" },
    //   { weight: 200, key: "1234567890abcdef" },
    // ];
    // const threshold = 2;
    // const result = account.etherAddressForMultiSig(pubKeys, threshold);
    // expect(result).toBe("expected_multisig_ether_address");
  });

  test("account.create()", () => {
    const senderAddr = "sender_address";
    const recieverPub = "reciever_public_key";
    const currentID = "current_id";
    const amount = 100;

    const result = account.create(senderAddr, recieverPub, currentID, amount);
    // Perform assertions on the result
    // ...
  });

  test("account.createEtherAccount()", () => {
    const senderAddr = "sender_address";
    const recieverPub = "reciever_public_key";
    const currentID = "current_id";
    const amount = 100;

    const result = account.createEtherAccount(
      senderAddr,
      recieverPub,
      currentID,
      amount
    );
    // Perform assertions on the result
    // ...
  });

  test("account.createMultiSig()", () => {
    const senderAddr = "sender_address";
    const recieverPubArr = [
      { weight: 100, key: "public_key_1" },
      { weight: 200, key: "public_key_2" },
    ];
    const currentID = "current_id";
    const amount = 100;
    const threshold = 2;

    const result = account.createMultiSig(
      senderAddr,
      recieverPubArr,
      currentID,
      amount,
      threshold
    );
    // Perform assertions on the result
    // ...
  });

  test("account.createEtherMultiSig()", () => {
    const senderAddr = "sender_address";
    const recieverPubArr = [
      { weight: 100, key: "public_key_1" },
      { weight: 200, key: "public_key_2" },
    ];
    const currentID = "current_id";
    const amount = 100;
    const threshold = 2;

    const result = account.createEtherMultiSig(
      senderAddr,
      recieverPubArr,
      currentID,
      amount,
      threshold
    );
    // Perform assertions on the result
    // ...
  });

  test("account.updateKey()", () => {
    const targetAddr = "target_address";
    const newPubArr = [
      { weight: 100, key: "new_public_key_1" },
      { weight: 200, key: "new_public_key_2" },
    ];
    const currentID = "current_id";
    const threshold = 2;

    const result = account.updateKey(
      targetAddr,
      newPubArr,
      currentID,
      threshold
    );
    // Perform assertions on the result
    // ...
  });
});
