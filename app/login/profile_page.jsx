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
const profileID = "691be86d4ec892b242608c20"; // needs to be connected to log in

export default function profilePage() {
  const [usernameInput, setUsernameInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getProfile();
  }, []); // only runs again if any of the dependencies change, but there are no dependencies

  const editProfile = async () => {
    try {
      // build payload, falling back to existing userData values when an input is blank
      const payload = {
        username: usernameInput || userData.username,
        firstName: firstNameInput || userData.firstName,
        lastName: lastNameInput || userData.lastName,
      };

      const response = await axios.post(
        `${url}/api/profiles/${userData.username}`,
        payload
      );
      setUserData(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error editing profile", error);
      return null;
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(`${url}/api/profiles/id/${profileID}`);
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
        <TextInput
          style={{
            fontSize: 30,
            fontWeight: "bold",
            height: 50,
            width: 245,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 5,
            borderWidth: 2,
            borderColor: "rgb(39 116 174)",
            borderRadius: 10,
          }}
          placeholder={"Enter username"}
          defaultValue={userData.username}
          onChangeText={setUsernameInput}
        />
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

      {editMode ? (
        <View style={styles.Name}>
          <TextInput
            style={{
              fontSize: 20,
              height: 40,
              width: 160,
              padding: 5,
              borderWidth: 2,
              borderColor: "rgb(39 116 174)",
              marginRight: 10,
              borderRadius: 10,
            }}
            placeholder={"Enter first name"}
            defaultValue={userData.firstName}
            onChangeText={setFirstNameInput}
          />
          <TextInput
            style={{
              fontSize: 20,
              height: 40,
              width: 160,
              padding: 5,
              borderWidth: 2,
              borderColor: "rgb(39 116 174)",
              borderRadius: 10,
            }}
            placeholder={"Enter last name"}
            defaultValue={userData.lastName}
            onChangeText={setLastNameInput}
          />
        </View>
      ) : (
        <View style={styles.Name}>
          <Text style={styles.nameText}>{userData.firstName}</Text>
          <Text> </Text>
          <Text style={styles.nameText}>{userData.lastName}</Text>
        </View>
      )}

      <View style={styles.searchbox}>
        {editMode ? (
          <TouchableOpacity
            onPress={async () => {
              await editProfile();
              setEditMode(false);
            }}
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
            <Text style={{ color: "white" }}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setEditMode(true)}
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
            <Text style={{ color: "white" }}>Edit</Text>
          </TouchableOpacity>
        )}
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
