import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TextEncoder } from "text-encoding";
import DefaultToast from './components/common/DefaultToast';
import FullPageLoader from "./components/modals/FullPageLoader";
import { ErrorModalProvider } from "./context/ErrorModalProvider";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import { SuccessModalProvider } from "./context/SuccessModalProvider";
import { UserProvider } from "./context/UserContext";
import RootNavigation from "./navigation/RootNavigation";
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



