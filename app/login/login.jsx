import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log("Username:", username);
    console.log("Password:", password);
  }

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login Page</Text>

      <Text>Username:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: "gray", padding: 10, marginBottom: 20 }}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
      />

      <Text>Password:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: "gray", padding: 10, marginBottom: 20 }}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />

      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}
