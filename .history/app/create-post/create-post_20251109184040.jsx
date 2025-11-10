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
              style={[styles.input, { borderWidth: 1, borderColor: '#000', padding: 10, borderRadius: 5,height: 100 }]}
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
  headerImage: {
    width: '100%',
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
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
    marginBottom: 20,
  },
  step: {
    fontSize: 16,
    marginBottom: 12,
    color: '#374151',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});
