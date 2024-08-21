export const formatViews = (views: number): string => {
  if (views < 1000) {
    return views.toString();
  }

  const suffixes = ["K", "M", "B"];
  const suffixIndex = Math.floor(Math.log10(views) / 3) - 1;
  const divisor = Math.pow(10, (suffixIndex + 1) * 3);

  const formattedValue = (views / divisor).toFixed(1).replace(/\.0$/, "");
  return `${formattedValue}${suffixes[suffixIndex]}`;
};
