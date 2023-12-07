export const convertToPercent = (value: number, size: number) => {
  return Number(((value / size) * 100).toFixed(1));
};
