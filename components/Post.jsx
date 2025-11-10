import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Post() {
  const [liked, setLiked] = useState(false);
  
  const handleOnPress = () => {
    setLiked(!liked);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
              <Text>This is one post</Text>
              <Pressable onPress={handleOnPress}>
              { liked ? <FontAwesome name="heart" size={24} color="black"/> 
                    : <FontAwesome name="heart-o" size={24} color="black"/> }
              </Pressable>
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
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'space-between',
    justifyContent: 'center'
  }
});
