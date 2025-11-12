import { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignupPage() 
{
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        console.log("Form Submitted: ", { firstname, lastname, username, password});
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>

                <View style={styles.card}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your first name"
                        value={firstname}
                        onChangeText={setFirstname}
                    />
                    
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your last name"
                        value={lastname}
                        onChangeText={setLastname}
                    />

                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Choose a username"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Create a password"
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <View style={styles.buttonContainer}>
                        <Button title="Sign Up" onPress={handleSubmit} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#f9fafb',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
        color: '#111827',
        textAlign: 'center',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },

    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#374151',
    },

    input: {
        height: 44,
        borderColor: '#d1d5db',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
    },

    buttonContainer: {
        marginTop: 10
    },
});