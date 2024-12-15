import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from './navigationTypes';
import FullPageLoader from '../components/common/FullPageLoader';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUserAdditionalAccessibility, getUserInfo, userLogIn } from '../apis/LogIn';
import { useSuccessModal } from '../context/SuccessModalProvider';
import { useErrorModal } from '../context/ErrorModalProvider';
import { User, useUser } from '../context/UserContext';

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
            username: "200014",
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
        console.log('successFully login');

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
                <LinearGradient colors={['#1488CC', '#2B32B2']} style={styles.header}>
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
                            <MaterialIcons name="email" size={24} color="#888" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#888"
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
                            <MaterialIcons name="lock" size={24} color="#888" style={styles.icon} />

                            {/* Password TextInput */}
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#888"
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
                                    color="#888"
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
                                    color={isChecked ? '#007BFF' : undefined}
                                />
                                <Text style={styles.checkboxLabel}>Remember me</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text style={styles.forgotPassword}>Forgot password</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Sign In Button */}
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleSubmit()}>
                            <LinearGradient colors={['#1488CC', '#2B32B2']} style={styles.button}>
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
        backgroundColor: '#fff',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,

        // Elevation for Android
        elevation: 10,
    },
    content: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    emoji: {
        fontSize: 24,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#888',
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
    },
    icon: {
        marginHorizontal: 8,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
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
        fontSize: 14,
        color: '#444',
        marginLeft: 8,
    },
    forgotPassword: {
        fontSize: 14,
        color: '#007BFF',
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
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    validationText: {
        color: '#DA5850',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default LoginScreen;
