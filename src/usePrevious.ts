import React from "react";

export function usePrevious<T>(value: T) {
  const ref = React.useRef<T>();
  React.useLayoutEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function usePreviousRef<T>(value: T) {
  const ref = React.useRef<T>();
  React.useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}
