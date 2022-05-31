# react-better-effect

[![npm](https://img.shields.io/npm/v/react-better-effect?style=flat-square)](https://www.npmjs.com/package/react-better-effect)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-better-effect?style=flat-square)](https://bundlephobia.com/result?p=react-better-effect)
[![npm type definitions](https://img.shields.io/npm/types/typescript?style=flat-square)](https://github.com/oney/react-better-effect/blob/master/src/index.tsx)
[![GitHub](https://img.shields.io/github/license/oney/react-better-effect?style=flat-square)](https://github.com/oney/react-better-effect/blob/master/LICENSE)

This package provides **latest** values in `useEffect` and `useLayoutEffect`.

## TL;DR
```jsx
import { useEffect } from "react-better-effect";

function Chat({ selectedRoom }) {
  const theme = useContext(ThemeContext);

  useEffect(($) => {
    const socket = createSocket('/chat/' + selectedRoom);
    socket.on('connected', async () => {
      await checkConnection(selectedRoom);
      showToast($.theme, 'Connected to ' + selectedRoom);
      //        ^ get latest 'theme' value from $
    });
    socket.connect();
    return () => socket.dispose();
  }, [selectedRoom], {theme});
}
```
The above [example](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md#useeffect-shouldnt-re-fire-when-event-handlers-change) is from `useEvent` RFC.

`theme` should not be added to the dependencies of `useEffect`, but we also want to always get latest `theme` value in the effect.

In `useEffect` from `react-better-effect` package, there is a new third parameter (i.e. `{theme}`) which is the place to inject the latest values. Then, you can get the theme value by `$.theme` in effect.

## Demo
Please check [this codesandbox example](https://codesandbox.io/s/react-better-effect-7y0v57?file=/src/App.tsx).

## Explanation

Before `useEvent` RFC, the normal way to fix non-dependency old values in closures issue is to use `useRef` like
```jsx
function Chat({ selectedRoom }) {
  const theme = useContext(ThemeContext);
  const themeRef = useRef(theme);
  themeRef.current = theme; // <- set value
  useEffect(($) => {
    const socket = createSocket('/chat/' + selectedRoom);
    socket.on('connected', async () => {
      await checkConnection(selectedRoom);
      showToast(themeRef.current, 'Connected to ' + selectedRoom);
      //        ^ get the latest 'theme' value from themeRef
    });
    socket.connect();
    return () => socket.dispose();
  }, [selectedRoom], {theme});
}
```
This package implements the same approach but provide a syntactic sugar to do the dirty work.