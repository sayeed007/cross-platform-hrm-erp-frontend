import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TextEncoder } from "text-encoding";
import DefaultToast from './components/common/DefaultToast';
import FullPageLoader from "./components/common/FullPageLoader";
import { ErrorModalProvider } from "./context/ErrorModalProvider";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import { SuccessModalProvider } from "./context/SuccessModalProvider";
import { UserProvider } from "./context/UserContext";
import RootNavigation from "./navigation/RootNavigation";
import { colors } from "./utils/colors";
import shadowStyles from "./utils/shadowStyles";
import { textStyle } from "./utils/textStyle";
global.TextEncoder = TextEncoder;


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

  // Render loader if fonts are not loaded
  if (!fontsLoaded) {
    return <FullPageLoader visible={!fontsLoaded} />;
  }

  return (
    <ErrorModalProvider>
      <SuccessModalProvider>

        <GestureHandlerRootView style={{ flex: 1 }}>

          <NavigationContainer>
            <UserProvider>
              <SubscriptionProvider>

                <RootNavigation />
                <DefaultToast />

              </SubscriptionProvider>
            </UserProvider>
          </NavigationContainer>

        </GestureHandlerRootView>

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
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.info, // Set a background color for info
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    ...shadowStyles.popUpShadow2
  },
  successToastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success, // Set a background color for info
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    ...shadowStyles.popUpShadow2
  },
  failedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error, // Set a background color for info
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    ...shadowStyles.popUpShadow2,
    zIndex: 9999,
  },
});



