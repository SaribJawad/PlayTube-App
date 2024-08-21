export const formatDate = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const differenceInSeconds = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 2592000;
  const secondsInYear = 31536000;

  if (differenceInSeconds < secondsInMinute) {
    return `${differenceInSeconds} second${
      differenceInSeconds > 1 ? "s" : ""
    } ago`;
  } else if (differenceInSeconds < secondsInHour) {
    const minutes = Math.floor(differenceInSeconds / secondsInMinute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (differenceInSeconds < secondsInDay) {
    const hours = Math.floor(differenceInSeconds / secondsInHour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (differenceInSeconds < secondsInMonth) {
    const days = Math.floor(differenceInSeconds / secondsInDay);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (differenceInSeconds < secondsInYear) {
    const months = Math.floor(differenceInSeconds / secondsInMonth);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(differenceInSeconds / secondsInYear);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};
