/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface Fn<Args extends any[], Val> {
  (...rest: Args): Val;
}

const invokeDuringRender: Fn<any[], any> = function invokeDuringRender() {
  throw new Error('use-callback event was called during render.');
};

export default function useCallback<Args extends any[], Val>(fn: Fn<Args, Val>): Fn<Args, Val> {
  const ref = React.useRef<Fn<Args, Val>>(invokeDuringRender);
  ref.current = invokeDuringRender;

  if (typeof window !== 'undefined') {
    React.useLayoutEffect(() => {
      ref.current = fn;
    }, [fn]);
  } else {
    // On server-side, use .useEffect instead to prevent printing useless warnings
    React.useEffect(() => {
      ref.current = fn;
    }, [fn]);
  }

  return React.useMemo(() => (...args) => ref.current.apply(null, args), []);
}
