import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAlert } from "../../../components";
import { useDownloadPayslip } from "../../../hooks/useDownloadPayslip";

const ASSET_MAP: Record<string, any> = {
  "payslip-1.png": require("../../../../assets/payslips/payslip-1.png"),
  "payslip-2.png": require("../../../../assets/payslips/payslip-2.png"),
};

interface PayslipDetailsFileViewerProps {
  fileUri: string;
  fromDate: string;
}

export const PayslipDetailsFileViewer = ({
  fileUri,
  fromDate,
}: PayslipDetailsFileViewerProps) => {
  const { downloadPayslip, isDownloading } = useDownloadPayslip();
  const { showAlert } = useAlert();
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  const isImageFile = (uri: string): boolean => {
    const lowerUri = uri.toLowerCase();
    return (
      lowerUri.endsWith(".png") ||
      lowerUri.endsWith(".jpg") ||
      lowerUri.endsWith(".jpeg")
    );
  };

  const handleDownload = async () => {
    const date = new Date(fromDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const filename = `payslip-${year}-${month}.png`;

    const result = await downloadPayslip(fileUri, filename);

    if (result.success) {
      setDownloadCompleted(true);
      showAlert({
        variant: "success",
        title: "Download Concluído",
        message: "Payslip salvo com sucesso!",
      });
    } else if (result.error) {
      showAlert({
        variant: "error",
        title: result.error.title,
        message: result.error.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payslip Document</Text>
        <Pressable
          style={({ pressed }) => [
            styles.downloadButton,
            pressed && styles.downloadButtonPressed,
            isDownloading && styles.downloadButtonDisabled,
          ]}
          onPress={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Ionicons name="download-outline" size={20} color="#FFFFFF" />
          )}
          <Text style={styles.downloadButtonText}>
            {isDownloading ? "Baixando..." : "Download"}
          </Text>
        </Pressable>
      </View>

      {!downloadCompleted ? (
        <View style={styles.placeholderContainer}>
          <Ionicons name="cloud-download-outline" size={64} color="#999999" />
          <Text style={styles.placeholderText}>
            Clique em Download para visualizar o arquivo
          </Text>
        </View>
      ) : isImageFile(fileUri) ? (
        <View style={styles.imageContainer}>
          <Image
            source={ASSET_MAP[fileUri] || { uri: fileUri }}
            style={styles.image}
            contentFit="contain"
            transition={200}
          />
        </View>
      ) : (
        <View style={styles.nonViewableContainer}>
          <Ionicons name="document-outline" size={64} color="#999999" />
          <Text style={styles.nonViewableTitle}>Arquivo Baixado</Text>
          <Text style={styles.nonViewableMessage}>
            Este arquivo não pode ser visualizado aqui. Abra-o manualmente no
            local escolhido de download.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  downloadButtonPressed: {
    backgroundColor: "#2563EB",
  },
  downloadButtonDisabled: {
    backgroundColor: "#93C5FD",
    opacity: 0.7,
  },
  downloadButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  placeholderContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 24,
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#999999",
    marginTop: 16,
    textAlign: "center",
  },
  imageContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 16,
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 4,
  },
  nonViewableContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 32,
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
  },
  nonViewableTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginTop: 16,
    marginBottom: 8,
  },
  nonViewableMessage: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
  },
});
