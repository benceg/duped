import * as test from "tape";
import typedCreateArray from "./typed";

test("createArray/typed", t => {
  const Uint16Arr = typedCreateArray(65535);
  const Uint32Arr = typedCreateArray(4294967295);
  const DynamicArr = typedCreateArray(4294967296);
  test("Uint8", () => {
    const Uint8Arr = typedCreateArray(255);
    t.equal(Uint8Arr.constructor, Uint8Array, "creates a Uint8Array");
  });
  t.equal(Uint16Arr.constructor, Uint16Array, "creates an empty array");
  t.equal(Uint32Arr.constructor, Uint32Array, "creates an empty array");
  t.equal(DynamicArr.constructor, Array, "creates an empty array");
  t.end();
});
