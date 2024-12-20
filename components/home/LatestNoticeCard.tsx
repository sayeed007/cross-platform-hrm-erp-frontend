import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // For icons
import { colors } from '../../utils/colors';
import shadowStyles from '../../utils/shadowStyles';
import { textStyle } from '../../utils/textStyle';

interface LatestNoticeCardProps {
    noticeTitle: string;
    noticeDescription: string;
    uploadedDate: string;
}

const LatestNoticeCard: React.FC<LatestNoticeCardProps> = ({
    noticeTitle,
    noticeDescription,
    uploadedDate,
}) => {

    return (
        <>

            {/* Notice Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    {noticeTitle}
                </Text>
                <Text style={styles.cardBody}>
                    {noticeDescription}
                </Text>
                <View style={styles.cardFooter}>
                    <Icon name="calendar" size={16} color={colors?.gray2} />
                    <Text style={styles.dateText}>
                        {moment(uploadedDate).format('DD MMMM, YYYY')}
                    </Text>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors?.white,
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        borderLeftWidth: 4,
        borderColor: colors?.info,
        ...shadowStyles?.popUpShadow2
    },
    cardTitle: {
        ...textStyle?.bold16,
        color: colors?.black,
        marginBottom: 8,
    },
    cardBody: {
        ...textStyle?.regular14,
        color: colors.gray2,
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderTopWidth: 1,
        borderColor: colors.offWhite1,
        paddingVertical: 4,
    },
    dateText: {
        ...textStyle?.regular12,
        color: colors.gray2,
    },
});

export default LatestNoticeCard;
