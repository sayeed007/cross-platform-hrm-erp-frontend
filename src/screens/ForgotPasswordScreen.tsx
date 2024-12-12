// src/screens/ForgotPasswordScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');

    const handleReset = () => {
        // Handle password reset logic here
        alert(`Password reset link sent to ${email}`);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
            <Text>Enter your email to reset password</Text>
            <TextInput
                placeholder="Email"
                style={{ borderBottomWidth: 1, marginBottom: 16 }}
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Send Reset Link" onPress={handleReset} />
        </View>
    );
}
