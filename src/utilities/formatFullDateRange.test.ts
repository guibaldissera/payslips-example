import { formatFullDateRange } from "./formatFullDateRange";

describe("formatFullDateRange", () => {
  it("should format date range with full date format", () => {
    const result = formatFullDateRange("2024-01-01", "2024-03-31");
    expect(result).toBe("Jan 01, 2024 - Mar 31, 2024");
  });

  it("should format date range with same month", () => {
    const result = formatFullDateRange("2024-06-01", "2024-06-30");
    expect(result).toBe("Jun 01, 2024 - Jun 30, 2024");
  });

  it("should format date range spanning full year", () => {
    const result = formatFullDateRange("2024-01-01", "2024-12-31");
    expect(result).toBe("Jan 01, 2024 - Dec 31, 2024");
  });

  it("should format date range in the middle of the year", () => {
    const result = formatFullDateRange("2024-05-15", "2024-08-20");
    expect(result).toBe("May 15, 2024 - Aug 20, 2024");
  });

  it("should format date range with different years", () => {
    const result = formatFullDateRange("2023-11-15", "2024-01-31");
    expect(result).toBe("Nov 15, 2023 - Jan 31, 2024");
  });

  it("should handle February in leap year", () => {
    const result = formatFullDateRange("2024-02-01", "2024-02-29");
    expect(result).toBe("Feb 01, 2024 - Feb 29, 2024");
  });

  it("should handle single day range", () => {
    const result = formatFullDateRange("2024-07-04", "2024-07-04");
    expect(result).toBe("Jul 04, 2024 - Jul 04, 2024");
  });

  it("should handle ISO date format", () => {
    const result = formatFullDateRange(
      "2024-01-01T00:00:00.000Z",
      "2024-01-31T23:59:59.999Z",
    );
    expect(result).toBe("Jan 01, 2024 - Jan 31, 2024");
  });

  it("should format all months correctly with full dates", () => {
    const testCases = [
      {
        from: "2024-01-15",
        to: "2024-01-20",
        expected: "Jan 15, 2024 - Jan 20, 2024",
      },
      {
        from: "2024-02-10",
        to: "2024-02-14",
        expected: "Feb 10, 2024 - Feb 14, 2024",
      },
      {
        from: "2024-03-05",
        to: "2024-03-25",
        expected: "Mar 05, 2024 - Mar 25, 2024",
      },
      {
        from: "2024-04-01",
        to: "2024-04-30",
        expected: "Apr 01, 2024 - Apr 30, 2024",
      },
      {
        from: "2024-05-12",
        to: "2024-05-18",
        expected: "May 12, 2024 - May 18, 2024",
      },
      {
        from: "2024-06-07",
        to: "2024-06-21",
        expected: "Jun 07, 2024 - Jun 21, 2024",
      },
      {
        from: "2024-07-03",
        to: "2024-07-17",
        expected: "Jul 03, 2024 - Jul 17, 2024",
      },
      {
        from: "2024-08-09",
        to: "2024-08-23",
        expected: "Aug 09, 2024 - Aug 23, 2024",
      },
      {
        from: "2024-09-11",
        to: "2024-09-19",
        expected: "Sep 11, 2024 - Sep 19, 2024",
      },
      {
        from: "2024-10-06",
        to: "2024-10-28",
        expected: "Oct 06, 2024 - Oct 28, 2024",
      },
      {
        from: "2024-11-02",
        to: "2024-11-16",
        expected: "Nov 02, 2024 - Nov 16, 2024",
      },
      {
        from: "2024-12-08",
        to: "2024-12-24",
        expected: "Dec 08, 2024 - Dec 24, 2024",
      },
    ];

    testCases.forEach(({ from, to, expected }) => {
      expect(formatFullDateRange(from, to)).toBe(expected);
    });
  });
});
