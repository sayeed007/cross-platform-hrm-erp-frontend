import { Image, StyleSheet, View, Text } from "react-native";
import { Notification } from "../../typeInterfaces/Notification";
import { BASE_URL } from "../../Server";
import { Avatar } from "react-native-elements";
import moment from "moment";
import { colors } from "../../utils/colors";
import shadowStyles from "../../utils/shadowStyles";
import { textStyle } from "../../utils/textStyle";
import EmployeeAvatar from "../common/EmployeeAvatar";


interface SingleNotificationProps {
    item: Notification;
}


export const SingleNotification: React.FC<SingleNotificationProps> = ({ item }) => {

    const formatDateTime = (dateString: string) => {
        const date = moment(dateString, 'YYYY-MM-DD HH:mm:ss');

        if (date.isSame(moment(), 'day')) {
            return `Today at ${date.format('hh:mm A')}`;
        } else if (date.isSame(moment().subtract(1, 'day'), 'day')) {
            return `Yesterday at ${date.format('hh:mm A')}`;
        } else {
            return date.format('DD MMM,YYYY hh:mm A'); // Example: 2023-10-15 09:00 AM
        }
    };

    return (
        <View style={[styles.notificationContainer, item.hasSeen && styles.hasSeen]}>
            <EmployeeAvatar
                profileShowImage={item.senderImage ?? ''}
                label={'HRM'}
                size={50}
            />

            <View style={styles.messageContainer}>
                <Text style={styles.message}>
                    {item.message}
                </Text>
                <Text style={styles.time}>
                    {formatDateTime(`${item.date} ${item?.time}`)}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    notificationContainer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: colors?.offWhite3,
        ...shadowStyles?.popUpShadow2
    },
    hasSeen: {
        backgroundColor: colors?.white,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 16,
    },
    avatarContainer: {
        marginHorizontal: 16,
    },
    messageContainer: {
        flex: 1,
        marginLeft: 10,
    },
    message: {
        color: colors?.gray4,
        marginVertical: 4,
    },
    time: {
        ...textStyle?.regular12,
        color: colors?.gray1,
    },
});