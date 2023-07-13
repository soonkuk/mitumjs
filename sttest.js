const { Mitum } = require("./cjs");

const mitum = new Mitum("http://127.0.0.1:54320");

const test = async () => {
  const sender = "8DtafRFAvcvXgYHwvsUToY9UT4hkfRxi4AsCNPzWs5Y4mca";
  const currencyID = "MCC";
  const pubkey = "oxaoi8FuZpLJkEU8kStm8dndhwbo4FtfcCiJo76MkpiQmpu";
  const privatekey = "DNQF7ruLFUD8ZXXrZimjFZdHAJSwc754dz1JdGADwTEDmpr";

  // contract 계정 생성
  const ca1 = mitum.contract.create(sender, pubkey, currencyID, 100000);
  const s1 = mitum.operation.sign(privatekey, ca1);
  const res = await mitum.operation.send(s1);
  exp("axios result", res.status);

  // test 에 사용할 계정 생성
  //   const p1 = "28V9psXoGyjQ5cVtDLSFddHSaBnMYV95Y8kpJUk4rQKREmpu";
  //   const p2 = "diLUcZugeDFW6ftQdcjdz8Ks1KBGiACo9GAcKQUgwFdfmpu";
  //   const pa1 = mitum.account.create(sender, p1, currencyID, 111111);
  //   const pa2 = mitum.account.create(sender, p2, currencyID, 222222);
  //   const ss1 = mitum.operation.sign(privatekey, pa1);
  //   const ss2 = mitum.operation.sign(privatekey, pa2);
  //   const res1 = await mitum.operation.send(ss1);
  //   const res2 = await mitum.operation.send(ss2);
  //   console.log(res1.status);
  //   console.log(res2.status);

  const contract = "2gWeBMRnZ8kmwU7dvJgv3rHpui7ksHMRKLjJiPUsbBAAmca";
  const serviceId = "SIT";
  const a1 = "3a9ooHpDo2MTLcNS6MJKjFeYv59zFyfzm6f3cVVihBZTmca";
  const a2 = "2VKEH78tLMJ71KXzYQUFej5LmwprqiRSC44E2ax2tn8Bmca";
  const priv1 = "CHNoLNrykannTec3L1Aa1kXsDkC2QS2tDXrTxhHAcySwmpr";
  const priv2 = "62LMhQdA2BabwWTyA5Y4gipeby8uUtz39MWJt8vSXxGvmpr";

  mitum.st.setContractAddress(contract);
  mitum.st.setServiceId(serviceId);
};

test();

interface IERC1643 {

    // Document Management
    function getDocument(bytes32 _name) view returns (string memory, bytes32, uint256);
    function setDocument(bytes32 _name, string memory _uri, bytes32 _documentHash);
    function removeDocument(bytes32 _name);
    function getAllDocuments() view returns (bytes32[] memory);
}
interface IERC1400 is IERC20, IERC1643 {

    // ******************* Token Information ********************
    function balanceOfByPartition(bytes32 partition, address tokenHolder) view returns (uint256);
    function partitionsOf(address tokenHolder) external view returns (bytes32[] memory);
  
    // *********************** Transfers ************************
    function transferWithData(address to, uint256 value, bytes calldata data);
    function transferFromWithData(address from, address to, uint256 value, bytes calldata data);
  
    // *************** Partition Token Transfers ****************
    function transferByPartition(bytes32 partition, address to, uint256 value, bytes calldata data) returns (bytes32);
    function operatorTransferByPartition(bytes32 partition, address from, address to, uint256 value, bytes calldata data, bytes calldata operatorData) returns (bytes32);
    function allowanceByPartition(bytes32 partition, address owner, address spender) view returns (uint256);
  
    // ****************** Controller Operation ******************
    function isControllable() view returns (bool);
    function controllerTransfer(address from, address to, uint256 value, bytes calldata data, bytes calldata operatorData); // removed because same action can be achieved with "operatorTransferByPartition"
    function controllerRedeem(address tokenHolder, uint256 value, bytes calldata data, bytes calldata operatorData); // removed because same action can be achieved with "operatorRedeemByPartition"
  
    // ****************** Operator Management *******************
    // function authorizeOperator(address operator);
    function authorizeOperatorByPartition(bytes32 partition, address operator);

    function revokeOperator(address operator);
    function revokeOperatorByPartition(bytes32 partition, address operator);
  
    // ****************** Operator Information ******************
    function isOperator(address operator, address tokenHolder) view returns (bool);
    function isOperatorForPartition(bytes32 partition, address operator, address tokenHolder) view returns (bool);
  
    // ********************* Token Issuance *********************
    function isIssuable() external view returns (bool);
    function issue(address tokenHolder, uint256 value, bytes calldata data);
    function issueByPartition(bytes32 partition, address tokenHolder, uint256 value, bytes calldata data);
  
    // ******************** Token Redemption ********************
    function redeem(uint256 value, bytes calldata data);
    function redeemFrom(address tokenHolder, uint256 value, bytes calldata data);
    function redeemByPartition(bytes32 partition, uint256 value, bytes calldata data);
    function operatorRedeemByPartition(bytes32 partition, address tokenHolder, uint256 value, bytes calldata operatorData);
  }