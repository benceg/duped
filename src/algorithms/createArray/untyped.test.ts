import * as test from "tape";
import untypedCreateArray from "./untyped";

test("createArray/untyped", t => {
  t.deepEqual(untypedCreateArray(), [], "creates an empty array");
  t.end();
});
