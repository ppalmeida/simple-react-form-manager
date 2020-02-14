import { useEffect, useRef } from 'react';

export default function useDebugRenderProps(current, origin = '') {
  const ref = useRef();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const debug = {};
    const old = ref.current;
    if (!old) {
      ref.current = current;
      return undefined;
    }

    Object.keys(current).forEach((key) => {
      if (ref.current[key] === 'undefined' || old[key] !== current[key]) {
        debug[key] = { previous: old[key], current: current[key] };
      }
    });

    // eslint-disable-next-line no-console
    console.log(origin, debug);

    ref.current = current;
  });
  return ref.current;
}
