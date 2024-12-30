import { FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { BASE_URL } from "../../Server";
import { colors } from "../../utils/colors";
import { getFileIcon } from "../../utils/fileTypeIcons";
import { textStyle } from "../../utils/textStyle";


const downloadFile = async (attachmentPath: string, fileName: string) => {
    if (Platform.OS === "web") {
        // Use a web-specific download method
        downloadFileForWeb(attachmentPath, fileName);
    } else {
        // Use expo-file-system for native platforms
        await downloadFileForNative(attachmentPath, fileName);
    }
};

const downloadFileForNative = async (attachmentPath: string, fileName: string) => {
    try {
        // Check if the attachmentPath already includes a scheme
        const fileUrl = `${BASE_URL.baseApi}/${attachmentPath}`;

        // Define the local file path
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;

        // Check if the file already exists
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists) {
            Toast.show({
                type: 'infoToast',
                position: 'bottom',
                text1: "File is already downloaded.",
            });
            return;
        }

        // Download the file
        const downloadResumable = FileSystem.createDownloadResumable(fileUrl, fileUri);
        const result = await downloadResumable.downloadAsync();

        if (result?.uri) {
            Toast.show({
                type: 'infoToast',
                position: 'bottom',
                text1: `Download Successful, File downloaded to: ${result.uri}`,
            });
        } else {
            Toast.show({
                type: 'failedToast',
                position: 'bottom',
                text1: `Download Failed, File could not be downloaded.`,
            });
        }
    } catch (error) {
        Toast.show({
            type: 'failedToast',
            position: 'bottom',
            text1: `Download Failed, An error occurred while downloading the file.`,
        });
        console.error("File download error:", error);
    }
};

const downloadFileForWeb = (attachmentPath: string, fileName: string) => {
    const fileUrl = `${BASE_URL}/${attachmentPath}`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.target = "_blank"; // Open in a new tab if necessary
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};



export const FileDownload = ({ attachmentPath }: { attachmentPath?: string }) => {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Documents:</Text>
            {attachmentPath ? (
                <TouchableOpacity
                    style={styles.documentContainer}
                    onPress={() => downloadFile(attachmentPath, attachmentPath.split("/").pop() || "document")}
                >
                    <FontAwesome
                        name={getFileIcon(attachmentPath)}
                        size={16}
                        color={colors.info}
                    />
                    <Text style={styles.documentText}>{attachmentPath}</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.detailValue}>No uploaded document</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    detailRow: {
        // flexDirection: "row",
        // alignItems: "center",
        marginBottom: 15,
    },
    detailLabel: {
        ...textStyle.regular14,
        color: colors.gray2,
        flex: 1,
    },
    documentContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    documentText: {
        ...textStyle.regular14,
        marginLeft: 10,
        color: colors.info,
        textDecorationLine: "underline",
    },
    detailValue: {
        fontSize: 14,
        color: colors.gray2,
    },
});
