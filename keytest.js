const { Mitum } = require("./cjs");

const mitum = new Mitum();

const keys = mitum.account.keys(10);
keys.forEach((key) => {
  console.log(key.publickey.length);
});

// const keys = [
//   "et8Uiu98gxBh9UuQXfJUQybRVhAoJvFWgRvWRZnhwBpimpu",
//   "zTNqu3qn8HKPzejDgdmQgQCEJVXY1gVp4wLj5sM3sXMgmpu",
//   "efXymmMKowp5bA2gaibPKUAuJzBMJPaWpPNvEJzPEbJYmpu",
//   "xrD51THJDL2YBSEEPzaNMsTsi8Y3W7XqwT2P2HLLrzLKmpu",
//   "pV8qW1VxEfgypWxawR9fBoXxxVY1RmXtpLh6yMSpqZ9zmpu",
//   "2BdkQAXaPrR3jrAuJZJJMYTRZsgzHVjBvB5nPg43FLujPmpu",
//   "23L6crDWZW5aBzMzCFEtasvtcp1ro1U9aBXR2eSLC1bEsmpu",
//   "nBXEwykYKmgmgsV9t2C9pk4V6Y5PiwoPUzazim7Co9Lempu",
//   "pd8mz9pQF9Jw4nVdoQQ185frez1Su5FXfyECfcMGS9hqmpu",
//   "zsqqDXEtwS3GQjK8SiEUSZNqdcTxyc7VfKyjZiJ3v496mpu",
// ];
// keys.forEach((key) => {
//   console.log(key.length);
// });
