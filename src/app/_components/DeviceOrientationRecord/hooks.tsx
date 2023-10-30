import { useState, useCallback } from 'react';

export const useDOMSize = () => {
  const [size, setSize] = useState([0, 0]);
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (node === null) {
      return;
    }

    const absortController = new AbortController();
    const handleResize = () => {
      setSize([node.clientWidth, node.clientHeight]);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { signal: absortController.signal });

    return () => {
      absortController.abort();
    };
  }, []);

  return {
    width: size[0],
    height: size[1],
    ref,
  };
};

export const useTimestampRange = () => {
  const [timestampRange, setTimestampRange] = useState<[number, number] | null>(null);
  const handleUpdateTimestampRange = useCallback((selection: [number, number]) => {
    setTimestampRange(selection);
  }, []);

  return {
    timestampRange,
    handleUpdateTimestampRange,
  };
};
