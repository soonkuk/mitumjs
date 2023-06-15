// sign(privateKey: string | Key, option?: SignOption) {
//     privateKey = Key.from(privateKey);
//     const keypair =
//       privateKey.version === M2KeyPair.fromPrivate<M2KeyPair>(privateKey);
//     const sigType = this.factSignType;

//     if (sigType === "M2NodeFactSign") {
//       Assert.check(
//         option !== undefined,
//         MitumError.detail(ECODE.FAIL_SIGN, "no node address in sign option")
//       );
//     }

//     if (
//       !sigType &&
//       (this.fact instanceof CreateAccountsFact ||
//         this.fact instanceof CreateContractAccountsFact)
//     ) {
//       if (keypair instanceof M1KeyPair) {
//         Assert.check(
//           this.fact.items !== undefined &&
//             (this.fact.items[0] as CurrencyItem).addressType === "",
//           MitumError.detail(
//             ECODE.FAIL_SIGN,
//             "trying to sign m2 fact with m1 keypair"
//           )
//         );
//       } else {
//         Assert.check(
//           this.fact.items !== undefined &&
//             (this.fact.items[0] as CurrencyItem).addressType !== "",
//           MitumError.detail(
//             ECODE.FAIL_SIGN,
//             "trying to sign m1 fact with m2 keypair"
//           )
//         );
//       }
//     }

//     const factSign = this.signWithSigType(
//       sigType,
//       keypair,
//       option ? new NodeAddress(option.node) : undefined
//     );

//     const idx = this._factSigns
//       .map((fs) => fs.signer.toString())
//       .indexOf(keypair.publicKey.toString());

//     if (idx < 0) {
//       this._factSigns.push(factSign);
//     } else {
//       this._factSigns[idx] = factSign;
//     }

//     this._hash = this.hashing();
//   }

//   private signWithSigType(
//     sigType: SigType,
//     keypair: M1KeyPair | M2KeyPair,
//     node: Address | undefined
//   ) {
//     const getM1FactSign = (keypair: M1KeyPair, hash: Buffer) =>
//       new M1FactSign(
//         keypair.publicKey,
//         keypair.sign(Buffer.concat([hash, Buffer.from(this.id)])),
//         new TimeStamp().toString()
//       );
//     const getM2FactSign = (keypair: M2KeyPair, hash: Buffer) => {
//       const now = new TimeStamp();

//       return new M2FactSign(
//         keypair.publicKey,
//         keypair.sign(
//           Buffer.concat([Buffer.from(this.id), hash, now.toBuffer()])
//         ),
//         now.toString()
//       );
//     };
//     const getM2NodeFactSign = (
//       node: Address,
//       keypair: M2KeyPair,
//       hash: Buffer
//     ) => {
//       const now = new TimeStamp();

//       return new M2NodeFactSign(
//         node.toString(),
//         keypair.publicKey,
//         keypair.sign(
//           Buffer.concat([
//             Buffer.from(this.id),
//             node.toBuffer(),
//             hash,
//             now.toBuffer(),
//           ])
//         ),
//         now.toString()
//       );
//     };

//     const hash = this._hash ? this._hash : Buffer.from([]);

//     if (sigType) {
//       switch (sigType) {
//         case "M1FactSign":
//           Assert.check(
//             keypair.privateKey.version === "m1",
//             MitumError.detail(
//               ECODE.FAIL_SIGN,
//               "not m1 keypair factsign type != keypair type"
//             )
//           );
//           return getM1FactSign(keypair as M1KeyPair, hash);
//         case "M2FactSign":
//           Assert.check(
//             keypair.privateKey.version === "m2",
//             MitumError.detail(
//               ECODE.FAIL_SIGN,
//               "not m2 keypair factsign type != keypair type"
//             )
//           );
//           return getM2FactSign(keypair as M2KeyPair, hash);
//         case "M2NodeFactSign":
//           Assert.check(
//             keypair.privateKey.version === "m2",
//             MitumError.detail(
//               ECODE.FAIL_SIGN,
//               "not m2 keypair factsign type != keypair type"
//             )
//           );
//           Assert.check(
//             node !== undefined,
//             MitumError.detail(ECODE.FAIL_SIGN, "no node address")
//           );
//           return getM2NodeFactSign(node as Address, keypair as M2KeyPair, hash);
//         default:
//           throw MitumError.detail(ECODE.FAIL_SIGN, "invalid factsign type");
//       }
//     } else {
//       switch (keypair.privateKey.version) {
//         case "m1":
//           return getM1FactSign(keypair as M1KeyPair, hash);
//         case "m2":
//           if (node) {
//             return getM2NodeFactSign(node, keypair as M2KeyPair, hash);
//           } else {
//             return getM2FactSign(keypair as M2KeyPair, hash);
//           }
//         default:
//           throw MitumError.detail(ECODE.FAIL_SIGN, "invalid private key");
//       }
//     }
//   }
