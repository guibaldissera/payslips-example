import { Directory, File, Paths } from "expo-file-system";

export const downloadRemotePayslip = async (
  uri: string,
  filename: string,
): Promise<string> => {
  const destination = new Directory(Paths.cache, `payslips/`);
  try {
    // If destination path don't exist, create it
    if (!destination.exists) {
      await destination.create();
    }
    const outputFile = new File(`${destination.uri}${filename}`);

    // Check if file already exists and return it
    const fileExists = await outputFile.info();
    if (fileExists.exists) {
      return outputFile.uri;
    }

    // Otherwise download the file
    const output = await File.downloadFileAsync(uri, outputFile);
    if (output.exists) {
      return outputFile.uri;
    }

    // Failure to download the file
    throw new Error(`Failed to download payslip: ${uri}`);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to download payslip: ${uri}`);
  }
};
