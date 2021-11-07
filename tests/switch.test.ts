import { switchExpression } from "~/switch"
import { expectType } from "tsd"

describe("switchExpression", () => {
  it("通常ケース", () => {
    const result = switchExpression(1)
      .case((value) => value === 1, "matched 1")
      .default("not matched")

    expect(result).toBe("matched 1")
  })

  it("default のみ", () => {
    const result = switchExpression(1)
      .default("not matched")

    expect(result).toBe("not matched")
  })

  it("match しない", () => {
    const result = switchExpression(0)
      .case((value) => value === 1, "matched 1")
      .case((value) => value === 2, "matched 2")
      .default("not matched")

    expect(result).toBe("not matched")
  })
})
