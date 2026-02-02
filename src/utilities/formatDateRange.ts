export const formatDateRange = (fromDate: string, toDate: string): string => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [fromYear, fromMonth] = fromDate.split("-").map(Number);
  const [, toMonth] = toDate.split("-").map(Number);

  const monthStart = monthNames[fromMonth - 1];
  const monthEnd = monthNames[toMonth - 1];

  return `${monthStart} - ${monthEnd} ${fromYear}`;
};
