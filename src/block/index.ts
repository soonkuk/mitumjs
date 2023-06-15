export class Block {
  // 먼저 정확하게
  // rpc/block/height 와 rpc/block/manifests 의 차이를 알아야 한다.

  getAll(): any {
    // 전체 block 정보 return
  }

  get(heightOrHash: number | string): any {
    // 특정 block의 번호나 해시로 정보 return
  }

  operations(height: number): any {
    // 특정 block 내의 operations 조회
  }
}
