import { useEffect } from 'react';

function useDebounce<T>({
  value,
  delay,
  setDebounce,
  setIsLoading,
}: {
  value: T;
  delay?: number;
  setDebounce?: (debounce: T) => void;
  setIsLoading?: (isLoading: boolean) => void;
}) {
  useEffect(() => {
    if (typeof setIsLoading !== 'undefined') setIsLoading(true);

    const timer = setTimeout(() => {
      if (typeof setIsLoading !== 'undefined') setIsLoading(false);
      if (typeof setDebounce !== 'undefined') setDebounce(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, setDebounce, setIsLoading]);
}

export default useDebounce;
