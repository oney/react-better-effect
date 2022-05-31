import React, { DependencyList } from 'react';
import { useCleanupRef } from './useCleanupRef';
import { useLatest } from './useLatest';

export function useLayoutEffect<L extends Readonly<{}>>(
  effect: (
    latest: Readonly<L>
  ) => void | ((latest: Readonly<L>) => void | undefined),
  deps?: DependencyList,
  latest?: L
): void {
  const latest_ = useLatest(latest) as L;
  const prevRef = useCleanupRef(latest);
  React.useLayoutEffect(() => {
    const cleanup = effect(latest_);
    return cleanup == null ? cleanup : () => cleanup(prevRef.current as any);
  }, deps);
}
