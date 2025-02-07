import { useCallback } from 'react';

export const capitalizeWords = (str: string): string => {
  return str
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const useCapitalize = () => {
  const capitalize = useCallback((str: string): string => {
    return capitalizeWords(str);
  }, []);

  return capitalize;
};
