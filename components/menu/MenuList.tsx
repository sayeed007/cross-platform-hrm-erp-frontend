import React from "react";
import {
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Platform,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import { textStyle } from "../../utils/textStyle";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../typeInterfaces/navigationTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../context/UserContext";
import { Calendar } from "react-native-calendars";
import { getIcon } from "../../utils/generateIcon";
import { GenerateAndViewIcon } from "../common/GenerateAndSHowIcon";


// navigation.navigate(item.navigatePath)
const MenuList = () => {
    const { setUser } = useUser();
    const navigation = useNavigation<HomeScreenNavigationProp>();

    // Define grouped menu data
    const menuData = [
        {
            title: "Quick Access",
            data: [
                { id: "1", label: "My Attendance", icon: "calendar", action: () => { navigation.navigate('Attendance') } },
                { id: "2", label: "Attendance Request Approval", icon: "attendanceRequestApproval", action: () => { navigation.navigate('AttendanceRequestApproval') } },
                { id: "3", label: "My Leave Request", icon: "myLeaveRequest", action: () => { navigation.navigate('Leave') } },
                { id: "4", label: "Leave Request Approval", icon: "leaveRequestApproval", action: () => { navigation.navigate('LeaveApproval') } },
                { id: "5", label: "Directory", icon: "directory", action: () => { navigation.navigate('SeeAllCoWorkersContact') } },
                { id: "6", label: "Holidays", icon: "holidays", action: () => { navigation.navigate('Holiday') } },
                { id: "7", label: "Notice", icon: "notices", action: () => { navigation.navigate('Notice') } },
                // { id: "8", label: "Office Policy", icon: "officePolicy", action: () => { navigation.navigate('') } },
            ],
        },
        {
            title: "Account Setting",
            data: [
                { id: "9", label: "Profile", icon: "profile", action: () => { navigation.navigate('Profile') } },
                { id: "10", label: "Change Password", icon: "changePassword", action: () => { } },
                // { id: "11", label: "Preference", icon: "notifications", action: () => { } },
                {
                    id: "12", label: "Log Out", icon: "logOut", action: () => { setUser(null); }
                },
            ],
        },
    ];


    const renderItem = ({ item }: { item: { id: string; label: string; icon: string, action: () => void } }) => (
        <TouchableOpacity style={styles.menuItem}
            onPress={() => item.action()}
        >
            {/* <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={24}
                color={colors.brand}
                style={styles.menuIcon}
            /> */}
            <GenerateAndViewIcon
                iconName={item.icon}
                size={24}
                style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>{item.label}</Text>
        </TouchableOpacity >
    );

    const renderSectionHeader = ({ section }: { section: { title: string } }) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
    );


    return (
        <>
            <View style={styles.mainContainer}>
                <View style={styles.menuListContainer}>
                    <SectionList
                        nestedScrollEnabled={true}
                        scrollEnabled={false}
                        sections={menuData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        renderSectionHeader={renderSectionHeader}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                    />
                </View>

                <View style={styles.footerContainer}>
                    <View style={styles.aboutContainer}>
                        <Text style={styles.aboutTitle}>About Application</Text>
                        <Text style={styles.aboutText}>Tafuri HRMS V 1.0</Text>
                    </View>
                    <Image
                        source={require("../../assets/images/LogoForMenuAbout.png")} // Replace with your logo path
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // top: -200,
        marginTop: -200,
        width: '100%',
        marginBottom: 70,
    },
    menuListContainer: {
        backgroundColor: colors?.white,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 3,
    },
    listContent: {
        paddingBottom: 30, // Extra padding for smooth scrolling
    },
    sectionHeader: {
        ...textStyle.semibold12,
        color: colors.gray1,
        marginTop: 20,
        marginBottom: 10,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },
    menuIcon: {
        marginRight: 16,
    },
    menuLabel: {
        ...textStyle.medium14,
        color: colors.black,
    },
    footerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 20,
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: colors?.white,
    },
    aboutContainer: {
    },
    aboutTitle: {
        ...textStyle.medium14,
        color: colors.black,
    },
    aboutText: {
        ...textStyle.regular12,
        color: colors.gray2,
        marginTop: 5,
    },
    logo: {
        width: 150,
        height: 60,
    },
    itemSeparator: {
        height: 1,
        backgroundColor: colors.offWhite5,
    },
});

export default MenuList;
