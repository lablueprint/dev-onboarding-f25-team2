import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

// NOTE: useLocalSearchParams hook: This hook is used within a screen component to access the parameters specific to that route.
import { useLocalSearchParams } from 'expo-router';

export default function PostDetails() {

    const params = useLocalSearchParams();

    // REMINDER TO UPDATE LATER!! TEMP VARIABLE FOR CURRENT USERNAME
    const currentUsername = 'Temp User';

    // Initialize state directly from params 
    const [postTitle, setPostTitle] = useState(typeof params.postTitle === 'string' ? params.postTitle : '');
    const [postDescription, setPostDescription] = useState(typeof params.postDescription === 'string' ? params.postDescription : '');
    const [userName, setUserName] = useState(typeof params.userName === 'string' ? params.userName : '');
    const [timeStamp, setTimeStamp] = useState(typeof params.timeStamp === 'string' ? params.timeStamp : '');

    useEffect(() => {
      //updates state when route params change so component re-renders!!!
      setPostTitle(typeof params.postTitle === 'string' ? params.postTitle : '');
      setPostDescription(typeof params.postDescription === 'string' ? params.postDescription : '');
      setUserName(typeof params.userName === 'string' ? params.userName : '');
      setTimeStamp(typeof params.timeStamp === 'string' ? params.timeStamp : '');
    }, [params]);

    const isOwner = userName === currentUsername;

  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

        {/* Text to display “Post Title, “Post Description”, and “Username” */}
        <Text style={styles.title}>Post Details</Text>

        <Text>Post Title</Text>
        <Text style={styles.subtitle}>{postTitle}</Text>

        <Text>Post Description</Text>
        <Text style={styles.subtitle}>{postDescription}</Text>

        <Text>Username</Text>
        <Text style={styles.subtitle}>{userName}</Text>

        <Text>Time Stamp</Text>
        <Text style={styles.subtitle}>{timeStamp}</Text>

        {isOwner && (
          <View style={styles.buttonContainer}>
            <Button title="Delete" onPress={() => console.log('delete')} />
            <Button title="Edit" onPress={() => console.log('edit')} />
            <Button title="Save" onPress={() => console.log('save')} />
          </View>
        )}

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
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});
