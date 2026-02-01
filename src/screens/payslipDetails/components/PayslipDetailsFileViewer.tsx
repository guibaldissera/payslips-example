import { StyleSheet, Text, View } from "react-native";

interface PayslipDetailsFileViewerProps {
  fileUri: string;
}

export const PayslipDetailsFileViewer = ({
  fileUri,
}: PayslipDetailsFileViewerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payslip Document</Text>

      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>File Viewer</Text>
        <Text style={styles.filePathText}>File: {fileUri}</Text>

        <View style={styles.todoContainer}>
          <Text style={styles.todoTitle}>TODO:</Text>
          <Text style={styles.todoText}>
            • Implement image viewer for payslip files{"\n"}• Add zoom and pan
            functionality{"\n"}• Support PDF viewing if needed{"\n"}• Add
            download/share options
          </Text>
        </View>
      </View>
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
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 16,
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
    fontSize: 18,
    fontWeight: "600",
    color: "#999999",
    marginBottom: 8,
  },
  filePathText: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 20,
    textAlign: "center",
  },
  todoContainer: {
    backgroundColor: "#FFF9E6",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFD700",
    width: "100%",
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#CC8800",
    marginBottom: 8,
  },
  todoText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
});
