import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Post() {
  const [saved, setSaved] = useState(false);
  
  const handleOnPress = () => {
    setSaved(!saved);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
              <Text>This is one post</Text>
              <Pressable onPress={handleOnPress}>
              { saved ? <FontAwesome name="bookmark" size={24} color="black"/> 
                    : <Feather name="bookmark" size={24} color="black"/> }
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
