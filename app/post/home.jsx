import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Post from '../../components/Post';

export default function PostHome() {
  // example posts for retrieval
  const posts = [
    { id: 1, title: "e.g. First hardcode post", description: "This is the description of the first post (hardcoded e.g.)."},
    { id: 2, title: "e.g. Second hardcode post", description: "This is the description of the second post (hardcoded e.g.)."},
  ]; 

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <Text>Post Home Page</Text>

            {posts.map((post) => (
              <Post
                key={post.id}
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