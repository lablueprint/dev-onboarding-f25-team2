import AntDesign from '@expo/vector-icons/AntDesign';
import { Bookmark, BookmarkCheck, Heart } from "lucide-react-native";
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useRouter } from 'expo-router';

export default function Post({postTitle, postDescription, postComments}) {

  const router = useRouter();
  const [liked, setLiked] = useState(false);
  
  const handleOnPress = () => {
    setLiked(!liked);
  }

  const [newComment, setNewComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  useEffect(() => { // TODO: Placeholder since old documents do not support new Post schema containing the comments field.
    if(postComments)
      setAllComments(postComments.map((item, _) => item.commentText));
  },[postComments])
  
  const addComment = () => {
    if(newComment === ''){
      return;
    }
    setAllComments([...allComments, newComment]);
    setNewComment('');
    // TODO: POST request for comments
  }
  
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        <View style={styles.container}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/post/post-details',
                params: {
                  postTitle: postTitle ?? '',
                  postDescription: postDescription ?? '',
                  userName: "Temp User",
                  timeStamp: "Just now"
                }
              })
            }
          >
            <Text>This is one post</Text>
            <Text>{'\n'}{postTitle} {postDescription}</Text>
          </Pressable>

          <View style={styles.headerContainer}>
            {isBookmarked ? (
              <Bookmark onPress={handleBookmark} />
            ) : (
              <BookmarkCheck onPress={handleBookmark} />
            )}
            { liked ? <Heart onPress={handleOnPress} color="red" fill="red"/> 
                  : <Heart onPress={handleOnPress} color="red"/> }
          </View>
        </View>

        <Text>{'\n'}{postTitle} {postDescription}</Text>
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
    borderColor: 'black',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  commentsViewContainer: {
    borderWidth: 1,
    borderRadius: 2,
    width: 200+4+4+20, // textbox width + left and right textbox padding + comment icon width
    height: 100,
  },
  commentsViewHeader: {
    padding: 4,
    alignSelf: 'left',
  },
  commentsView: {
    fontSize: 16,
    padding: 4,
  },
  commentsAddWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
    paddingTop: 20,
  },
  commentsInput: {
    fontSize: 16,
    padding: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'black',
    width: 200,
  },
});
