type JudgeExactAny<T> = T extends never ? true : false
export type IsAny<T> = boolean extends JudgeExactAny<T> ? true : false
export type IsNever<T> = T[] extends never[] ? true : false

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

/**
 * @name IsUnionIncludesUndefined
 * undefined を含む union 型なら true、違うなら false を返す
 *
 * @example IsUnionUndefined<'hello' | 'world'>   = false
 * @example IsUnionUndefined<'hello' | undefined> = true
 * @example IsUnionUndefined<'hello'>             = false
 * @example IsUnionUndefined<undefined>           = true
 */
export type IsUnionIncludesUndefined<T> = boolean extends (
  T extends undefined ? true : false
)
  ? true
  : undefined extends T
  ? true
  : false

/**
 * @name LastOfUnion
 * Union 型の末尾要素を返す
 *
 * @example LastOfUnion<'hello' | 'world'> => 'world'
 */
export type LastOfUnion<U> = (
  (U extends any ? (k: U[]) => void : never) extends (k: infer I1) => void
    ? I1
    : never
) extends (infer I2)[]
  ? I2
  : never

/**
 * @name PushTuple
 * タプル型の末尾に Value を追加した型を返す
 *
 * @example PushTuple<['val1', 'val2', 'val3'], 'val4'> => ['val1', 'val2', 'val3', 'val4']
 */
export type PushTuple<PrevTuple extends unknown[], Value> = [
  Value,
  ...PrevTuple
]

/**
 * @name RecursivelyConvertUnionToTuple
 * Union 型を再帰的に末尾を取り出して、タプル型を生成する型
 *
 * @example PushTuple<['val1', 'val2', 'val3'], 'val4'> => ['val1', 'val2', 'val3', 'val4']
 */
export type RecursivelyConvertUnionToTuple<
  T,
  Arr extends unknown[] = [],
  L = LastOfUnion<T>
> = IsNever<L> extends false
  ? RecursivelyConvertUnionToTuple<Exclude<T, L>, PushTuple<Arr, L>> // 空 Tuple に再帰的に末尾要素を追加する
  : Arr // 全て Exclude し終わった(LastOfUnion<T> = never) ら、完成した Tuple を返す

/**
 * @name UnionToTuple
 * Union 型を過不足ないタプル型に変換する型
 *
 * @example UnionToTuple<'val1' | 'val2' | 'val3', ['val1', 'val2', 'val3']>
 */
export type UnionToTuple<T> = RecursivelyConvertUnionToTuple<T>
