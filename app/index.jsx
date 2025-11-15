import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Landing() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Blueprint!</Text>
      <Button
        title="Go to Example Page"
        onPress={() => router.push("/example/example")}
      />
      <Button
        title="Go to Post Home Page"
        onPress={() => router.push("/post/home")}
      />
      <Button
        title="Go to Profile Page"
        onPress={() => router.push("/login/profile_page")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
