import React from "react";
import { useCleanupRef } from "./useCleanupRef";
import { useLatest } from "./useLatest";
import { usePrevious } from "./usePrevious";

export function usePureLayoutEffect<D extends object, L>(
  effect: (
    latest: Readonly<L>,
    deps: Readonly<D>,
    prev?: Readonly<D>
  ) => void | ((latest: Readonly<L>, deps: Readonly<D>) => void | undefined),
  deps: D,
  latest?: L
): void;
export function usePureLayoutEffect(
  effect: () => void | (() => void | undefined)
): void;
export function usePureLayoutEffect<D extends object, L>(
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
  React.useLayoutEffect(
    () => {
      const cleanup = effect(latest_, deps, prev);
      return cleanup == null
        ? cleanup
        : () => cleanup(cleanupRef.current, deps);
    },
    deps == null ? deps : Object.values(deps)
  );
}
