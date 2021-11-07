type IsMatch<T> = (target: T) => boolean
type SwitchResolve<T> = T

type SwitchResult<T, R> = {
  case: <CaseR>(
    isMatch: IsMatch<T>,
    resolve: SwitchResolve<CaseR>
  ) => SwitchResult<T, R | CaseR>
  default: <Default>(resolve: SwitchResolve<Default>) => R | Default
  resolved?: R
}

const toResult = <T, R>(
  target: T,
  isParentMatch: IsMatch<T>,
  resolveParent: SwitchResolve<R>,
  parentResolved: R | undefined
): SwitchResult<T, R> => {
  const resolved =
    parentResolved ?? isParentMatch(target) ? resolveParent : undefined

  return {
    resolved,
    default: <Default>(_default: Default): R | Default => resolved ?? _default,
    case: <CaseR>(
      isMatch: IsMatch<T>,
      resolve: SwitchResolve<CaseR>
    ): SwitchResult<T, R | CaseR> =>
      toResult<T, R | CaseR>(target, isMatch, resolve, resolved),
  }
}

export const switchExpression = <T>(target: T): SwitchResult<T, never> => {
  return {
    resolved: undefined,
    default: <Default>(_default: Default): Default => _default,
    case: <CaseR>(
      isMatch: IsMatch<T>,
      resolve: SwitchResolve<CaseR>
    ): SwitchResult<T, CaseR> =>
      toResult<T, CaseR>(target, isMatch, resolve, undefined),
  }
}
