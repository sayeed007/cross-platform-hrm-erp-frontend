import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DirectoryEmployeeOption } from './DirectoryEmployee';
import { Notice, NoticeWithMonth } from './Notice';
import { BirthdayEmployeeWithMonth } from './Birthday';
import { HolidayWithMonth } from './Holiday';

// Define the stack's parameter list
export type RootStackParamList = {
    Login: undefined; // Login screen takes no params
    ForgotPassword: undefined; // ForgotPassword screen takes no params
    MainTabs: undefined; // MainTabs screen takes no params
    Home: undefined;
    HomeRoot: undefined;
    SeeAllCoWorkersContact: { employees: DirectoryEmployeeOption[] }; // New route with employees
    Notice: { noticeList: NoticeWithMonth[] };
    Holiday: { holidayList: HolidayWithMonth[] };
    Birthday: { currentMonthBirthdayList: BirthdayEmployeeWithMonth };
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


// Navigation prop for Notice
export type NoticeNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Notice'
>;

// Route prop for Notice
export type NoticeRouteProp = RouteProp<
    RootStackParamList,
    'Notice'
>;

// Combined props for Holiday
export type NoticeScreenProps = {
    navigation: NoticeNavigationProp;
    route: NoticeRouteProp;
};

// Navigation prop for Holiday
export type HolidayNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Holiday'
>;

// Route prop for Holiday
export type HolidayRouteProp = RouteProp<
    RootStackParamList,
    'Holiday'
>;

// Combined props for Holiday
export type HolidayScreenProps = {
    navigation: HolidayNavigationProp;
    route: HolidayRouteProp;
};


// Navigation prop for Upcoming Birthday
export type BirthdayNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Birthday'
>;

// Route prop for Upcoming Birthday
export type BirthdayRouteProp = RouteProp<
    RootStackParamList,
    'Birthday'
>;

// Combined props for Upcoming Birthday
export type BirthdayScreenProps = {
    navigation: BirthdayNavigationProp;
    route: BirthdayRouteProp;
};

