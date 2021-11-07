export type Result<S, T> = ResultOk<S> | ResultNg<T>
export type ResultOk<T> = {
  __type: "ok"
  ok: T
}
export type ResultNg<T> = {
  __type: "ng"
  ng: T
}

export function isOk<T, E>(result: Result<T, E>): result is ResultOk<T> {
  return result.__type === "ok"
}

export function isNg<T, E>(result: Result<T, E>): result is ResultNg<E> {
  return result.__type === "ng"
}

export function ok<T>(value: T): ResultOk<T> {
  return {
    __type: "ok",
    ok: value,
  }
}

export function ng<T>(value: T): ResultNg<T> {
  return {
    __type: "ng",
    ng: value,
  }
}
