import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useUser } from '../../context/UserContext';
import { SalaryInfo } from '../../typeInterfaces/User';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';
import SalaryStatusCard from './SalaryStatusCard';


const SalaryStatusInfo = () => {
    const { user } = useUser();

    const [salaryInfo, setSalaryInfo] = useState<SalaryInfo[]>([]);


    useEffect(() => {
        if (user) {
            const salary = [...user?.employeeInfo?.salaryInfo];

            const salaryHistory = (salary.filter(item => item.percentage > 0 || (item.status === "joining")))?.sort((a, b) => {
                return moment(b.effectiveDate, "YYYY-MM-DD").diff(moment(a.effectiveDate, "YYYY-MM-DD"))
            });

            setSalaryInfo([...salaryHistory]);
        }
    }, [user]);

    return (
        <View style={styles.container}>
            {/* List Title */}
            <Text style={styles.title}>
                Salary Status
            </Text>

            {/* FlatList */}
            <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={false}
                key={'Salary Status'}
                data={salaryInfo}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item, index }) => (
                    <SalaryStatusCard
                        salaryInfo={item}
                    />
                )}
                style={{ flex: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 6,
        marginHorizontal: 16,
        marginBottom: 20,
    },
    title: {
        ...textStyle.semibold20,
        color: colors.black,
    },
    separator: {
        height: 1,
        backgroundColor: colors.offWhite5,
    },
});

export default SalaryStatusInfo;
