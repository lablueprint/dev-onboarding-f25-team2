import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from "react";
import Post from "../../components/Post";
import axios from 'axios';

export default function LikedPosts() {
    const [likedPosts, setLikedPosts] = useState([]);
    const url = 'http://localhost:4000'
    const userId = 1;

    useEffect(() => {
        async function loadLikedPosts() {
          try {
            const response = await axios.get(`${url}/api/likedPosts/getLikedPosts/${userId}`)
            setLikedPosts(response.data);
            console.log(response.data);
          } catch {
            setLikedPosts([]);
            console.log("No liked posts to display");
          }
        }
        loadLikedPosts();
    }, []);
    
    return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
        {
            likedPosts.map((post) => (
                  <Post
                    key={post.title}
                    postTitle={post.title}
                    postDescription={post.description}
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