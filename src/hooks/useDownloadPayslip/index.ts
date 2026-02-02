import { useState } from "react";
import { downloadRemotePayslip } from "./downloadRemotePayslip";

interface DownloadPayslipResult {
  success: boolean;
  data?: {
    uri: string;
  };
  error?: {
    title: string;
    message: string;
  };
}

interface UseDownloadPayslipReturn {
  downloadPayslip: (
    uri: string,
    filename: string,
  ) => Promise<DownloadPayslipResult>;
  isDownloading: boolean;
}

export const useDownloadPayslip = (): UseDownloadPayslipReturn => {
  // ---------- State
  const [isDownloading, setIsDownloading] = useState(false);

  // ---------- Handlers
  const downloadPayslip = async (
    uri: string,
    filename: string,
  ): Promise<DownloadPayslipResult> => {
    setIsDownloading(true);

    try {
      const localUri = await downloadRemotePayslip(uri, filename);
      return { success: true, data: { uri: localUri } };
    } catch (error) {
      console.log("error", error);
      return {
        success: false,
        error: {
          title: "Download Failed",
          message: "Failed to download the file. Please try again.",
        },
      };
    } finally {
      setIsDownloading(false);
    }
  };

  // ---------- Hook Return
  return { downloadPayslip, isDownloading };
};
