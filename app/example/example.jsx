import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import axios from 'axios';

const url = 'http://localhost:4000'
const tempPost = '6912849925e22dd1342d0eaf';

export default function Example() {
  const [example, setExample] = useState({});

  const getExample = async () => {
    try {
      const response = await axios.get(`${url}/api/posts/${tempPost}`);
      setExample(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error getting example", error);
      return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image 
          source={require('../../assets/images/blueprint.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          Use this page as an example on how to create and navigate between pages!
        </Text>

        <View style={styles.card}>
          <Text style={styles.step}>1. Create a new folder inside the /app directory with the name for your page.</Text>
          <Text style={styles.step}>2. Inside that folder, create a new .jsx file. This file will contain your page component.</Text>
          <Text style={styles.step}>3. Build your page using React Native components such as ScrollView, View, Text, Image, and Button.</Text>
          <Text style={styles.step}>4. Style your components using StyleSheet.create() for organized and reusable styles.</Text>
          <Text style={styles.step}>5. To add a bottom tab bar, add it to the _layout.jsx file.</Text>
          <Text style={styles.step}>6. Use the useRouter hook from expo-router to navigate between pages programmatically.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.step}>Let's experiment with the backend!</Text>
          <Text style={styles.step}>1. Start the backend server by cd-ing into the backend (cd backend)</Text>
          <Text style={styles.step}>2. Run nodemon server.js to start the development server</Text>
          <Button
            title="Get Example Post"
            onPress={() => getExample()}
          />
          {example && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.step}>Example Post:</Text>
              <Text style={styles.step}>Title: {example.title}</Text>
              <Text style={styles.step}>Description: {example.description}</Text>
              <Text style={styles.step}>User ID: {example.userID}</Text>
            </View>
          )}
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
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  headerImage: {
    width: '100%',
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  step: {
    fontSize: 16,
    marginBottom: 12,
    color: '#374151',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});
