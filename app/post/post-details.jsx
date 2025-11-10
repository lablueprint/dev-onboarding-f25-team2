import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


export default function PostDetails() {

    // Use useState to create a post title, post description, user name, and timestamp state
    const [postTitle, setPostTitle] = useState();
    const [postDescription, setPostDescription] = useState();
    const [userName, setUserName] = useState();
    const [timeStamp, setTimeStamp] = useState();

  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

        {/* Text to display “Post Title, “Post Description”, and “Username” */}
        <Text style={styles.title}>Post Details</Text>

        <Text style={styles.subtitle}>Post Title</Text>
        <Text>{postTitle}</Text>

        <Text style={styles.subtitle}>Post Description</Text>
        <Text>{postDescription}</Text>

        <Text style={styles.subtitle}>Username</Text>
        <Text>{userName}</Text>

        </View>

    </ScrollView>
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
});
