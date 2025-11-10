import React, { useState } from "react";
import { ScrollView, Text, TextInput, View, Button } from "react-native";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log("Title:", title);
    console.log("Description:", description);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View>
        <Text>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter your title"
        />

        <Text>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter your description"
          multiline
          numberOfLines={4}
        />

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}