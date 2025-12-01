import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

// NOTE: useLocalSearchParams hook: This hook is used within a screen component to access the parameters specific to that route.
import { useLocalSearchParams, useRouter } from 'expo-router';

const API_URL = 'http://localhost:4000/api/posts';

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

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
      // Only update state if the post ID changes to avoid overwriting user edits on re-renders
      if (params.postId && params.postId !== postId) {
        setPostTitle(typeof params.postTitle === 'string' ? params.postTitle : '');
        setPostDescription(typeof params.postDescription === 'string' ? params.postDescription : '');
        setUserName(typeof params.userName === 'string' ? params.userName : '');
        setTimeStamp(typeof params.timeStamp === 'string' ? params.timeStamp : '');
        setPostId(typeof params.postId === 'string' ? params.postId : '');
        
        setEditTitle(typeof params.postTitle === 'string' ? params.postTitle : '');
        setEditDescription(typeof params.postDescription === 'string' ? params.postDescription : '');
      }
    }, [params, postId]);

    const isOwner = userName === currentUsername;

    const handleEdit = () => {
        setIsEditing(true);
        setEditTitle(postTitle);
        setEditDescription(postDescription);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditTitle(postTitle);
        setEditDescription(postDescription);
    };

    const handleSave = async () => {
        if (!postId) {
            Alert.alert('Error', 'Missing post ID.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: editTitle,
                    description: editDescription,
                }),
            });

            if (response.ok) {
                setPostTitle(editTitle);
                setPostDescription(editDescription);
                setIsEditing(false);
                Alert.alert('Success', 'Post updated successfully!');
                return;
            }

            // Non-OK responses: optionally parse JSON error or fallback to text
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                const json = await response.json();
                Alert.alert('Error', json.error || 'Failed to update post');
            } else {
                const text = await response.text();
                Alert.alert(
                    'Error',
                    `Failed to update post (Status: ${response.status}). Response: ${text}`,
                );
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
        }
    };

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
                const res = await fetch(`${API_URL}/${postId}`, {
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
        {isEditing ? (
            <TextInput
                style={styles.input}
                value={editTitle}
                onChangeText={setEditTitle}
            />
        ) : (
            <Text style={styles.subtitle}>{postTitle}</Text>
        )}

        <Text>Post Description</Text>
        {isEditing ? (
            <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                value={editDescription}
                onChangeText={setEditDescription}
                multiline
            />
        ) : (
            <Text style={styles.subtitle}>{postDescription}</Text>
        )}

        <Text>Username</Text>
        <Text style={styles.subtitle}>{userName}</Text>

        <Text>Time Stamp</Text>
        <Text style={styles.subtitle}>{formattedTimeStamp}</Text>

        {isOwner && (
          <View style={styles.buttonContainer}>
            <Button title="Delete" onPress={handleDelete} />
            {isEditing ? (
                <>
                    <Button title="Save" onPress={handleSave} />
                    <Button title="Cancel" onPress={handleCancelEdit} color="red" />
                </>
            ) : (
                <Button title="Edit" onPress={handleEdit} />
            )}
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
  input: {
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});
