import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

// NOTE: useLocalSearchParams hook: This hook is used within a screen component to access the parameters specific to that route.
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function PostDetails() {

    const params = useLocalSearchParams();
    const router = useRouter();

    // Make currentUsername same for testing!!!! UPDATE LATER!!
    const currentUsername = 'Temp User';

    // Initialize state directly from params 
    const [postTitle, setPostTitle] = useState(typeof params.postTitle === 'string' ? params.postTitle : '');
    const [postDescription, setPostDescription] = useState(typeof params.postDescription === 'string' ? params.postDescription : '');
    const [userName, setUserName] = useState(typeof params.userName === 'string' ? params.userName : '');
    const [timeStamp, setTimeStamp] = useState(typeof params.timeStamp === 'string' ? params.timeStamp : '');
    const [postId, setPostId] = useState(typeof params.postId === 'string' ? params.postId : '');

    useEffect(() => {
      //updates state when route params change so component re-renders!!!
      setPostTitle(typeof params.postTitle === 'string' ? params.postTitle : '');
      setPostDescription(typeof params.postDescription === 'string' ? params.postDescription : '');
      setUserName(typeof params.userName === 'string' ? params.userName : '');
      setTimeStamp(typeof params.timeStamp === 'string' ? params.timeStamp : '');
      setPostId(typeof params.postId === 'string' ? params.postId : '');
    }, [params]);

    const isOwner = userName === currentUsername;

    const handleDelete = () => {
      if (!postId) {
        Alert.alert('Error', 'Missing post ID.');
        return;
      }

      Alert.alert(
        'Delete Post',
        'Are you sure you want to delete this post? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                const res = await fetch(`http://localhost:4000/api/posts/${postId}`, {
                  method: 'DELETE',
                });

                if (!res.ok) {
                  const err = await res.json().catch(() => ({}));
                  throw new Error(err.error || 'Failed to delete post');
                }

                // Optionally notify and go back
                Alert.alert('Deleted', 'Post has been deleted.', [
                  { text: 'OK', onPress: () => router.back() }
                ]);
              } catch (e) {
                Alert.alert('Error', e.message || 'Something went wrong.');
              }
            },
          },
        ]
      );
    };

    // Googled how to Format timestamp into a readable string (e.g., "Nov 24, 2025, 3:14 PM")
    const formatTimestamp = (ts) => {
      if (!ts) return '';
      const d = new Date(ts);
      if (isNaN(d.getTime())) return ts; // if its not a date, return as it alr is
      return d.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    };

    const formattedTimeStamp = formatTimestamp(timeStamp);

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
        <Text style={styles.subtitle}>{formattedTimeStamp}</Text>

        {isOwner && (
          <View style={styles.buttonContainer}>
            <Button title="Delete" onPress={handleDelete} />
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
