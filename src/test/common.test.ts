import { Version, Node, Chain, DefaultToken } from "../../cjs/common";

import axios from "axios";
// Mock axios.get() to return a fake response
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockResponse = { data: "Node information" };
mockedAxios.get.mockResolvedValue(mockResponse);

describe("common test", () => {
  let node: Node;

  beforeEach(() => {
    node = new Node();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("test: common.version()", () => {
    const version = "v1.0.0 Prehistoric";
    const commonVersion = new Version();

    expect(commonVersion.getVersion()).toBe(version);
  });

  test("test: common.node()", async () => {
    // should reject with an error when RPC-URL is not provided
    await expect(node.getNodeInfo()).rejects.toThrow(
      "RPC-URL is not provided."
    );
    expect(axios.get).not.toHaveBeenCalled();

    // should set the node URI if a valid IP address is provided
    let provider = "http://127.0.0.1:54321";
    node.setNode(provider);
    expect(node.getNodeUri()).toBe(provider);

    // should not set the node URI if an invalid IP address is provided
    provider = "invalid-ip-address";
    const mockWarn = jest.spyOn(console, "warn");
    node.setNode(provider);
    expect(mockWarn).toHaveBeenCalledTimes(1);
    expect(node.getNodeUri()).toBe("http://127.0.0.1:54321");

    // should return node information when a valid RPC-URL is provided
    const expectedResponse = mockResponse;
    const response = await node.getNodeInfo();
    expect(response).toEqual(expectedResponse);
    expect(axios.get).toHaveBeenCalledWith(`${node.getNodeUri()}/`);

    // should reject with an error when an error occurs during the request
    const errorMessage = "Request error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));
    await expect(node.getNodeInfo()).rejects.toThrow(
      `Error getting node information: ${errorMessage}`
    );
    expect(axios.get).toHaveBeenCalledWith(`${node.getNodeUri()}/`);
  });

  test("test: common.chain()", () => {
    let chain = new Chain();
    expect(chain.getChainID()).toBe("mitum");

    chain = new Chain();
    const newChainID = "new_chain_id";
    chain.setChainID(newChainID);
    expect(chain.getChainID()).toBe(newChainID);
  });

  test("test: common.defaultToken()", () => {
    let defaultToken = new DefaultToken();
    expect(defaultToken.getDefaultCurrency()).toBe("PEN");

    defaultToken.setDefaultCurrency("MCC");
    expect(defaultToken.getDefaultCurrency()).toBe("MCC");
  });
});
