import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Sharing from "expo-sharing";
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

interface PayslipDetailsFileViewerProps {
  fileUri: string;
  fromDate: string;
}

export const PayslipDetailsFileViewer = ({
  fileUri,
  fromDate,
}: PayslipDetailsFileViewerProps) => {
  // ---------- Hooks
  const { downloadPayslip, isDownloading } = useDownloadPayslip();
  const { showAlert } = useAlert();

  // ---------- States
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [localFileUri, setLocalFileUri] = useState<string | undefined>(
    undefined,
  );

  // ---------- Auxiliaries
  const isImageFile = (uri: string): boolean => {
    const lowerUri = uri.toLowerCase();
    return (
      lowerUri.endsWith(".png") ||
      lowerUri.endsWith(".jpg") ||
      lowerUri.endsWith(".jpeg")
    );
  };

  const downloadFile = async (uri: string) => {
    // Create the filename to save
    const date = new Date(fromDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const filename = `payslip-${year}-${month}.png`;

    // Download the file
    return await downloadPayslip(fileUri, filename);
  };

  // ---------- Handlers
  const handlePreview = async () => {
    const result = await downloadFile(fileUri);

    // Update states based in result
    if (result.success) {
      setLocalFileUri(result.data?.uri);
      setDownloadCompleted(true);
    } else if (result.error) {
      showAlert({
        variant: "error",
        title: result.error?.title ?? "Failure",
        message: result.error?.message ?? "Failed to download the payslip.",
      });
    }
  };

  const handleShare = async () => {
    let payslipUri;
    if (!downloadCompleted) {
      const result = await downloadFile(fileUri);
      if (result.success) {
        payslipUri = result.data?.uri;
      } else {
        showAlert({
          variant: "error",
          title: result.error?.title ?? "Failure",
          message: result.error?.message ?? "Failed to download the payslip.",
        });
        return;
      }
    }

    if (payslipUri) {
      // Show share dialog to user select where to save the file or share
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable && payslipUri) {
        await Sharing.shareAsync(payslipUri, {
          mimeType: "image/png",
          dialogTitle: "Save or Share Payslip",
        });

        // FIX: if user cancel the action, this success alert will also be showed, but it should not.
        showAlert({
          variant: "success",
          title: "Download Concluído",
          message: "Payslip salvo com sucesso!",
        });
      }
    }
  };

  // ---------- Render
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payslip Document</Text>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.previewButton,
              pressed && styles.previewButtonPressed,
              isDownloading && styles.previewButtonDisabled,
            ]}
            onPress={handlePreview}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <MaterialIcons name="visibility" size={20} color="#FFFFFF" />
            )}
            <Text style={styles.buttonText}>
              {isDownloading ? "Loading..." : "Preview"}
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.saveButtonPressed,
              isDownloading && styles.saveButtonDisabled,
            ]}
            onPress={handleShare}
          >
            <MaterialIcons name="file-download" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </View>

      {!downloadCompleted ? (
        <View style={styles.placeholderContainer}>
          <MaterialIcons name="image" size={64} color="#999999" />
          <Text style={styles.placeholderText}>
            Click Preview to view the file
          </Text>
        </View>
      ) : localFileUri && isImageFile(localFileUri) ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: localFileUri }}
            style={styles.image}
            contentFit="contain"
            transition={200}
          />
        </View>
      ) : (
        <View style={styles.nonViewableContainer}>
          <MaterialIcons name="description" size={64} color="#999999" />
          <Text style={styles.nonViewableTitle}>Arquivo Baixado</Text>
          <Text style={styles.nonViewableMessage}>
            This file cannot be viewed here. Open it manually in the chosen
            download location.
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
    marginBottom: 16,
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    alignSelf: "flex-end",
  },
  previewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  previewButtonPressed: {
    backgroundColor: "#2563EB",
  },
  previewButtonDisabled: {
    backgroundColor: "#93C5FD",
    opacity: 0.7,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonPressed: {
    backgroundColor: "#059669",
  },
  saveButtonDisabled: {
    backgroundColor: "#6EE7B7",
    opacity: 0.7,
  },
  buttonText: {
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
