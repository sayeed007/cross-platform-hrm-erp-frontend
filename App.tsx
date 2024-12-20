import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { TextEncoder } from "text-encoding";
import { ErrorModalProvider } from "./context/ErrorModalProvider";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import { SuccessModalProvider } from "./context/SuccessModalProvider";
import { UserProvider } from "./context/UserContext";
import RootNavigation from "./navigation/RootNavigation";
global.TextEncoder = TextEncoder;
import * as Notifications from "expo-notifications";
import { useFonts } from "expo-font";
import FullPageLoader from "./components/common/FullPageLoader";

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemibold: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
  });

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
        <NavigationContainer>
          <UserProvider>
            <SubscriptionProvider>
              <RootNavigation />
            </SubscriptionProvider>
          </UserProvider>
        </NavigationContainer>
      </SuccessModalProvider>
    </ErrorModalProvider>
  );
}
