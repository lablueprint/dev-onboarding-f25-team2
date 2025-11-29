import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Post from "../../components/Post";

const url = "http://localhost:4000";
// TODO: Replace with actual current user ID from authentication
const currentUserID = "Temp User";

export default function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  const fetchSavedPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${url}/api/saves/${currentUserID}`);

      // Extract the post data from each save object
      // The API returns saves with populated postID objects
      const posts = response.data.map((save) => save.postID).filter(Boolean);
      console.log(posts);
      setSavedPosts(posts);
    } catch (error) {
      console.error("Error fetching saved posts:", error);
      setError("Failed to load saved posts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Saved Posts</Text>

        {loading && <Text style={styles.message}>Loading saved posts...</Text>}

        {error && <Text style={styles.error}>{error}</Text>}

        {!loading && !error && savedPosts.length === 0 && (
          <Text style={styles.message}>No saved posts yet.</Text>
        )}

        {!loading &&
          !error &&
          savedPosts.length > 0 &&
          savedPosts.map((post) => (
            <Post
              key={post._id}
              postTitle={post.title}
              postDescription={post.description}
              postId={post._id}
              userName={post.userID || "Unknown User"}
              timeStamp={post.createdAt}
              currentUsername={currentUserID}
            />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  error: {
    fontSize: 16,
    color: "#d32f2f",
    marginTop: 20,
  },
});
