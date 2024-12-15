import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define the stack's parameter list
export type RootStackParamList = {
    Login: undefined; // Login screen takes no params
    ForgotPassword: undefined; // ForgotPassword screen takes no params
    MainTabs: undefined; // MainTabs screen takes no params
};

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// Define the navigation prop for ForgotPasswordScreen
export type ForgotPasswordScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ForgotPassword'
>;

export type ForgotPasswordScreenRouteProp = RouteProp<RootStackParamList, 'ForgotPassword'>;

export type MainTabsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MainTabs'
>;

