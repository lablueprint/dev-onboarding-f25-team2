import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function Example() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image 
          source={require('../../assets/images/blueprint.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          Use this page as an example on how to create and navigate between pages!!!!
        </Text>

        <View style={styles.card}>
          <Text style={styles.step}>1. Create a new folder inside the /app directory with the name for your page.</Text>
          <Text style={styles.step}>2. Inside that folder, create a new .jsx file. This file will contain your page component.</Text>
          <Text style={styles.step}>3. Build your page using React Native components such as ScrollView, View, Text, Image, and Button.</Text>
          <Text style={styles.step}>4. Style your components using StyleSheet.create() for organized and reusable styles.</Text>
          <Text style={styles.step}>5. To add a bottom tab bar, add it to the _layout.jsx file.</Text>
          <Text style={styles.step}>6. Use the useRouter hook from expo-router to navigate between pages programmatically.</Text>
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
