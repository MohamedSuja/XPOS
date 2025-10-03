export const toTwoDigit = (num: number): string => {
  if (!num) return '00';
  return num.toString().padStart(2, '0');
};
