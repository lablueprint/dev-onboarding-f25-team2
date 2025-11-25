import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import { Bookmark, BookmarkCheck, Heart } from "lucide-react-native";
import { useState, useEffect } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import axios from 'axios';
const url = "http://localhost:4000";

export default function Post({postTitle, postDescription, postId, userName, timeStamp, currentUsername}) {
  const url = 'http://localhost:4000'

export default function Post({
  postTitle,
  postDescription,
  postId,
  userName,
  timeStamp,
  currentUsername,
}) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkIsLiked = async () => {
      try {
        await axios.get(`${url}/api/likedPosts/isLiked/${postId}`);
        setLiked(true);
      } catch {
        setLiked(false);
      }
    }
    checkIsLiked();
  }, [liked, postId]);

  const handleLike = async () => {
    const likeData = {
      "postId": postId,
      "title": postTitle,
      "description": postDescription,
    }

    const unlikeData = {
      "postId": postId
    }

    if(liked) {
      await axios.post(`${url}/api/likedPosts/unlikePost`, unlikeData);
    } else {
      await axios.post(`${url}/api/likedPosts/likePost`, likeData);
    }
    setLiked(!liked);
  };

  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const addComment = () => {
    if (newComment === "") {
      return;
    }
    setAllComments([...allComments, newComment]);
    setNewComment("");
  };

  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = async () => {
    const previousState = isBookmarked;
    const newState = !previousState;

    // Optimistically update UI
    setIsBookmarked(newState);

    try {
      if (newState) {
        // Save the post
        await axios.post(`${url}/api/saves`, {
          userID: currentUsername ?? "Temp User",
          postID: postId,
        });
      } else {
        // Unsave the post
        await axios.delete(`${url}/api/saves`, {
          data: {
            userID: currentUsername ?? "Temp User",
            postID: postId,
          },
        });
      }
    } catch (error) {
      // Revert UI state on error
      setIsBookmarked(previousState);
      console.error("Error saving/unsaving post:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        <View style={styles.container}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/post/post-details",
                params: {
                  postTitle: postTitle ?? "",
                  postDescription: postDescription ?? "",
                  userName: userName ?? "",
                  timeStamp: timeStamp ?? "",
                  postId: postId ?? "",
                  currentUsername: currentUsername ?? "Temp User",
                },
              })
            }
          >
            <Text>
              {"\n"}
              {postTitle}{'\n'}{postDescription}
            </Text>
          </Pressable>

          <View style={styles.headerContainer}>
            {isBookmarked ? (
              <BookmarkCheck onPress={handleBookmark} />
            ) : (
              <Bookmark onPress={handleBookmark} />
            )}
            {liked ? (
              <Heart onPress={handleOnPress} color="red" fill="red" />
            ) : (
              <Heart onPress={handleOnPress} color="red" />
            )}
            { liked ? <Heart onPress={handleLike} color="red" fill="red"/> 
                  : <Heart onPress={handleLike} color="red"/> }
          </View>

          {allComments && allComments.length > 0 && 
            <>
              <Text style={styles.commentsViewHeader}>Comments:</Text>
              <View style={styles.commentsViewContainer}>
                <ScrollView>
                    {allComments.map((comment, id) => {
                      return(
                        <Text
                          key={`comment_${id}`}
                          style={[
                            styles.commentsView,
                            {backgroundColor: id%2===0 ? 'lightgrey' : '#f9fafb'},
                            {backgroundColor: id%2===0 ? 'lightgrey' : '#f9fafb'},
                          ]}
                        >
                          {comment}
                        </Text>
                      )
                    })}
                </ScrollView>
              </View>
            </>
          }
          <View style={styles.commentsAddWrapper}>
            <TextInput
              style={styles.commentsInput}
              placeholder="Enter a comment"
              value={newComment}
              onChangeText={setNewComment}
            />
            <AntDesign
              name="comment"
              size={20}
              color="black"
              onPress={addComment}
            />
          </View>
        </View>
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
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  commentsViewContainer: {
    borderWidth: 1,
    borderRadius: 2,
    width: 200 + 4 + 4 + 20, // textbox width + left and right textbox padding + comment icon width
    height: 100,
  },
  commentsViewHeader: {
    padding: 4,
    alignSelf: "left",
  },
  commentsView: {
    fontSize: 16,
    padding: 4,
  },
  commentsAddWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
    paddingTop: 20,
  },
  commentsInput: {
    fontSize: 16,
    padding: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "black",
    width: 200,
  },
});
