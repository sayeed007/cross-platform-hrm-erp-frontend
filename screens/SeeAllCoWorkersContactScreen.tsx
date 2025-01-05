import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import EmployeeAvatar from '../components/common/EmployeeAvatar';
import { GenerateAndViewIcon } from '../components/common/GenerateAndSHowIcon';
import EmployeeContactDetailsModal from '../components/home/EmployeeContactDetailsModal';
import { DirectoryEmployeeOption } from '../typeInterfaces/DirectoryEmployee';
import { RootStackParamList, SeeAllCoWorkersContactScreenProps } from '../typeInterfaces/navigationTypes';
import { colors } from '../utils/colors';
import { setTabBarVisibility } from '../utils/navigationUtils';
import { textStyle } from '../utils/textStyle';
import { getEmployeeContactDetails } from '../apis/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FullPageLoader from '../components/modals/FullPageLoader';
import { useUser } from '../context/UserContext';

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeRoot'>;

const DIRECTORY_STORAGE_KEY = 'directory_data';


const SeeAllCoWorkersContactScreen: React.FC<SeeAllCoWorkersContactScreenProps> = ({
    route,
}) => {
    const { user } = useUser();
    const { employees }: { employees: DirectoryEmployeeOption[] } = route?.params || [];

    const navigation = useNavigation<NavigationProp>();
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState<string>('');
    const [selectedEmployee, setSelectedEmployee] = useState<DirectoryEmployeeOption | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
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
        if (employees?.length > 0) {
            setAllEmployeeOptions([...employees]);
        } else {
            loadData();
        }
    }, [employees]);



    useEffect(() => {
        setTabBarVisibility(navigation, false); // Hide tab bar

        return () => {
            setTabBarVisibility(navigation, true); // Show tab bar when unmounting
        };
    }, [navigation]);


    const filteredEmployees = search
        ? allEmployeeOptions.filter((employee: DirectoryEmployeeOption) => {
            return (
                employee?.label?.toLowerCase()?.includes(search?.toLowerCase()) ||
                employee?.department?.toLowerCase()?.includes(search?.toLowerCase()) ||
                employee?.designation?.toLowerCase()?.includes(search?.toLowerCase()) ||
                employee?.employeeId?.toString()?.includes(search)
            );
        })
        : allEmployeeOptions;

    const handleCardPress = (employee: DirectoryEmployeeOption) => {
        setSelectedEmployee(employee);
        setModalVisible(true);
    };

    return (
        <>
            {/* Employee Details Modal */}
            <EmployeeContactDetailsModal
                employee={selectedEmployee}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />


            {loading ?
                <FullPageLoader visible={loading} />
                :
                <View style={styles.container}>
                    {/* Gradient Header */}
                    <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.header}>
                        <View style={styles.navBar}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <GenerateAndViewIcon
                                    iconName="ArrowLeft"
                                    size={24}
                                />
                            </TouchableOpacity>
                            <Text style={styles.navTitle}>Directory</Text>
                            <Text></Text>
                        </View>

                        <Text style={styles.subHeaderText}>Co-Workers Contact Details</Text>

                    </LinearGradient>

                    {/* Search Input */}
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search here"
                        placeholderTextColor={colors?.gray2}
                        value={search}
                        onChangeText={setSearch}
                    />

                    {/* Employees List */}
                    <ScrollView>
                        {filteredEmployees.map((employee) => (
                            <TouchableOpacity
                                key={employee.employeeId}
                                style={styles.employeeCard}
                                onPress={() => handleCardPress(employee)}
                            >
                                <EmployeeAvatar
                                    profileShowImage={employee?.profileShowImage ?? ''}
                                    label={`${employee.label.charAt(0)}`}
                                    size={40}
                                />

                                <View style={styles.employeeInfo}>
                                    <Text style={styles.employeeName}>{employee.label}</Text>
                                    <Text style={styles.employeeRole}>{employee.designation}</Text>
                                </View>
                                <Text style={styles.department}>{employee.department}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>



                </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors?.offWhite1,
    },
    header: {
        paddingVertical: 15,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    navTitle: {
        ...textStyle?.bold16,
        color: colors?.white,
        marginLeft: 12,
    },
    headerContainer: {
        padding: 20
    },
    subHeaderText: {
        ...textStyle?.semibold16,
        color: colors?.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    searchBar: {
        backgroundColor: colors?.white,
        borderRadius: 8,
        padding: 10,
        margin: 16,
        borderColor: colors?.offWhite5,
        borderWidth: 1,
    },
    employeeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors?.white,
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        marginHorizontal: 16,
    },
    employeeInfo: {
        flex: 1,
        marginLeft: 10
    },
    employeeName: {
        ...textStyle?.bold16,
    },
    employeeRole: {
        ...textStyle?.regular12,
        color: colors?.gray2,
    },
    department: {
        ...textStyle?.semibold12,
        color: colors?.info,
        backgroundColor: colors?.infoBG,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginBottom: 4,
    },
});

export default SeeAllCoWorkersContactScreen;
