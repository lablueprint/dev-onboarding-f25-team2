import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Bookmark, BookmarkCheck } from "lucide-react-native";

export default function Post() {
  const [liked, setLiked] = useState(false);
  
  const handleOnPress = () => {
    setLiked(!liked);
  }

  const [newComment, setNewComment] = useState('');
  const [allComments, setAllComments] = useState([]);

  const addComment = () => {
    if(newComment === ''){
      return;
    }
    setAllComments([...allComments, newComment]);
    setNewComment('');
  }
  
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
          <View style={styles.headerContainer}>
          <Text>This is one post</Text>
            {isBookmarked ? (
              <Bookmark onPress={handleBookmark} />
            ) : (
              <BookmarkCheck onPress={handleBookmark} />
            )}
            <Pressable onPress={handleOnPress}>
            { liked ? <FontAwesome name="heart" size={24} color="black"/> 
                  : <FontAwesome name="heart-o" size={24} color="black"/> }
            </Pressable>
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
                              {backgroundColor: id%2==0 ? 'lightgrey' : '#f9fafb'},
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
    alignItems: 'space-between',
    justifyContent: 'center'
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
