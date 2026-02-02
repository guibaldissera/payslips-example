export const formatFullDateRange = (
  fromDate: string,
  toDate: string,
): string => {
  const [fromYear, fromMonth, fromDay] = fromDate.split("-").map(Number);
  const [toYear, toMonth, toDay] = toDate.split("-").map(Number);

  const from = new Date(fromYear, fromMonth - 1, fromDay);
  const to = new Date(toYear, toMonth - 1, toDay);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const fromFormatted = from.toLocaleDateString("en-US", options);
  const toFormatted = to.toLocaleDateString("en-US", options);

  return `${fromFormatted} - ${toFormatted}`;
};
