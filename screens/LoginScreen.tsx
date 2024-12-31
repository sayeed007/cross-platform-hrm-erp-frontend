import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { getUserAdditionalAccessibility, getUserInfo, userLogIn } from '../apis/LogIn';
import FullPageLoader from '../components/modals/FullPageLoader';
import { useErrorModal } from '../context/ErrorModalProvider';
import { useSuccessModal } from '../context/SuccessModalProvider';
import { useUser } from '../context/UserContext';
import { LoginScreenNavigationProp } from '../typeInterfaces/navigationTypes';
import { colors } from '../utils/colors';
import { textStyle } from '../utils/textStyle';
import { User } from '../typeInterfaces/User';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { showSuccess } = useSuccessModal();
    const { showError } = useErrorModal();
    const { setUser } = useUser();

    const [isChecked, setIsChecked] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({
        initialValues: {
            // PRODUCTION
            // username: "sayeed.bappy@neural-semiconductor.com",
            // password: "SHB987654321.",
            // DEMO
            username: "200024",
            password: "123456",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);

            userLogIn(values?.username, values?.password).then((response) => {
                setLoading(false);
                if (response?.[0]) {
                    showSuccess('Log in is successful, taking you to dashboard.', () => handleSuccessClose(response?.[0]));
                } else {
                    showError(response?.[1]);
                }
            })
        },
    });

    const handleSuccessClose = (userInfo: User) => {
        getUserInfo(userInfo?.employeeId, userInfo?.accessToken).then(employeeInfoResponse => {
            if (employeeInfoResponse?.[0]) {
                getUserAdditionalAccessibility(userInfo?.employeeId, userInfo?.
                    accessToken).then(additionalAccessibilityResponse => {
                        if (additionalAccessibilityResponse?.[0]) {
                            setUser({
                                ...userInfo,
                                employeeInfo: { ...employeeInfoResponse?.[0] },
                                additionalAccessibility: { ...additionalAccessibilityResponse?.[0] }
                            });
                        } else {
                            showError(additionalAccessibilityResponse?.[1]);
                        }
                    })
            } else {
                showError(employeeInfoResponse?.[1]);
            }
        })
    };


    return (

        <>
            {loading &&
                <FullPageLoader visible={loading} />
            }

            <View style={styles.container}>

                {/* Header Section */}
                <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.header}>
                    <Image
                        source={require('../assets/images/Tafuri-HRMS-Logo-On-Blue.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </LinearGradient>

                {/* Shadow Wrapper */}
                <View style={styles.shadowWrapper}>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            Welcome Back <Text style={styles.emoji}>👋</Text>
                        </Text>
                        <Text style={styles.subtitle}>
                            Happy to see you again! To use your account, sign in first.
                        </Text>

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="email" size={24} color={colors?.black} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor={colors?.black}
                                keyboardType="email-address"
                                value={values?.username}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                            />
                        </View>
                        {touched.username && errors.username && <Text style={styles.validationText}>{errors.username}</Text>}


                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            {/* Lock Icon */}
                            <MaterialIcons name="lock" size={24} color={colors?.black} style={styles.icon} />

                            {/* Password TextInput */}
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor={colors?.black}
                                secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry based on visibility
                                value={values?.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />

                            {/* Visibility Toggle Icon */}
                            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <MaterialIcons
                                    name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                                    size={24}
                                    color={colors?.black}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password && <Text style={styles.validationText}>{errors.password}</Text>}


                        {/* Remember Me and Forgot Password */}
                        <View style={styles.optionsContainer}>
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    value={isChecked}
                                    onValueChange={setIsChecked}
                                    color={isChecked ? colors?.info : undefined}
                                />
                                <Text style={styles.checkboxLabel}>Remember me</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text style={styles.forgotPassword}>Forgot password</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Sign In Button */}
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleSubmit()}>
                            <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.button}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors?.white,
        position: 'relative',
    },
    header: {
        height: '35%', // Increased height for better proportion
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    logo: {
        width: '60%',
        height: '50%',
    },
    shadowWrapper: {
        position: 'absolute',
        top: '25%',
        width: '100%',
        height: '70%',

        // Shadow for iOS
        shadowColor: colors?.black,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,

        // Elevation for Android
        elevation: 10,
    },
    content: {
        flex: 1,
        width: '100%',
        backgroundColor: colors?.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        ...textStyle?.bold24,
        textAlign: 'center',
        marginBottom: 8,
    },
    emoji: {
        ...textStyle?.regular24,
    },
    subtitle: {
        ...textStyle?.regular14,
        textAlign: 'center',
        color: colors?.black,
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors?.offWhite5,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: colors?.white,
    },
    icon: {
        marginHorizontal: 8,
    },
    input: {
        flex: 1,
        height: 50,
        ...textStyle?.regular16,
        padding: 5,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        ...textStyle?.regular14,
        color: colors?.black,
        marginLeft: 8,
    },
    forgotPassword: {
        ...textStyle?.regular14,
        color: colors?.info,
        textDecorationLine: 'underline',
    },
    buttonContainer: {
        marginTop: 16,
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: colors?.white,
        ...textStyle?.bold16,
    },
    validationText: {
        color: colors?.error,
        ...textStyle?.bold16,
    },
});


export default LoginScreen;
