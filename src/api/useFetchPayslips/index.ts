import { useCallback, useEffect, useState } from "react";
import mockData from "./__mock__.json";

/* --------------------------------- Schemas -------------------------------- */
interface PayslipRawSchema {
  id: string;
  fromDate: string;
  toDate: string;
  file: string;
}

// Extends the raw schema because this example is simple and we want to keep the same structure, but we might add computed properties or transformations in the future without extending the raw schema
export interface PayslipModel extends PayslipRawSchema {}

/* ----------------------- Fetch Interface Definitions ---------------------- */
interface FetchPayslipsFilters {
  year?: number;
  searchText?: string;
}

type SortOrder = "asc" | "desc";

interface UseFetchPayslipsOptions {
  filters?: FetchPayslipsFilters;
  sortOrder?: SortOrder;
}

/* ---------------------------- Auxiliary Methods --------------------------- */
// Simulates an API call with filtering and sorting with a delay to mimic network request
const simulateRequest = (
  filters?: FetchPayslipsFilters,
  sortOrder: SortOrder = "desc",
): Promise<PayslipRawSchema[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredData = [...mockData.payslips];

      if (filters?.year) {
        filteredData = filteredData.filter((payslip) => {
          const year = new Date(payslip.fromDate).getFullYear();
          return year === filters.year;
        });
      }

      if (filters?.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        filteredData = filteredData.filter((payslip) => {
          return (
            payslip.id.toLowerCase().includes(searchLower) ||
            payslip.fromDate.includes(searchLower) ||
            payslip.toDate.includes(searchLower)
          );
        });
      }

      filteredData.sort((a, b) => {
        const dateA = new Date(a.fromDate).getTime();
        const dateB = new Date(b.fromDate).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });

      resolve(filteredData);
    }, 400);
  });
};

/* ---------------------------- Hook Definitions ---------------------------- */
interface UseFetchPayslipsReturn {
  data: PayslipModel[];
  loading: boolean;
  refetch: (options?: UseFetchPayslipsOptions) => void;
}

export const useFetchPayslips = (
  initialOptions?: UseFetchPayslipsOptions,
): UseFetchPayslipsReturn => {
  // ---------- States
  // States to control data, we could use useQuery from react-query for more complex scenarios, moreover to control pagination and caching
  const [data, setData] = useState<PayslipModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentOptions, setCurrentOptions] = useState<UseFetchPayslipsOptions>(
    initialOptions || {},
  );

  // ---------- Functions
  const fetchData = useCallback(
    async (options?: UseFetchPayslipsOptions) => {
      setLoading(true);

      // Use provided options or fallback to current options
      const opts = options || currentOptions;
      setCurrentOptions(opts);

      // Fetch data with the determined options
      try {
        const result = await simulateRequest(opts.filters, opts.sortOrder);
        setData(result);
      } catch (error) {
        // TODO: Implement proper error handling with error state
        console.error("Error fetching payslips:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [currentOptions],
  );

  const refetch = useCallback(
    (options?: UseFetchPayslipsOptions) => {
      fetchData(options);
    },
    [fetchData],
  );

  // ---------- Effects
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ---------- Hook Return
  return {
    data,
    loading,
    refetch,
  };
};
