import React, { useState } from "react";
import { StyleSheet, TextInput, Button, Text, View } from 'react-native';
import { KeyboardAvoidingView } from "react-native-web";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); 

    const handleSubmit = async (e) => {
        console.log("Title:", title);
        console.log("Description:", description);
    };

    return (
        <KeyboardAvoidingView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Create Post</Text>
    
            <Text style={styles.subtitle}>Title</Text>
            <TextInput
              style={[styles.input, { borderWidth: 1, borderColor: '#000', padding: 10, borderRadius: 5,height: 50 }]}
              value={title}
              onChangeText={setTitle}
            />
    
            <Text style={styles.subtitle}>Description</Text>
            <TextInput
              style={[styles.input, { borderWidth: 1, borderColor: '#000', padding: 10, borderRadius: 5,height: 100 }]}
              value={description}
              onChangeText={setDescription}
              multiline
            />
    
            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </View>
        </KeyboardAvoidingView>
      );
    }

app/example/example.jsx