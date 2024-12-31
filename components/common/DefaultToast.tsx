import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { colors } from '../../utils/colors';
import shadowStyles from '../../utils/shadowStyles';
import { textStyle } from '../../utils/textStyle';


const DefaultToast = () => {


    const toastConfig: ToastConfig = {
        // Custom "success" toast
        // customSuccess: ({ text1, text2, props }) => (
        //   <View style={[
        //     styles.toastContainer,
        //     styles.successContainer,
        //     props.position === 'bottom' ? styles.toastBottom : styles.toastTop,
        //   ]}>
        //     <Text style={styles.toastTitle}>{text1}</Text>
        //     <Text style={styles.toastMessage}>{text2}</Text>
        //     <TouchableOpacity
        //       style={styles.checkButton}
        //       onPress={props.onCheckPress}>
        //       <Text style={styles.checkText}>Check Now →</Text>
        //     </TouchableOpacity>
        //   </View>
        // ),
        // Custom "error" toast
        // customError: ({ text1, text2, props }) => (
        //   <View style={[styles.toastContainer, styles.errorContainer]}>
        //     <Text style={styles.toastTitle}>{text1}</Text>
        //     <Text style={styles.toastMessage}>{text2}</Text>
        //     <TouchableOpacity
        //       style={styles.checkButton}
        //       onPress={props.onCheckPress}>
        //       <Text style={styles.checkText}>Check Now →</Text>
        //     </TouchableOpacity>
        //   </View>
        // ),
        // approval success
        approvalSuccess: ({ text1, text2, props }) => (
            <View style={[styles?.approvalContainer, styles.approvalSuccess]} >
                <View style={styles.approvalMessage}>
                    <Feather name="info" size={18} color="white" style={styles.marginRight} />
                    <Text style={styles.toastTitle}> {text1} </Text>
                </View>

                <TouchableOpacity
                    style={[styles.approvalAction, styles.actionSuccess]}
                    onPress={props.onCheckPress} >
                    <Text style={styles.toastMessage}> {text2} </Text>
                    < Feather name="arrow-right" size={18} color="white" style={styles.marginLeft} />
                </TouchableOpacity>
            </View>
        ),
        // approval error
        approvalReject: ({ text1, text2, props }) => (
            <View style={[styles.approvalContainer, styles.approvalReject]} >
                <View style={styles.approvalMessage}>
                    <Feather name="info" size={18} color="white" style={styles.marginRight} />
                    <Text style={styles.toastTitle}> {text1} </Text>
                </View>

                <TouchableOpacity
                    style={[styles.approvalAction, styles.actionReject]}
                    onPress={props.onCheckPress} >
                    <Text style={styles.toastMessage}> {text2} </Text>
                    < Feather name="arrow-right" size={18} color="white" style={styles.marginLeft} />
                </TouchableOpacity>
            </View>
        ),
        // Info Toast
        infoToast: ({ text1 }) => (
            <View style={[styles.infoContainer]} >
                <Feather name="info" size={18} color="white" style={styles.marginRight} />
                <Text style={styles.toastMessage}> {text1} </Text>
            </View>
        ),
        // Success Toast
        successToast: ({ text1 }) => (
            <View style={[styles.successToastContainer]} >
                <Feather name="check-circle" size={18} color="white" style={styles.marginRight} />
                <Text style={styles.toastMessage}> {text1} </Text>
            </View>
        ),
        // Failed Toast
        failedToast: ({ text1 }) => (
            <View style={[styles.failedContainer]} >
                <Feather name="x-circle" size={18} color="white" style={styles.marginRight} />
                <Text style={styles.toastMessage}> {text1} </Text>
            </View>
        ),
    };


    return (
        <Toast config={toastConfig} />
    )
}


const styles = StyleSheet.create({
    toastContainer: {
        width: '90%',
        borderRadius: 8,
        padding: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    toastTop: {
        top: 50,
    },
    toastBottom: {
        bottom: 25,
    },
    successContainer: {
        backgroundColor: '#d4edda',
        borderLeftWidth: 6,
        borderLeftColor: '#28a745',
    },
    errorContainer: {
        backgroundColor: '#f8d7da',
        borderLeftWidth: 6,
        borderLeftColor: '#dc3545',
    },
    checkButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
    },
    checkText: {
        color: colors.white,
        fontWeight: 'bold',
    },
    // APPROVAL & REJECT
    approvalContainer: {
        width: '90%',
        borderRadius: 30,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
        bottom: 25,
        backgroundColor: colors.error,
        color: 'white',
    },
    approvalSuccess: {
        backgroundColor: colors.success,
    },
    approvalReject: {
        backgroundColor: colors.error,
    },
    approvalMessage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    marginRight: {
        marginRight: 10,
    },
    toastTitle: {
        ...textStyle.medium12,
        color: colors.white,
    },
    approvalAction: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: colors.deepRed,
    },
    actionSuccess: {
        backgroundColor: colors.deepGreen,
    },
    actionReject: {
        backgroundColor: colors.deepRed,
    },
    toastMessage: {
        ...textStyle.medium12,
        color: colors.white,
    },
    marginLeft: {
        marginLeft: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.info, // Set a background color for info
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 8,
        ...shadowStyles.popUpShadow2
    },
    successToastContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.success, // Set a background color for info
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 8,
        ...shadowStyles.popUpShadow2
    },
    failedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.error, // Set a background color for info
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 8,
        ...shadowStyles.popUpShadow2,
        zIndex: 9999,
    },
});

export default DefaultToast;