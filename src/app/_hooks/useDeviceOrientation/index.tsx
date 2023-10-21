import { useEffect, useState } from 'react';

type DeviceOrientation = {
  alpha: number;
  beta: number;
  gamma: number;
};

export const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState<DeviceOrientation>({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  useEffect(() => {
    const absortController = new AbortController();
    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        'deviceorientation',
        (event) => {
          // alpha: rotation around z-axis
          // beta: rotation around x-axis
          // gamma: rotation around y-axis
          const { alpha, beta, gamma } = event;
          console.log(alpha, beta, gamma);
          setOrientation({
            alpha: alpha ?? 0,
            beta: beta ?? 0,
            gamma: gamma ?? 0,
          });
        },
        { signal: absortController.signal },
      );
    }
    return () => {
      absortController.abort();
    };
  }, []);

  return orientation;
};
