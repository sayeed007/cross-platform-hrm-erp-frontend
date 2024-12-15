import React from 'react';
import RootNavigation from './navigation/RootNavigation';
import { SuccessModalProvider } from './context/SuccessModalProvider';
import { ErrorModalProvider } from './context/ErrorModalProvider';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <ErrorModalProvider>
      <SuccessModalProvider>
        <NavigationContainer>
          <UserProvider>
            <RootNavigation />
          </UserProvider>
        </NavigationContainer>
      </SuccessModalProvider>
    </ErrorModalProvider>

  );
}
