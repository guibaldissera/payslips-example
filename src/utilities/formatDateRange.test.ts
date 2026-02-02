import { formatDateRange } from "./formatDateRange";

describe("formatDateRange", () => {
  it("should format date range within the same year", () => {
    const result = formatDateRange("2024-01-01", "2024-03-31");
    expect(result).toBe("Jan - Mar 2024");
  });

  it("should format date range with same month", () => {
    const result = formatDateRange("2024-06-01", "2024-06-30");
    expect(result).toBe("Jun - Jun 2024");
  });

  it("should format date range spanning full year", () => {
    const result = formatDateRange("2024-01-01", "2024-12-31");
    expect(result).toBe("Jan - Dec 2024");
  });

  it("should format date range in the middle of the year", () => {
    const result = formatDateRange("2024-05-15", "2024-08-20");
    expect(result).toBe("May - Aug 2024");
  });

  it("should use abbreviated month names", () => {
    const result = formatDateRange("2024-09-01", "2024-11-30");
    expect(result).toBe("Sep - Nov 2024");
  });

  it("should handle February correctly", () => {
    const result = formatDateRange("2024-02-01", "2024-02-29");
    expect(result).toBe("Feb - Feb 2024");
  });

  it("should handle different years by using fromDate year", () => {
    const result = formatDateRange("2023-11-01", "2024-01-31");
    expect(result).toBe("Nov - Jan 2023");
  });

  it("should handle all months correctly", () => {
    const months = [
      { from: "2024-01-01", to: "2024-01-31", expected: "Jan - Jan 2024" },
      { from: "2024-02-01", to: "2024-02-29", expected: "Feb - Feb 2024" },
      { from: "2024-03-01", to: "2024-03-31", expected: "Mar - Mar 2024" },
      { from: "2024-04-01", to: "2024-04-30", expected: "Apr - Apr 2024" },
      { from: "2024-05-01", to: "2024-05-31", expected: "May - May 2024" },
      { from: "2024-06-01", to: "2024-06-30", expected: "Jun - Jun 2024" },
      { from: "2024-07-01", to: "2024-07-31", expected: "Jul - Jul 2024" },
      { from: "2024-08-01", to: "2024-08-31", expected: "Aug - Aug 2024" },
      { from: "2024-09-01", to: "2024-09-30", expected: "Sep - Sep 2024" },
      { from: "2024-10-01", to: "2024-10-31", expected: "Oct - Oct 2024" },
      { from: "2024-11-01", to: "2024-11-30", expected: "Nov - Nov 2024" },
      { from: "2024-12-01", to: "2024-12-31", expected: "Dec - Dec 2024" },
    ];

    months.forEach(({ from, to, expected }) => {
      expect(formatDateRange(from, to)).toBe(expected);
    });
  });
});
