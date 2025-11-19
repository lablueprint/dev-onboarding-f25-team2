import axios from "axios";
import { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const url = "http://localhost:4000";

export default function profilePage() {
  const [text, setText] = useState("");
  const [userData, setUserData] = useState({
    firstName: "Joe",
    lastName: "Bruin",
    username: "jbruin19",
  });

  const getProfile = async () => {
    console.log("I was clicked!");
    try {
      const response = await axios.get(`${url}/api/profiles/${text}`);
      setUserData(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error getting profile", error);
      return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Profile Page</Text>
      <Image
        source={require("../../assets/images/joebruin.webp")}
        style={styles.ProfilePic}
      />
      <View style={styles.Name}>
        <Text>{userData.firstName}</Text>
        <Text> </Text>
        <Text>{userData.lastName}</Text>
      </View>
      <Text>{userData.username}</Text>
      <View>
        <TextInput
          name="userquery"
          style={styles.input}
          onChangeText={setText}
          placeholder="Enter your username"
          value={text}
          autoCapitalize="none"
        ></TextInput>
        <Button title="Search" onPress={() => getProfile()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ProfilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "rgb(39 116 174)",
  },
  Name: { flexDirection: "row" },
  container: { flex: 1, alignItems: "center", padding: 20 },
  PageHeader: { fontSize: 28 },
  input: {
    marginTop: 20,
    width: 200,
    padding: 5,
    borderWidth: 2,
    borderColor: "rgb(39 116 174)",
  },
});
