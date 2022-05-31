import React from "react";
import { usePrevious } from "./usePrevious";

export function useCleanupRef<T>(value: T) {
  const prev = usePrevious(value);
  const prevRef = React.useRef(value);
  if (prev) prevRef.current = { ...prev };
  return prevRef;
}
