import axios from "axios";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const url = "http://localhost:4000";

export default function profilePage() {
  const [text, setText] = useState("jbruin19");
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getProfile();
  }, []); // only runs again if any of the dependencies change, but there are none

  const getProfile = async () => {
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
      {editMode ? (
        <TextInput></TextInput>
      ) : (
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          {userData.username}
        </Text>
      )}
      {/* Source only accepts uri object*/}
      <Image
        source={
          userData.imgURL
            ? { uri: userData.imgURL }
            : require("../../assets/images/blankprofile.png")
        }
        style={styles.ProfilePic}
      />
      <View style={styles.Name}>
        <Text style={styles.nameText}>{userData.firstName}</Text>
        <Text> </Text>
        <Text style={styles.nameText}>{userData.lastName}</Text>
      </View>

      <View style={styles.searchbox}>
        <TextInput
          name="userquery"
          style={styles.input}
          onChangeText={setText}
          placeholder="Enter your username"
          value={text}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
        ></TextInput>
        <TouchableOpacity
          onPress={getProfile}
          style={{
            backgroundColor: "rgb(39 116 174)",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            borderRadius: 5,
            marginLeft: 5,
          }}
        >
          <Text style={{ color: "white" }}>Search</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ProfilePic: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2, // width divided by 2
    borderWidth: 5,
    borderColor: "rgb(39 116 174)",
    marginTop: 17,
    marginBottom: 13,
  },
  searchbox: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  nameText: { fontSize: 20, marginBottom: 20 },
  Name: { flexDirection: "row" },
  container: { flex: 1, alignItems: "center", padding: 20 },
  PageHeader: { fontSize: 28 },
  input: {
    width: 230,
    height: 40,
    padding: 5,
    borderWidth: 2,
    borderColor: "rgb(39 116 174)",
  },
});
