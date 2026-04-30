import { useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';

export const useAutoSave = (data, onSave, delay = 1000) => {
  const [debouncedData] = useDebounce(data, delay);
  const initialRender = useRef(true);
  const lastSavedData = useRef(data);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (JSON.stringify(debouncedData) !== JSON.stringify(lastSavedData.current)) {
      onSave(debouncedData);
      lastSavedData.current = debouncedData;
    }
  }, [debouncedData, onSave]);

  return debouncedData;
};