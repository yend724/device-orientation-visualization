import { useEffect, useState, useCallback } from 'react';

declare const DeviceOrientationEvent: {
  requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
};

export const useDeviceOrientation = () => {
  const [isPermission, setIsPermission] = useState(false);
  const [absortController] = useState(() => new AbortController());
  const [orientation, setOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  const registerEvents = useCallback(() => {
    setIsPermission(true);
    window.addEventListener(
      'deviceorientation',
      (event) => {
        const { alpha, beta, gamma } = event;
        setOrientation({
          alpha: alpha ?? 0,
          beta: beta ?? 0,
          gamma: gamma ?? 0,
        });
      },
      { signal: absortController.signal },
    );
    return { absortController };
  }, [absortController]);

  const permission = () => {
    if (DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission().then((event) => {
        if (event === 'granted') {
          setIsPermission(true);
        } else {
          alert('デバイス向きの取得の許可をしてください');
        }
      });
    }
  };

  useEffect(() => {
    let absortController: AbortController | null = null;
    if (DeviceOrientationEvent && !DeviceOrientationEvent.requestPermission) {
      setIsPermission(true);
    }
    if (isPermission) {
      const result = registerEvents();
      absortController = result.absortController;
    }
    return () => {
      setIsPermission(false);
      absortController?.abort();
    };
  }, [absortController, isPermission, registerEvents]);

  return {
    ...orientation,
    isPermission,
    permission,
  };
};
