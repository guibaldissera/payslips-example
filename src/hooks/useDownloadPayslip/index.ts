import { Asset } from "expo-asset";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useState } from "react";

interface DownloadResult {
  success: boolean;
  error?: {
    title: string;
    message: string;
  };
}

interface UseDownloadPayslipReturn {
  downloadPayslip: (uri: string, filename: string) => Promise<DownloadResult>;
  isDownloading: boolean;
}

export const useDownloadPayslip = (): UseDownloadPayslipReturn => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPayslip = async (
    uri: string,
    filename: string,
  ): Promise<DownloadResult> => {
    setIsDownloading(true);

    try {
      const isRemote = uri.startsWith("http://") || uri.startsWith("https://");
      let localUri: string;

      if (isRemote) {
        const cacheFile = new File(Paths.cache, filename);
        const response = await fetch(uri);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        await cacheFile.create();
        await cacheFile.write(new Uint8Array(arrayBuffer));
        localUri = cacheFile.uri;
      } else {
        const assetMap: Record<string, any> = {
          "payslip-1.png": require("../../../assets/payslips/payslip-1.png"),
          "payslip-2.png": require("../../../assets/payslips/payslip-2.png"),
        };

        const assetModule = assetMap[uri];
        if (!assetModule) {
          throw new Error(`Asset not found: ${uri}`);
        }

        const asset = Asset.fromModule(assetModule);
        await asset.downloadAsync();

        if (!asset.localUri) {
          throw new Error("Failed to load asset");
        }

        const cacheFile = new File(Paths.cache, filename);
        const sourceFile = new File(asset.localUri);
        await sourceFile.copy(cacheFile);
        localUri = cacheFile.uri;
      }

      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        throw new Error("Sharing is not available on this platform");
      }

      await Sharing.shareAsync(localUri, {
        mimeType: "image/png",
        dialogTitle: "Salvar Payslip",
      });

      return { success: true };
    } catch (error) {
      console.log("error", error);
      let errorMessage =
        "Ocorreu um erro ao salvar o arquivo. Tente novamente.";

      if (error instanceof Error) {
        if (
          error.message.includes("network") ||
          error.message.includes("fetch")
        ) {
          errorMessage =
            "Não foi possível baixar o arquivo. Verifique sua conexão.";
        } else if (
          error.message.includes("not found") ||
          error.message.includes("Failed to load")
        ) {
          errorMessage = "Arquivo não encontrado.";
        }
      }

      return {
        success: false,
        error: {
          title: "Erro no Download",
          message: errorMessage,
        },
      };
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadPayslip, isDownloading };
};
