import { getSessionStorage, setSessionStorage } from '@/app/_utils/sessionStorage';
import { useEffect, useState, useCallback } from 'react';

declare const DeviceOrientationEvent: {
  requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
};

export const useDeviceOrientation = () => {
  const [isPermission, setIsPermission] = useState(false);
  const [orientation, setOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });
  const handleUpdate = useCallback(
    (event: DeviceOrientationEvent) => {
      const { alpha, beta, gamma } = event;
      setOrientation({
        alpha: alpha ?? 0,
        beta: beta ?? 0,
        gamma: gamma ?? 0,
      });
    },
    [setOrientation],
  );

  const requestPermission = useCallback(() => {
    if (window?.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission().then((event) => {
        if (event === 'granted') {
          setIsPermission(true);
          setSessionStorage('isDeviceRotationPermission', 'true');
        } else {
          alert('デバイス向きの取得の許可をしてください');
          setSessionStorage('isDeviceRotationPermission', 'false');
        }
      });
    } else {
      setIsPermission(true);
      setSessionStorage('isDeviceRotationPermission', 'true');
    }
  }, []);

  useEffect(() => {
    const result = getSessionStorage('isDeviceRotationPermission');
    if (result) {
      const currentPermission = result === 'true';
      setIsPermission(currentPermission);
    }
  }, []);

  useEffect(() => {
    const absortController = new AbortController();

    if (window?.DeviceOrientationEvent && !DeviceOrientationEvent.requestPermission) {
      setIsPermission(true);
    }

    if (isPermission) {
      setIsPermission(true);
      window.addEventListener('deviceorientation', handleUpdate, {
        signal: absortController.signal,
      });
    }
    return () => {
      absortController.abort();
    };
  }, [isPermission, handleUpdate]);

  return {
    ...orientation,
    handleUpdate,
    isPermission,
    requestPermission,
  };
};
