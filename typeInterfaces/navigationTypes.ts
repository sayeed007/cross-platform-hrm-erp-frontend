import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DirectoryEmployeeOption } from './DirectoryEmployee';

// Define the stack's parameter list
export type RootStackParamList = {
    Login: undefined; // Login screen takes no params
    ForgotPassword: undefined; // ForgotPassword screen takes no params
    MainTabs: undefined; // MainTabs screen takes no params
    HomeMain: undefined;
    SeeAllCoWorkersContact: { employees: DirectoryEmployeeOption[] }; // New route with employees
};

// Define the bottom tab's parameter list
export type MainTabsParamList = {
    Home: undefined;
    Attendance: undefined;
    Leave: undefined;
    Menu: undefined;
    Add: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export type ForgotPasswordScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ForgotPassword'
>;

export type ForgotPasswordScreenRouteProp = RouteProp<RootStackParamList, 'ForgotPassword'>;

export type MainTabsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MainTabs'
>;

// Bottom tab navigation prop for HomeScreen
export type HomeScreenNavigationProp = BottomTabNavigationProp<MainTabsParamList, 'Home'>;

// Navigation prop for SeeAllCoWorkersContactScreen
export type SeeAllCoWorkersContactNavigationProp = StackNavigationProp<
    RootStackParamList,
    'SeeAllCoWorkersContact'
>;

// Route prop for SeeAllCoWorkersContactScreen
export type SeeAllCoWorkersContactRouteProp = RouteProp<
    RootStackParamList,
    'SeeAllCoWorkersContact'
>;

// Combined props for SeeAllCoWorkersContactScreen
export type SeeAllCoWorkersContactScreenProps = {
    navigation: SeeAllCoWorkersContactNavigationProp;
    route: SeeAllCoWorkersContactRouteProp;
};
