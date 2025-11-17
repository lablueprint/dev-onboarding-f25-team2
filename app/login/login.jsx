import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleLogin() {
    console.log("Username:", username);
    console.log("Password:", password);
    router.replace("/");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login Page</Text>

      <Text>Username:</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
      />

      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}
