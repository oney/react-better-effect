import React from 'react';
import { useCleanupRef } from './useCleanupRef';
import { useLatest } from './useLatest';
import { usePrevious } from './usePrevious';

export function usePureEffect<D extends object, L>(
  effect: (
    latest: Readonly<L>,
    deps?: Readonly<D>,
    prev?: Readonly<D>
  ) => void | ((latest: Readonly<L>, deps?: Readonly<D>) => void | undefined),
  deps: D,
  latest?: L
): void;
export function usePureEffect(
  effect: () => void | (() => void | undefined)
): void;
export function usePureEffect<D extends object, L>(
  effect: (
    latest: Readonly<L>,
    deps?: Readonly<D>,
    prev?: Readonly<D>
  ) => void | ((latest: Readonly<L>, deps?: Readonly<D>) => void | undefined),
  deps?: D,
  latest?: L
): void {
  const prev = usePrevious(deps);
  const latest_ = useLatest(latest) as L;
  const cleanupRef = useCleanupRef(latest);
  React.useEffect(
    () => {
      const cleanup = effect(latest_, deps, prev);
      return cleanup == null
        ? cleanup
        : () => cleanup(cleanupRef.current as any, deps);
    },
    deps == null ? deps : Object.values(deps)
  );
}
