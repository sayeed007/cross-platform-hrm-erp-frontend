// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { saveUserToStorage, User } from '../utils/storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type AuthStackParamList = {
    ForgotPassword: undefined;
    MainTabs: undefined;
};

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Replace with real authentication logic
        if (email && password) {
            const user: User = {
                id: '1', // Replace with real user ID
                name: 'John Doe', // Replace with real user name
                email,
            };

            await saveUserToStorage(user);
            navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
            <TextInput
                placeholder="Email"
                style={{ borderBottomWidth: 1, marginBottom: 16 }}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                style={{ borderBottomWidth: 1, marginBottom: 16 }}
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
            <Text onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
        </View>
    );
}
