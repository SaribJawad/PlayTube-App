export const formatedDate = (dateString: string): string => {
  const date = new Date(dateString);
  const formatedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formatedDate;
};
