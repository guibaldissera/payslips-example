import { renderHook, waitFor } from "@testing-library/react-native";
import { useFetchPayslips } from "./index";

describe("useFetchPayslips", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should initialize with loading true and empty data", () => {
    const { result } = renderHook(() => useFetchPayslips());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
  });

  it("should transition loading state from true to false after fetch", async () => {
    const { result } = renderHook(() => useFetchPayslips());

    expect(result.current.loading).toBe(true);

    jest.advanceTimersByTime(400);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("should populate data after fetch completes", async () => {
    const { result } = renderHook(() => useFetchPayslips());

    jest.advanceTimersByTime(400);

    await waitFor(() => {
      expect(result.current.data.length).toBeGreaterThan(0);
    });

    expect(result.current.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          fromDate: expect.any(String),
          toDate: expect.any(String),
          file: expect.any(String),
        }),
      ]),
    );
  });

  it("should provide refetch function", async () => {
    const { result } = renderHook(() => useFetchPayslips());

    jest.advanceTimersByTime(400);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(typeof result.current.refetch).toBe("function");
  });

  it("should refetch data when refetch is called", async () => {
    const { result } = renderHook(() => useFetchPayslips());

    jest.advanceTimersByTime(400);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialDataLength = result.current.data.length;

    result.current.refetch();

    jest.advanceTimersByTime(400);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data.length).toBe(initialDataLength);
  });
});
