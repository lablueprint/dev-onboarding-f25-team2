import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const [firstName, setFirstName] = useState("Joe");
const [lastName, setLastName] = useState("Bruin");
const [username, setUsername] = useState("jbruin19");

export default function profilePage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Profile Page</Text>
      <Image
        source={require("../../assets/images/joebruin.webp")}
        style={styles.ProfilePic}
      />
      <View style={styles.Name}>
        <Text>{firstName}</Text>
        <Text> </Text>
        <Text>{lastName}</Text>
      </View>
      <Text>{username}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ProfilePic: { width: 100, height: 100 },
  Name: { flexDirection: "row" },
  container: { flex: 1, alignItems: "center", padding: 20 },
  PageHeader: { fontSize: 28 },
});
