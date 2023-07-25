function big(i) {
  const buffer = Buffer.alloc(1);
  buffer.writeUInt8(i, buffer.length - 1); // BigEndian으로 데이터 쓰기
  return buffer;
}

function little(i) {
  const buffer = Buffer.alloc(1);
  buffer.writeUInt8(i, 0); // BigEndian으로 데이터 쓰기
  return buffer;
}

const result1 = big(97);
const result2 = big(97);
console.log(result1);
console.log(result2);
