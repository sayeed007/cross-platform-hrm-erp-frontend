import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from 'react';
import { Modal, Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import ApplyAttendanceModal from '../components/attendance/applyAttendance/ApplyAttendanceModal';
import { GenerateAndViewIcon } from '../components/common/GenerateAndSHowIcon';
import { SingleNotification } from '../components/home/SingleNotification';
import ApplyLeaveModal from '../components/leave/applyLeave/ApplyLeaveModal';
import SuccessModal from '../components/modals/SuccessModal';
import QuickActionRootModal from '../components/quickAction/QuickActionRootModal';
import { TabBarAdvancedButton } from '../components/tab/TabBarAdvancedButton';
import { useSubscription } from '../context/SubscriptionContext';
import AttendanceStack from '../Stack/AttendanceStack';
import HomeStack from '../Stack/HomeStack';
import LeaveStack from '../Stack/LeaveStack';
import MenuStack from '../Stack/MenuStack';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';
import { defaultNotification } from '../typeInterfaces/Notification';
import { colors } from '../utils/colors';
import { textStyle } from '../utils/textStyle';


const BottomBar = createBottomTabNavigator();

// Extract the screenOptions logic
const getScreenOptions = ({ route }: { route: any }) => ({
    tabBarIcon: ({ focused }: { focused: boolean }) => {
        return (
            <>
                <GenerateAndViewIcon
                    iconName={focused ? `${route.name}-Focused` : `${route.name}`}
                    size={24}
                />
            </>
        );
    },
    tabBarLabel: ({ focused }: { focused: boolean }) => (
        <Text style={{ ...textStyle?.regular12, color: focused ? colors?.spinner : colors?.bottomNav }}>
            {route.name}
        </Text>
    ),
    headerShown: false,
    tabBarStyle: styles.tabBarStyle,
});

export const TabBar: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { message, visible, setVisible } = useSubscription();

    const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [isQuickActionModalVisible, setQuickActionModalVisible] = useState(false);
    const [showApplyAttendanceModalVisible, setShowApplyAttendanceModalVisible] = useState<boolean>(false);
    const [showApplyLeaveModalVisible, setShowApplyLeaveModalVisible] = useState<boolean>(false);

    const toggleModal = () => {
        setQuickActionModalVisible(!isQuickActionModalVisible);
    };

    useEffect(() => {
        if (visible) {
            if (Platform.OS === "web") {
                handleWebNotification();
            } else if (Platform.OS === "android" || Platform.OS === "ios") {
                handleMobileNotification();
            }
        }
    }, [visible]);

    const handleWebNotification = () => {
        // Show modal for web
        setTimeout(() => {
            setVisible(false);
        }, 5000); // Close modal after 5 seconds
    };

    const handleMobileNotification = async () => {
        // Trigger local push notification
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "New Notification",
                body: message || "You have a new notification!",
                sound: true,
            },
            trigger: null, // Trigger immediately
        });

        setTimeout(() => {
            setVisible(false);
        }, 5000); // Dismiss notification after 5 seconds
    };

    const handleContinue = () => {
        setTitle("");
        setDescription("");
        setSuccessModalVisible(false);

        // Replace the current route with itself
        const currentRoute = navigation.getState().routes[navigation.getState().index];
        navigation.reset({
            index: 0,
            routes: [{ name: currentRoute.name, params: currentRoute.params }],
        });
    };

    return (
        <>

            <StatusBar backgroundColor={colors.brand} />
            {/* Modal */}
            {isQuickActionModalVisible && (
                <QuickActionRootModal
                    isVisible={isQuickActionModalVisible}
                    onClose={() => toggleModal()}
                    onApplyAttendance={() => {
                        toggleModal();
                        setShowApplyAttendanceModalVisible(true);
                    }}
                    onApplyLeave={() => {
                        toggleModal();
                        setShowApplyLeaveModalVisible(true);
                    }}
                />
            )}

            {/* MODAL FOR APPLYING MANUAL ATTENDANCE */}
            {showApplyAttendanceModalVisible &&
                <ApplyAttendanceModal
                    selectedAttendance={{}}
                    isVisible={showApplyAttendanceModalVisible}
                    onClose={() => {
                        setShowApplyAttendanceModalVisible(false);
                    }}
                    onSuccessAction={() => {
                        setTitle("Attendance Request Sent Successfully");
                        setDescription("Your request is now pending for approval. Check Notification for approval status.");
                        setSuccessModalVisible(true);
                    }}
                />
            }

            {/* MODAL FOR APPLYING Leave Request */}
            {showApplyLeaveModalVisible &&
                <ApplyLeaveModal
                    selectedLeave={{}}
                    isVisible={showApplyLeaveModalVisible}
                    onClose={() => {
                        setShowApplyLeaveModalVisible(false);
                    }}
                    onSuccessAction={() => {
                        setShowApplyLeaveModalVisible(false);
                        setTitle("Leave Request Sent Successfully");
                        setDescription("Your request is now pending for approval. Check Notification for approval status.");
                        setSuccessModalVisible(true);
                    }}
                />
            }

            {/* ATTENDANCE REQUEST SUCCESS MODAL */}
            {successModalVisible &&
                <SuccessModal
                    isVisible={successModalVisible}
                    title={title}
                    description={description}
                    onContinue={handleContinue}
                />
            }

            {Platform.OS === "web" && visible && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <SingleNotification
                            item={{
                                ...defaultNotification,
                                message: message ?? ''
                            }}
                        />
                    </View>
                </Modal>
            )}

            <BottomBar.Navigator
                initialRouteName="Home"
                screenOptions={getScreenOptions}
            >
                <BottomBar.Screen
                    name="Home"
                    component={HomeStack}
                />
                <BottomBar.Screen
                    name="Attendance"
                    component={AttendanceStack}
                />
                <BottomBar.Screen
                    name="Add"
                    options={{
                        tabBarButton: (props) => (
                            <TabBarAdvancedButton
                                {...props}
                                onPress={toggleModal}
                            />
                        ),
                    }}
                >
                    {() => null}
                </BottomBar.Screen>
                <BottomBar.Screen
                    name="Leave"
                    component={LeaveStack}
                />
                <BottomBar.Screen
                    name="Menu"
                    component={MenuStack}
                />
            </BottomBar.Navigator>

        </>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: colors?.white,
        height: 60,
        borderColor: colors?.offWhite1,
        borderTopWidth: 0,
        shadowColor: 'transparent',
        elevation: 0,
    },
});
