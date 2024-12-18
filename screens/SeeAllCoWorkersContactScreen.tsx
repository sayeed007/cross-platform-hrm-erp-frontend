import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { DirectoryEmployeeOption } from '../typeInterfaces/DirectoryEmployee';
import { RootStackParamList, SeeAllCoWorkersContactScreenProps } from '../typeInterfaces/navigationTypes';
import EmployeeContactDetailsModal from '../components/home/EmployeeContactDetailsModal';
import Icon from 'react-native-vector-icons/Feather';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeRoot'>;

const SeeAllCoWorkersContactScreen: React.FC<SeeAllCoWorkersContactScreenProps> = ({
    route,
}) => {
    const { employees }: { employees: DirectoryEmployeeOption[] } = route.params;

    const navigation = useNavigation<NavigationProp>();


    const [search, setSearch] = useState<string>('');
    const [selectedEmployee, setSelectedEmployee] = useState<DirectoryEmployeeOption | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

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
            <LinearGradient colors={['#1488CC', '#2B32B2']} style={styles.header}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeRoot')}>
                        <Icon name="arrow-left" size={24} color="#FFFFFF" />
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
                placeholderTextColor="#6B7280"
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
        backgroundColor: '#F8FAFC',
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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: 12,
    },
    headerContainer: {
        padding: 20
    },
    subHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    searchBar: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        margin: 16,
        borderColor: '#E2E8F0',
        borderWidth: 1,
    },
    employeeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        marginHorizontal: 16,
    },
    employeeInfo: { flex: 1, marginLeft: 10 },
    employeeName: { fontSize: 16, fontWeight: 'bold' },
    employeeRole: { fontSize: 12, color: '#6B7280' },
    department: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2563EB',
        backgroundColor: '#E0F2FE',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },

});

export default SeeAllCoWorkersContactScreen;
