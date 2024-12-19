import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { TextEncoder } from 'text-encoding';
import { ErrorModalProvider } from './context/ErrorModalProvider';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { SuccessModalProvider } from './context/SuccessModalProvider';
import { UserProvider } from './context/UserContext';
import RootNavigation from './navigation/RootNavigation';
global.TextEncoder = TextEncoder;
import * as Notifications from "expo-notifications";


export default function App() {

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
