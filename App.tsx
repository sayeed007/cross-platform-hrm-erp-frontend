import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import Toast, { BaseToast, ToastConfig } from 'react-native-toast-message';
import { TextEncoder } from "text-encoding";
import FullPageLoader from "./components/common/FullPageLoader";
import { ErrorModalProvider } from "./context/ErrorModalProvider";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import { SuccessModalProvider } from "./context/SuccessModalProvider";
import { UserProvider } from "./context/UserContext";
import RootNavigation from "./navigation/RootNavigation";
global.TextEncoder = TextEncoder;
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { colors } from "./utils/colors";
import { textStyle } from "./utils/textStyle";


export default function App() {

  // LOAD FONT
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemibold: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  // GET PERMISSION FOR NOTIFICATION
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const requestPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      await Notifications.requestPermissionsAsync();
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);


  // CUSTOM TOAST
  const toastConfig: ToastConfig = {
    // Custom "success" toast
    // customSuccess: ({ text1, text2, props }) => (
    //   <View style={[
    //     styles.toastContainer,
    //     styles.successContainer,
    //     props.position === 'bottom' ? styles.toastBottom : styles.toastTop,
    //   ]}>
    //     <Text style={styles.toastTitle}>{text1}</Text>
    //     <Text style={styles.toastMessage}>{text2}</Text>
    //     <TouchableOpacity
    //       style={styles.checkButton}
    //       onPress={props.onCheckPress}>
    //       <Text style={styles.checkText}>Check Now →</Text>
    //     </TouchableOpacity>
    //   </View>
    // ),
    // approval success
    approvalSuccess: ({ text1, text2, props }) => (
      <View style={[styles?.approvalContainer, styles.approvalSuccess]}>
        <View style={styles.approvalMessage}>
          <Feather name="info" size={18} color="white" style={styles.marginRight} />
          <Text style={styles.toastTitle}>{text1}</Text>
        </View>

        <TouchableOpacity
          style={[styles.approvalAction, styles.actionSuccess]}
          onPress={props.onCheckPress}>
          <Text style={styles.toastMessage}>{text2}</Text>
          <Feather name="arrow-right" size={18} color="white" style={styles.marginLeft} />
        </TouchableOpacity>
      </View>
    ),
    // approval error
    approvalReject: ({ text1, text2, props }) => (
      <View style={[styles.approvalContainer, styles.approvalReject]}>
        <View style={styles.approvalMessage}>
          <Feather name="info" size={18} color="white" style={styles.marginRight} />
          <Text style={styles.toastTitle}>{text1}</Text>
        </View>

        <TouchableOpacity
          style={[styles.approvalAction, styles.actionReject]}
          onPress={props.onCheckPress}>
          <Text style={styles.toastMessage}>{text2}</Text>
          <Feather name="arrow-right" size={18} color="white" style={styles.marginLeft} />
        </TouchableOpacity>
      </View>
    ),
    // Custom "error" toast
    // customError: ({ text1, text2, props }) => (
    //   <View style={[styles.toastContainer, styles.errorContainer]}>
    //     <Text style={styles.toastTitle}>{text1}</Text>
    //     <Text style={styles.toastMessage}>{text2}</Text>
    //     <TouchableOpacity
    //       style={styles.checkButton}
    //       onPress={props.onCheckPress}>
    //       <Text style={styles.checkText}>Check Now →</Text>
    //     </TouchableOpacity>
    //   </View>
    // ),
  };

  // Render loader if fonts are not loaded
  if (!fontsLoaded) {
    return <FullPageLoader visible={!fontsLoaded} />;
  }

  return (
    <ErrorModalProvider>
      <SuccessModalProvider>
        <NavigationContainer>
          <UserProvider>
            <SubscriptionProvider>

              <RootNavigation />
              <Toast config={toastConfig} />

            </SubscriptionProvider>
          </UserProvider>
        </NavigationContainer>
      </SuccessModalProvider>
    </ErrorModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toastContainer: {
    width: '90%',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  toastTop: {
    top: 50,
  },
  toastBottom: {
    bottom: 25,
  },
  successContainer: {
    backgroundColor: '#d4edda',
    borderLeftWidth: 6,
    borderLeftColor: '#28a745',
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    borderLeftWidth: 6,
    borderLeftColor: '#dc3545',
  },
  checkButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  checkText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // APPROVAL & REJECT
  approvalContainer: {
    width: '90%',
    borderRadius: 30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    bottom: 25,
    backgroundColor: colors.error,
    color: 'white',
  },
  approvalSuccess: {
    backgroundColor: colors.success,
  },
  approvalReject: {
    backgroundColor: colors.error,
  },
  approvalMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 10,
  },
  toastTitle: {
    ...textStyle.medium12,
    color: colors.white,
  },
  approvalAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: colors.deepRed,
  },
  actionSuccess: {
    backgroundColor: colors.deepGreen,
  },
  actionReject: {
    backgroundColor: colors.deepRed,
  },
  toastMessage: {
    ...textStyle.medium12,
    color: colors.white,
  },
  marginLeft: {
    marginLeft: 10,
  },
});



