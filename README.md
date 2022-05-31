# react-better-effect

[![npm](https://img.shields.io/npm/v/react-better-effect?style=flat-square)](https://www.npmjs.com/package/react-better-effect)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-better-effect?style=flat-square)](https://bundlephobia.com/result?p=react-better-effect)
[![npm type definitions](https://img.shields.io/npm/types/typescript?style=flat-square)](https://github.com/oney/react-better-effect/blob/master/src/index.tsx)
[![GitHub](https://img.shields.io/github/license/oney/react-better-effect?style=flat-square)](https://github.com/oney/react-better-effect/blob/master/LICENSE)

This package provides **latest** values in `useEffect` and `useLayoutEffect`.

## TL;DR
```jsx
import { useEffect } from "react-better-effect";

export default function App() {
  const [text, setText] = React.useState("a");
  const [text2, setText2] = React.useState("b");
  
  useEffect(($) => {
    const interval = setInterval(() => {
      console.log("effect1", $.text, text2 );
    }, 1000);
    return () => clearInterval(interval);
  }, [text2], { text });

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <input value={text2} onChange={(e) => setText2(e.target.value)} />
    </div>
  );
}
```


## Demo
Please check [this codesandbox example](https://codesandbox.io/s/react-better-effect-7y0v57?file=/src/App.tsx).
