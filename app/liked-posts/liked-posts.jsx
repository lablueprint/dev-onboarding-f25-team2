import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from 'react-native';
import Post from "../../components/Post";

export default function LikedPosts() {
    const [likedPosts, setLikedPosts] = useState([]);
    const url = 'http://localhost:4000'

    useFocusEffect(
      React.useCallback(() => {
        let isActive = true;

        async function loadLikedPosts() {
          try {
            const response = await axios.get(`${url}/api/likedPosts/getLikedPosts`)

            if (isActive) {
              setLikedPosts(response.data);
            }
          } catch {
            if (isActive) {
              setLikedPosts([]);
            }
          }
        }
        loadLikedPosts();

        return () => {
          isActive = false;
        };
      }, [])
    );

    
    return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
        {
            likedPosts.map((post) => (
                  <Post
                    key={post.title}
                    postTitle={post.title}
                    postDescription={post.description}
                    postId={post.postId}
                    userName=''
                    timeStamp=''
                    currentUsername='Temp User'
                  />          
            ))
        }
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