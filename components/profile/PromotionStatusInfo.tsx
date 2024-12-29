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
import PromotionStatusCard from './PromotionStatusCard';


const PromotionStatusInfo = () => {
    const { user } = useUser();

    const [promotionInfo, setPromotionInfo] = useState<SalaryInfo[]>([]);


    useEffect(() => {
        if (user) {
            const salary = [...user?.employeeInfo?.salaryInfo];

            const salaryHistory = (salary.filter(item => (item.status === "promotion")))?.sort((a, b) => {
                return moment(b.effectiveDate, "YYYY-MM-DD").diff(moment(a.effectiveDate, "YYYY-MM-DD"))
            });

            setPromotionInfo([...salaryHistory]);
        }
    }, [user]);

    return (
        <View style={styles.container}>
            {/* List Title */}
            <Text style={styles.title}>
                Promotion Status
            </Text>

            {/* FlatList */}
            <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={false}
                key={'Promotion Status'}
                data={promotionInfo}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item, index }) => (
                    <PromotionStatusCard
                        promotionInfo={item}
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

export default PromotionStatusInfo;
