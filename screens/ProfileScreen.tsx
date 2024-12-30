import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AllTransportRoute } from '../apis/Profile';
import EmployeeAvatar from '../components/common/EmployeeAvatar';
import EducationList from '../components/profile/EducationList';
import ExperienceList from '../components/profile/ExperienceList';
import HolidayPolicyInfo from '../components/profile/HolidayPolicyInfo';
import LeavePolicyInfo from '../components/profile/LeavePolicyInfo';
import ProfileIndividualDetails from '../components/profile/ProfileIndividualDetails';
import PromotionStatusInfo from '../components/profile/PromotionStatusInfo';
import SalaryStatusInfo from '../components/profile/SalaryStatusInfo';
import ShiftComponent from '../components/profile/ShiftComponent';
import SingleFlatList, { FlatListNormalData } from '../components/profile/SingleFlatList';
import UserDocuments from '../components/profile/UserDocuments';
import { useUser } from '../context/UserContext';
import { RootStackParamList } from '../typeInterfaces/navigationTypes';
import { defaultUser, PickupPoint, TransportRoute } from '../typeInterfaces/User';
import { colors } from '../utils/colors';
import { generateTabWIseEmployeeDetails } from '../utils/generateTabWiseEmployeeDetails';
import { textStyle } from '../utils/textStyle';

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeRoot'>;

export const TransportRouteAndPickupPoints_STORAGE_KEY = 'transport_route_and_pickup_point';


const ProfileScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { user } = useUser();
    const tabWiseEmployeeDetails = generateTabWIseEmployeeDetails(user || { ...defaultUser });

    // Tabs data
    const tabs: (keyof typeof tabWiseEmployeeDetails)[] = [
        'Company Details',
        'Office Policy',
        'Compensation',
        'Nominee',
        'Personal Details',
        'Education & Experience',
        'Emergency Info',
        'Documents',
    ];

    // Use keyof for type safety
    const [selectedTab, setSelectedTab] = useState<keyof typeof tabWiseEmployeeDetails>('Company Details');
    const [loading, setLoading] = useState(true);
    const [allRouteAndPickupPoint, setAllRouteAndPickupPoint] = useState<TransportRoute[]>([]);
    const [allPickupPoint, setAllPickupPoint] = useState<PickupPoint[]>([]);

    const [profileImage, setProfileImage] = useState(null);
    const [name, setName] = useState('Ferdous Islam');
    const [isEditingName, setIsEditingName] = useState(false);


    const fetchAndStoreHolidays = async (currentAccessToken: string) => {
        if (user?.companyId) {
            AllTransportRoute(user?.companyId, `CustomizedData`).then(async (allTransportRouteResponse) => {
                if (allTransportRouteResponse?.[0]) {
                    setAllRouteAndPickupPoint([...allTransportRouteResponse?.[0]]);

                    let newArray: PickupPoint[] = [];
                    allTransportRouteResponse?.[0]?.forEach(function (entry: TransportRoute) {
                        newArray = [...newArray, ...entry?.pickupPoints]
                    });

                    setAllPickupPoint(newArray);

                    // Store data in AsyncStorage
                    const storageValue = JSON.stringify({
                        accessToken: currentAccessToken,
                        data: allTransportRouteResponse?.[0],
                    });

                    await AsyncStorage.setItem(TransportRouteAndPickupPoints_STORAGE_KEY, storageValue);
                } else {
                    console.error('Error fetching holidays:', allTransportRouteResponse?.[1]);
                }
            }).finally(() => {
                setLoading(false);
            })
        }
    };

    const loadTransportRouteAndPickupPoints = async () => {
        const currentAccessToken = user?.accessToken ?? ''; // Replace with actual token logic
        setLoading(true);

        try {
            const storedData = await AsyncStorage.getItem(TransportRouteAndPickupPoints_STORAGE_KEY);

            if (storedData) {
                const { accessToken, data } = JSON.parse(storedData);
                if (accessToken === currentAccessToken) {
                    setAllRouteAndPickupPoint([...data]);

                    let newArray: PickupPoint[] = [];
                    data.forEach(function (entry: TransportRoute) {
                        newArray = [...newArray, ...entry?.pickupPoints]
                    });

                    setAllPickupPoint(newArray);
                    setLoading(false);
                    return;
                }
            }
            // Fetch and store data if no valid cache is available
            await fetchAndStoreHolidays(currentAccessToken);
        } catch (error) {
            console.error('Error loading holidays:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.companyId) {
            loadTransportRouteAndPickupPoints();
        }
    }, [user?.companyId]);


    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        // if (!result?.cancelled) {
        //     setProfileImage(result.uri);
        // }
    };

    const handleNameChange = (newName: string) => {
        setName(newName);
        setIsEditingName(false);
    };

    const updateTransportDetails = (
        allRouteAndPickupPoint: TransportRoute[],
        allPickupPoint: PickupPoint[],
        benefitsData: any
    ) => {

        return benefitsData.map((item: any) => {
            if (item.title === 'Transport Route') {
                return {
                    ...item,
                    value: allRouteAndPickupPoint?.find(
                        (route) => route.id === user?.employeeInfo?.officialBenefit?.transportRouteId
                    )?.routeName || 'N/A',
                };
            }
            if (item.title === 'Transport Pickup Point') {
                return {
                    ...item,
                    value: allPickupPoint?.find(
                        (pickupPoint) => pickupPoint?.id === user?.employeeInfo?.officialBenefit?.transportPickupPointId
                    )?.pickupPointName || 'N/A',
                };
            }
            return item;
        });
    };


    const renderData = () => {

        const data: FlatListNormalData[] = [];
        const selectedTabData = tabWiseEmployeeDetails[selectedTab];

        switch (selectedTab) {
            case 'Company Details':
            case 'Personal Details':
            case 'Emergency Info':
                const flatListNormalData = selectedTabData as FlatListNormalData[];

                return (
                    <SingleFlatList
                        flatListNormalData={flatListNormalData}
                    />
                );
            // Custom Design
            case 'Office Policy':
                const flatListNormalDataForOfficePolicy = (selectedTabData as FlatListNormalData[][]);

                return (
                    <>

                        {/* Attendance Roster Info */}
                        {/* IF REGULAR ROSTER */}
                        {flatListNormalDataForOfficePolicy?.[0]?.[0]?.title === 'Shift Name' ?
                            <SingleFlatList
                                key={`Attendance Roster Info`}
                                flatListNormalData={flatListNormalDataForOfficePolicy[0]}
                                listTitle={`Attendance Roster Info`}
                            />
                            :
                            <>
                                {/* <ShiftComponent
                                    attendanceRoaster={user?.employeeInfo?.attendanceRoaster}
                                    flatListNormalData={flatListNormalDataForOfficePolicy[0]}
                                /> */}
                            </>
                        }

                        {/* SCHEDULER ROSTER ASSIGN */}
                        {flatListNormalDataForOfficePolicy[1]?.length > 0 &&
                            <SingleFlatList
                                key={`Scheduler Attendance Roster Info`}
                                flatListNormalData={flatListNormalDataForOfficePolicy[1]}
                                listTitle={`Scheduler Attendance Roster Info`}
                            />
                        }

                        {/* Leave Policy info */}
                        <LeavePolicyInfo />

                        {/* Holiday Policy info */}
                        <HolidayPolicyInfo />

                    </>
                )

            // MULTIPLE FLAT-LIST
            case 'Compensation':
                const flatListNormalDataForCompensation = (selectedTabData as FlatListNormalData[][]);

                // flatListNormalDataForCompensation[1]?.filter(Boolean) => remove all falsy value
                const updatedBenefitsData = updateTransportDetails(allRouteAndPickupPoint, allPickupPoint, flatListNormalDataForCompensation[1]?.filter(Boolean));

                flatListNormalDataForCompensation[1] = [...updatedBenefitsData];

                return (
                    <>
                        {flatListNormalDataForCompensation.map((eachCompensation, index) => {
                            return (
                                <SingleFlatList
                                    key={index === 0 ? `Bank Info` : 'Benefit Info'}
                                    flatListNormalData={eachCompensation}
                                    listTitle={index === 0 ? `Bank Info` : 'Benefit Info'}
                                />
                            )
                        })}

                        {/* SALARY STATUS */}
                        <SalaryStatusInfo />

                        {/* Promotion Status */}
                        <PromotionStatusInfo />
                    </>
                )
                break;

            case 'Nominee':
                const flatListNormalDataForNominee = (selectedTabData as FlatListNormalData[][]);

                return (
                    <>
                        {flatListNormalDataForNominee.map((eachNominee, index) => {
                            return (
                                <SingleFlatList
                                    key={`Nominee ${index + 1}`}
                                    flatListNormalData={eachNominee}
                                    listTitle={`Nominee ${index + 1}`}
                                />
                            )
                        })
                        }
                    </>
                )
            // Custom Design
            case 'Education & Experience':
                return (
                    <>
                        {/* Education */}
                        <EducationList />

                        {/* EXPERIENCE */}
                        <ExperienceList />
                    </>
                )

            // Custom Design
            case 'Documents':
                return (
                    <>
                        {/* Documents */}
                        <UserDocuments />
                    </>
                )

            default:
                return (
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => `${item.title}-${index}`}
                        renderItem={({ item, index }) => (
                            <ProfileIndividualDetails
                                title={item.title}
                                value={item.value}
                                index={`${item.title}-${index}`}
                            />
                        )}
                        contentContainerStyle={styles.dataContainer}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                );
        }
    };


    return (
        <View style={styles.container}>
            {/* Gradient Header */}
            <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.header}>

                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color={colors?.white} />
                    </TouchableOpacity>
                    <Text style={styles.navTitle}>Profile</Text>
                    <Text></Text>
                </View>

                {/*  */}
                {/* Profile Image */}
                <TouchableOpacity onPress={handleImagePicker}>
                    <EmployeeAvatar
                        profileShowImage={user?.profilePicPath ?? ''}
                        label={`${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}`}
                        size={100}
                    />
                </TouchableOpacity>

                {/* Name and Editable Field */}
                <TouchableOpacity onPress={() => setIsEditingName(true)} style={styles.nameContainer}>
                    {isEditingName ? (
                        <TextInput
                            style={styles.nameInput}
                            value={name}
                            onChangeText={handleNameChange}
                            onBlur={() => setIsEditingName(false)}
                            autoFocus
                        />
                    ) : (
                        <Text style={styles.profileName}>
                            {user?.firstName} {user?.lastName}
                        </Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.profileSubText}>
                    {user?.designationName} | {user?.departmentName}
                </Text>
            </LinearGradient>

            {/* Vertical Scrollable Tabs */}
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.tabsContainer}
                >
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.tab,
                                selectedTab === tab && styles.activeTab,
                            ]}
                            onPress={() => setSelectedTab(tab)}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    selectedTab === tab && styles.activeTabText,
                                ]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>


            {/* Tab Content */}
            <ScrollView
                // horizontal
                style={{ flex: 1, marginBottom: 70 }}
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={true}
                nestedScrollEnabled={true}
            >
                {renderData()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors?.offWhite1,
        justifyContent: 'flex-start',
    },
    header: {
        paddingTop: 20,
        paddingBottom: 10,
        alignItems: 'center',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
    },
    navTitle: {
        ...textStyle?.bold16,
        color: colors?.white,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
        borderWidth: 3,
        borderColor: colors?.white,
    },
    nameContainer: {
        marginTop: 10,
    },
    profileName: {
        ...textStyle?.bold20,
        color: colors?.white,
    },
    nameInput: {
        ...textStyle?.bold20,
        color: colors?.white,
        borderBottomWidth: 1,
        borderBottomColor: colors?.white,
        textAlign: 'center',
    },
    profileSubText: {
        ...textStyle?.regular16,
        color: colors?.white,
    },
    tabsContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 40,
    },
    activeTab: {
        backgroundColor: colors.info,
        borderRadius: 40,
    },
    tabText: {
        ...textStyle?.semibold16,
        color: colors?.gray2,
    },
    activeTabText: {
        color: colors?.white,
    },
    dataContainer: {
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 6,
        marginHorizontal: 16,
        marginTop: 10,
    },
    separator: {
        height: 1,
        backgroundColor: colors.offWhite5,
    },
});

export default ProfileScreen;
