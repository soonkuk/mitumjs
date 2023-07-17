const { Mitum } = require("./cjs");

const mitum = new Mitum();

const exp = (s, b) => {
  console.log(s + " test : " + b);
};

const test = () => {
  const provider = "http://15.165.34.166:54320";

  const pv1 = "Auf6amfGtuHRx5dbhvhGNpwt1EtLG4ZTnbriEiuihDfJmpr";
  const pb1 = "27SnBRSvhX9eEswL4SXVRaewhoxuK6jVLUNyfWMThqHsZmpu";
  const a1 = "5zPANS8TqGwvVh1bghiFQpX2v4GqPsW2Rx1xtonNPMsSmca";

  console.log("===== base function test =====");
  const mitumVersion = mitum.version();
  exp("mitum.version()", mitumVersion);
  mitum.setNode(provider);
  const mitumNode = mitum.getNode();
  exp("mitum.getNode()", mitumNode);
  const nodeInfo = mitum.node();
  exp("mitum.node()", nodeInfo._hint);
  const chain = mitum.chain();

  console.log("===== account function test =====");
};
