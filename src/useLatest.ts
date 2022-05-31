import React from "react";

export function useLatest<K extends {}, T = K | undefined>(value: T): T {
  const box = React.useRef({ ...value });
  const ref = React.useRef(value);
  ref.current = value;
  React.useLayoutEffect(() => {
    if (!(value != null && typeof value === "object")) return;
    const obj = {};
    for (const k in value) {
      if (!value.hasOwnProperty(k)) continue;
      if (typeof value[k] === "function") {
        obj[k] = (...args: any[]) => ref.current[k](...args);
      } else {
        obj[k] = value[k];
      }
    }
    Object.assign(box.current, obj);
  });
  return box.current;
}
