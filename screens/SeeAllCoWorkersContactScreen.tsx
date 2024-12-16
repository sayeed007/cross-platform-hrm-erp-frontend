import { LinearGradient } from 'expo-linear-gradient'; // Use expo-linear-gradient for Expo projects
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { DirectoryEmployeeOption } from '../typeInterfaces/DirectoryEmployee';
import { SeeAllCoWorkersContactScreenProps } from '../typeInterfaces/navigationTypes';

const SeeAllCoWorkersContactScreen: React.FC<SeeAllCoWorkersContactScreenProps> = ({
    route,
}) => {
    const { employees } = route.params; // Receive data from HomeScreen
    const [search, setSearch] = useState('');

    // Filter employees based on the search input
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

    return (
        <View style={styles.container}>
            {/* Gradient Header */}
            <LinearGradient
                colors={['#1488CC', '#2B32B2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerContainer}
            >
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
                {filteredEmployees.map((employee: DirectoryEmployeeOption) => (
                    <View key={employee.employeeId} style={styles.employeeCard}>
                        {employee?.profileShowImage}

                        <View style={styles.employeeInfo}>
                            <Text style={styles.employeeName}>{employee.label}</Text>
                            <Text style={styles.employeeRole}>{employee.designation}</Text>
                        </View>
                        <Text style={styles.department}>{employee.department}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    headerContainer: {
        padding: 20,
        paddingHorizontal: 25,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    subHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    searchBar: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        margin: 16,
        borderColor: '#E2E8F0',
        borderWidth: 1,
        fontSize: 14,
        color: '#111827',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    employeeInfo: {
        flex: 1,
        marginLeft: 10,
    },
    employeeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    employeeRole: {
        fontSize: 12,
        color: '#6B7280',
    },
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
