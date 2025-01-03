import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For localStorage
import { getEmployeeContactDetails } from '../../apis/HomeScreen';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../typeInterfaces/navigationTypes';
import { useUser } from '../../context/UserContext';
import { Avatar } from 'react-native-elements';
import { BASE_URL } from '../../Server';
import { EmptyItemsInPage } from '../common/EmptyItemsInPage';
import EmployeeAvatar from '../common/EmployeeAvatar';
import { GenerateAndViewIcon } from '../common/GenerateAndSHowIcon';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const DIRECTORY_STORAGE_KEY = 'directory_data';

const DirectorySection = () => {

    const { user } = useUser();

    const navigation = useNavigation<NavigationProp>();
    const [loading, setLoading] = useState(true);
    const [allEmployeeOptions, setAllEmployeeOptions] = useState<any[]>([]);

    const fetchAndStoreData = async (currentAccessToken: string) => {
        try {
            // Fetch the data from the API
            const employeeResponse = await getEmployeeContactDetails();
            const sortedArray = [...employeeResponse[0]].sort((a, b) => ((a?.employeeId - b?.employeeId) && (a?.grade - b?.grade)));

            const options = sortedArray.map((obj) => ({
                value: obj.employeeId,
                label: `${obj.firstName} ${obj.lastName}`,
                employeeId: obj.employeeId,
                designation: obj.designation,
                department: obj.department,
                phone: obj.officialContact,
                email: obj.username,
                profileShowImage: obj.thumbNailsPath01,
            }));

            // Store the data in AsyncStorage
            const storageValue = JSON.stringify({ accessToken: currentAccessToken, data: options });
            await AsyncStorage.setItem(DIRECTORY_STORAGE_KEY, storageValue);

            // Update state
            setAllEmployeeOptions(options);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadData = async () => {
        const currentAccessToken = user?.accessToken ?? ''; // Replace with actual token logic
        setLoading(true);

        try {
            const storedData = await AsyncStorage.getItem(DIRECTORY_STORAGE_KEY);

            if (storedData) {
                const { accessToken, data } = JSON.parse(storedData);
                if (accessToken === currentAccessToken) {
                    // Use cached data
                    setAllEmployeeOptions(data);
                    setLoading(false);
                    return;
                }
            }

            // Fetch and store data if no valid cache is available
            await fetchAndStoreData(currentAccessToken);
        } catch (error) {
            console.error('Error loading data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSeeAllPress = () => {
        navigation.navigate('SeeAllCoWorkersContact', { employees: allEmployeeOptions });
    };


    return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>Directory</Text>

                {allEmployeeOptions?.length > 0 &&
                    <TouchableOpacity onPress={handleSeeAllPress} style={styles.seeAll}>
                        <Text style={styles.seeAllText}>See All</Text>
                        <GenerateAndViewIcon
                            iconName="ArrowUpRight"
                            size={14}
                        />
                    </TouchableOpacity>
                }
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors?.info} />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                allEmployeeOptions?.length > 0 ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {allEmployeeOptions?.map((item) => (
                            <View key={item.employeeId} style={styles.avatarContainer}>
                                <EmployeeAvatar
                                    profileShowImage={item?.profileShowImage ?? ''}
                                    label={`${item.label.charAt(0)}`}
                                    size={60}
                                />

                                <Text style={styles.avatarName} numberOfLines={1}>
                                    {item.label}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                    :
                    <EmptyItemsInPage message='No employee found.' />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5,
    },
    title: {
        ...textStyle?.bold18,
        color: colors?.black,
    },
    seeAll: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        ...textStyle?.semibold12,
        color: colors?.info,
        marginRight: 4,
    },
    avatarContainer: {
        alignItems: 'center',
        marginRight: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 4,
    },
    avatarName: {
        ...textStyle?.regular12,
        color: colors?.black,
        width: 60,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        ...textStyle?.regular16,
        color: colors?.black,
        marginTop: 10,
    },
});

export default DirectorySection;
