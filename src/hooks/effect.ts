import { useEffect, useRef } from 'react';

const useEffectV2 = (fn: Function, inputs: unknown[]) => {
  const mount = useRef(false);

  useEffect(() => {
    if (mount.current) {
      return fn();
    }
    mount.current = true;
  }, inputs);
};

export default useEffectV2;
