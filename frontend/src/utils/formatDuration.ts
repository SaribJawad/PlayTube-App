export const formateDuration = (duration: number): string => {
  const totalSeconds = Math.round(duration);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formatedMinutes = minutes.toString().padStart(2, "0");
  const formatedSeconds = seconds.toString().padStart(2, "0");

  return `${formatedMinutes}:${formatedSeconds}`;
};
