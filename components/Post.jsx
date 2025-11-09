import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Post() {
  const [newComment, setNewComment] = useState('');
  const [allComments, setAllComments] = useState([]);

  const addComment = () => {
    if(newComment === ''){
      return;
    }
    setAllComments([...allComments, newComment]);
    setNewComment('');
  }
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <Text>This is one post</Text>
            <View style={styles.commentsWrapper}>
              <TextInput
                style={styles.comment}
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
    backgroundColor: '#f9fafb',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  commentsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
    paddingTop: 20,
  },
  comment: {
    fontSize: 16,
    padding: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    width: 200,
  },
});
