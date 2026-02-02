export const formatFullDateRange = (
  fromDate: string,
  toDate: string,
): string => {
  const from = new Date(fromDate);
  const to = new Date(toDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  };

  const fromFormatted = from.toLocaleDateString("en-US", options);
  const toFormatted = to.toLocaleDateString("en-US", options);

  return `${fromFormatted} - ${toFormatted}`;
};
