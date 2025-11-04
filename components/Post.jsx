import { Bookmark, BookmarkCheck } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
export default function Post() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text>This is one post</Text>
        {isBookmarked ? (
          <Bookmark onPress={handleBookmark} />
        ) : (
          <BookmarkCheck onPress={handleBookmark} />
        )}
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
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    flex: 1,
    maxHeight: 100,
  },
});
