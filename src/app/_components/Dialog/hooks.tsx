'use client';
import { useRef, useCallback } from 'react';

export const useDialog = () => {
  const ref = useRef<HTMLDialogElement | null>(null);

  const warning = () => {
    console.warn('Dialog is not mounted');
  };

  const open = useCallback(() => {
    if (!ref.current) {
      warning();
      return;
    }
    ref.current.showModal();
  }, []);
  const close = useCallback(() => {
    if (!ref.current) {
      warning();
      return;
    }
    ref.current.close();
  }, []);
  const getReturnValue = useCallback(() => {
    if (!ref.current) {
      warning();
      return;
    }
    return ref.current.returnValue;
  }, []);

  return { ref, open, close, getReturnValue };
};
