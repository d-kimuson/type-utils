import { expectType, expectNotType } from "tsd"
import { Result, ok, ng, isOk, isNg, ResultOk, ResultNg } from "~/result"

function getResult(isOk: boolean): Result<"ok", "ng"> {
  return isOk ? ok("ok") : ng("ng")
}

describe("result", () => {
  it("isOk", () => {
    const result = getResult(true)
    if (isOk(result)) {
      expectType<ResultOk<"ok">>(result)
      expectNotType<ResultNg<"ng">>(result)
    } else {
      expectType<ResultNg<"ng">>(result)
      expectNotType<ResultOk<"ok">>(result)
    }
  })

  it("isNg", () => {
    const result = getResult(true)
    if (isNg(result)) {
      expectType<ResultNg<"ng">>(result)
      expectNotType<ResultOk<"ok">>(result)
    } else {
      expectType<ResultOk<"ok">>(result)
      expectNotType<ResultNg<"ng">>(result)
    }
  })

  it("isNg", () => {
    const result = getResult(true)
    if (isOk(result)) {
      expect(result.ok).toBe("ok")
    } else {
      expect(result.ng).toBe("ng")
    }
  })
})
