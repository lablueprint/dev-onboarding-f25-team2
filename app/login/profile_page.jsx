import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const [firstName, setFirstName] = useState("Joe");
const [lastName, setLastName] = useState("Bruin");
const [username, setUsername] = useState("jbruin19");

export default function profilePage() {
  return (
    <View>
      <Text>Profile Page</Text>
      <Image
        source={require("../../assets/images/joebruin.webp")}
        style={styles.ProfilePic}
      ></Image>
      <div className="name">
        <Text>{firstName}</Text>
        <Text>{lastName}</Text>
      </div>
      <Text>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ProfilePic: { width: 100, height: 100 },
});
