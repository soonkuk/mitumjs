import { Block } from "../block";
import blockInfo from "../block/information";
import { node } from "./dummy";

jest.mock("../block/information", () => ({
  getAllBlockInfo: jest
    .fn()
    .mockResolvedValue(Promise.resolve({ data: "mocked" })),
  getBlockByHeight: jest
    .fn()
    .mockResolvedValue(Promise.resolve({ data: "mocked" })),
  getBlockByHash: jest
    .fn()
    .mockResolvedValue(Promise.resolve({ data: "mocked" })),
  getOperations: jest
    .fn()
    .mockResolvedValue(Promise.resolve({ data: "mocked" })),
}));

describe("Currency", () => {
  let block: Block;

  beforeEach(() => {
    block = new Block(node);
  });

  it("block.getAll()", async () => {
    await block.getAll();

    expect(blockInfo.getAllBlockInfo).toHaveBeenCalledTimes(1);
    expect(blockInfo.getAllBlockInfo).toHaveBeenCalledWith(node);
  });

  it("block.get()", async () => {
    await block.get(500);
    await block.get("AGyN3uVJ5wHn4xx7XX4wwGqnjMn31okcwgDKwCAguer6");

    expect(blockInfo.getBlockByHeight).toHaveBeenCalledTimes(1);
    expect(blockInfo.getBlockByHeight).toHaveBeenCalledWith(node, 500);
    expect(blockInfo.getBlockByHash).toHaveBeenCalledTimes(1);
    expect(blockInfo.getBlockByHash).toHaveBeenCalledWith(
      node,
      "AGyN3uVJ5wHn4xx7XX4wwGqnjMn31okcwgDKwCAguer6"
    );
  });

  it("block.operations()", async () => {
    await block.getOperations(300);

    expect(blockInfo.getOperations).toHaveBeenCalledTimes(1);
    expect(blockInfo.getOperations).toHaveBeenCalledWith(node, 300);
  });
});
