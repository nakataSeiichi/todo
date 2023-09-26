import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay?: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsLoading(false);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return {
    debouncedValue,
    isLoading,
  };
}

export default useDebounce;
