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
import Icon from 'react-native-vector-icons/Feather';
import EmployeeContactDetailsModal from '../components/home/EmployeeContactDetailsModal';
import { DirectoryEmployeeOption } from '../typeInterfaces/DirectoryEmployee';
import { RootStackParamList, SeeAllCoWorkersContactScreenProps } from '../typeInterfaces/navigationTypes';
import { setTabBarVisibility } from '../utils/navigationUtils';
import { colors } from '../utils/colors';
import { textStyle } from '../utils/textStyle';

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeRoot'>;

const SeeAllCoWorkersContactScreen: React.FC<SeeAllCoWorkersContactScreenProps> = ({
    route,
}) => {
    const { employees }: { employees: DirectoryEmployeeOption[] } = route.params;

    const navigation = useNavigation<NavigationProp>();


    const [search, setSearch] = useState<string>('');
    const [selectedEmployee, setSelectedEmployee] = useState<DirectoryEmployeeOption | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);


    useEffect(() => {
        setTabBarVisibility(navigation, false); // Hide tab bar

        return () => {
            setTabBarVisibility(navigation, true); // Show tab bar when unmounting
        };
    }, [navigation]);


    const filteredEmployees = search
        ? employees.filter((employee: DirectoryEmployeeOption) => {
            return (
                employee?.label?.toLowerCase()?.includes(search?.toLowerCase()) ||
                employee?.department?.toLowerCase()?.includes(search?.toLowerCase()) ||
                employee?.designation?.toLowerCase()?.includes(search?.toLowerCase()) ||
                employee?.employeeId?.toString()?.includes(search)
            );
        })
        : employees;

    const handleCardPress = (employee: DirectoryEmployeeOption) => {
        setSelectedEmployee(employee);
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>
            {/* Gradient Header */}
            <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.header}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeRoot')}>
                        <Icon name="arrow-left" size={24} color={colors?.white} />
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
                        {employee?.profileShowImage}
                        <View style={styles.employeeInfo}>
                            <Text style={styles.employeeName}>{employee.label}</Text>
                            <Text style={styles.employeeRole}>{employee.designation}</Text>
                        </View>
                        <Text style={styles.department}>{employee.department}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Employee Details Modal */}
            <EmployeeContactDetailsModal
                employee={selectedEmployee}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors?.offWhite1,
    },
    header: {
        paddingTop: 40,
        paddingBottom: 10,
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
        ...textStyle?.bold20,
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

});

export default SeeAllCoWorkersContactScreen;
