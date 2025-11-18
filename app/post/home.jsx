import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Post from '../../components/Post';

export default function PostHome() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('http://localhost:4000/api/posts');
      const result = await response.json();
      setPosts(result);
    }

    fetchPosts();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <Text>Post Home Page</Text>
            {posts.map((post) => (
              <Post
                key={post._id}
                postTitle={post.title}
                postDescription={post.description}
              />
            ))}
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
  }
});