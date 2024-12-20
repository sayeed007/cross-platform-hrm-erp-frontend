import { Image, StyleSheet, View, Text } from "react-native";
import { Notification } from "../../typeInterfaces/Notification";
import { BASE_URL } from "../../Server";
import { Avatar } from "react-native-elements";
import moment from "moment";
import { colors } from "../../utils/colors";
import shadowStyles from "../../utils/shadowStyles";
import { textStyle } from "../../utils/textStyle";


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

            {item.senderImage ?
                <Image
                    source={{ uri: `${BASE_URL?.baseApi}/${item.senderImage}` }}
                    style={styles.avatar}
                />
                :
                <View style={styles.avatarContainer}>
                    <Avatar
                        size={40} // Size of the avatar
                        rounded   // Makes it circular
                        title={'HRM'} // Fallback initials
                        overlayContainerStyle={{ backgroundColor: colors?.gray3 }} // Background color
                        titleStyle={{ color: colors?.white, ...textStyle?.regular12 }} // Style for initials
                    />
                </View>
            }


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