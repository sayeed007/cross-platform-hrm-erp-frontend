import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // For icons

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
                    <Icon name="calendar" size={16} color="#6B7280" />
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
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3, // Android shadow
        borderLeftWidth: 4,
        borderColor: '#2563EB',
        marginVertical: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
    },
    cardBody: {
        fontSize: 14,
        color: '#637381',
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderTopWidth: 1,
        borderColor: '#F5F5F5',
        paddingVertical: 4,
    },
    dateText: {
        fontSize: 12,
        color: '#637381',
    },
});

export default LatestNoticeCard;
