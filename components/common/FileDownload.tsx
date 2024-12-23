import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { colors } from "../../utils/colors";
import { getFileIcon } from "../../utils/fileTypeIcons";
import { BASE_URL } from "../../Server";

const downloadFile = async (attachmentPath: string, fileName: string) => {
    try {
        // Define File URL
        const fileUrl = `${BASE_URL}/${attachmentPath}`;

        // Define the local file path
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;

        // Check if the file already exists
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists) {
            Alert.alert("File Downloaded", "File is already downloaded.");
            return;
        }

        // Download the file
        const downloadResumable = FileSystem.createDownloadResumable(fileUrl, fileUri);
        const result = await downloadResumable.downloadAsync();

        if (result && result.uri) {
            Alert.alert("Download Successful", `File downloaded to: ${result.uri}`);
        } else {
            Alert.alert("Download Failed", "File could not be downloaded.");
        }
    } catch (error) {
        Alert.alert("Download Failed", "An error occurred while downloading the file.");
        console.error("File download error:", error);
    }
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
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.black,
        marginRight: 10,
    },
    documentContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    documentText: {
        marginLeft: 5,
        fontSize: 14,
        color: colors.info,
        textDecorationLine: "underline",
    },
    detailValue: {
        fontSize: 14,
        color: colors.gray2,
    },
});
