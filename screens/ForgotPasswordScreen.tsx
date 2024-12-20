import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../utils/axiosInstance';
import { ForgotPasswordScreenNavigationProp } from '../typeInterfaces/navigationTypes';
import { useSuccessModal } from '../context/SuccessModalProvider';
import { requestToUpdatePassword } from '../apis/ForgetPassword';
import { useErrorModal } from '../context/ErrorModalProvider';
import FullPageLoader from '../components/common/FullPageLoader';
import { colors } from '../utils/colors';

const ForgotPasswordScreen: React.FC = () => {
    const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
    const { showSuccess } = useSuccessModal();
    const { showError } = useErrorModal();

    const [loading, setLoading] = useState(false);

    const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({
        initialValues: {
            email: 'rashed.haider@nsl.com',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);

            const reqBody = {
                userName: values.email,
            };

            requestToUpdatePassword(reqBody).then((response) => {
                setLoading(false);
                if (response?.[0]) {
                    showSuccess('Password generated successfully and sent to mail', handleSuccessClose);
                } else {
                    showError(response?.[1]);
                }
            })
        },
    });

    const handleSuccessClose = () => {
        navigation.navigate('Login');
    };

    return (
        <>
            {loading &&
                <FullPageLoader visible={loading} />
            }

            <View style={styles.container}>
                <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors?.white} />
                    </TouchableOpacity>
                </LinearGradient>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Forgot password <Text style={styles.emoji}>🥺</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        Please enter your email address to request a password reset.
                    </Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="email" size={24} color={colors?.black} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor={colors?.black}
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                    </View>
                    {touched.email && errors.email && <Text style={styles.validationText}>{errors.email}</Text>}

                    {loading &&
                        <ActivityIndicator
                            size="large"
                            color={colors?.spinner}
                        />
                    }

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.rememberPassword}>Wait, I remember my password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} onPress={() => handleSubmit()} disabled={loading}>
                        <LinearGradient colors={[colors?.cardGradient?.[0], colors?.cardGradient?.[1]]} style={styles.button}>
                            <Text style={styles.buttonText}>Send Instructions</Text>
                        </LinearGradient>
                    </TouchableOpacity>


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
        height: '20%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    backButton: {
        marginTop: 40,
    },
    content: {
        position: 'absolute',
        top: '10%',
        flex: 1,
        width: '100%',
        height: '90%',
        backgroundColor: colors?.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
        paddingTop: 30,
        shadowColor: colors?.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4, // For Android
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
        color: colors?.black,
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors?.offWhite5,
        borderRadius: 8,
        backgroundColor: colors?.white,
        marginBottom: 16,
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
    rememberPassword: {
        fontSize: 14,
        color: colors?.info,
        textAlign: 'center',
        marginVertical: 16,
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
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: colors?.error,
        fontSize: 16,
        fontWeight: 'bold',
    },
    validationText: {
        color: colors?.error,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ForgotPasswordScreen;
