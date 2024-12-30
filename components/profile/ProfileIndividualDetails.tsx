import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';
import { textStyle } from '../../utils/textStyle';
import { colors } from '../../utils/colors';



interface ProfileIndividualDetailsProps {
    title?: string;
    value: string | number | boolean | null;
    index: string
}



const ProfileIndividualDetails: React.FC<ProfileIndividualDetailsProps> = ({
    title,
    value,
    index
}) => {

    return (
        <View key={index} style={styles.dataRow} >
            <Text style={styles.dataTitle}>{title}</Text>
            <Text style={styles.dataValue}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    dataRow: {
        paddingVertical: 15,
    },
    dataTitle: {
        ...textStyle?.medium14,
        color: colors?.gray1,
        marginBottom: 5,
    },
    dataValue: {
        ...textStyle?.bold16,
        color: colors?.black,
    },

});

export default ProfileIndividualDetails;
