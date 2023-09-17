import { Address } from "../key";

export function hasOverlappingAddressAddress(arr: (string | Address)[]) {
    return new Set(arr.map(a => a instanceof Address ? a.toString() : a)).size !== arr.length
}