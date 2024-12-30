import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Linking from "expo-linking";
import { useUser } from "../../context/UserContext";
import { BASE_URL } from "../../Server";
import { EmptyItems } from "../common/EmptyItems";
import Toast from "react-native-toast-message";



const UserDocuments = () => {

    const { user } = useUser();
    const personalFiles = user?.employeeInfo?.personalFiles || [];

    const documentsData = [
        {
            title: "Documents",
            items: [
                { id: 1, name: "NID", url: user?.employeeInfo?.nidPassPath ? `${BASE_URL.baseApi}/${user?.employeeInfo?.nidPassPath}` : 'null' },
                { id: 2, name: "CV", url: user?.employeeInfo?.cvPath ? `${BASE_URL.baseApi}/${user?.employeeInfo?.cvPath}` : 'null' },
                { id: 3, name: "Letter", url: user?.employeeInfo?.appointmentLetter ? `${BASE_URL.baseApi}/${user?.employeeInfo?.appointmentLetter}` : 'null' },
            ],
        },
        {
            title: "Other Documents",
            items: personalFiles?.length > 0 ?
                personalFiles?.map((eachDocument) => {
                    return (
                        {
                            id: eachDocument?.id,
                            name: eachDocument?.fileName,
                            url: eachDocument?.filePath ? `${BASE_URL.baseApi}/${eachDocument?.filePath}` : 'null'
                        }
                    )
                })
                :
                []
        },
    ];

    const handleDocumentClick = async (url: string) => {
        if (url === 'null') {
            Toast.show({
                type: 'infoToast',
                position: 'bottom',
                text1: `No file has yet been uploaded.`,
            });
        } else {
            try {
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                    await Linking.openURL(url);
                } else {
                    Toast.show({
                        type: 'failedToast',
                        position: 'bottom',
                        text1: `Cannot open the document URL.`,
                    });
                }
            } catch (error) {
                Toast.show({
                    type: 'failedToast',
                    position: 'bottom',
                    text1: `An error occurred while trying to open the document.`,
                });
            }
        }
    };

    return (
        <View style={styles.container}>
            {documentsData.map((section) => (
                <View key={section.title} style={styles.section}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    {section?.items?.length > 0 ?
                        section?.items?.map((doc) => (
                            <TouchableOpacity
                                key={doc.id}
                                style={styles.documentItem}
                                onPress={() => handleDocumentClick(doc.url)}
                            >
                                <Icon name="folder" size={24} color="#4F86F7" />
                                <Text style={styles.documentName}>{doc.name}</Text>
                            </TouchableOpacity>
                        ))
                        :
                        <EmptyItems
                            title='Noting to show'
                            subtitle='Content will appear once something is created or modified.'
                        />
                    }
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
        padding: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    documentItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    documentName: {
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 12,
        color: "#111827",
    },
});

export default UserDocuments;
