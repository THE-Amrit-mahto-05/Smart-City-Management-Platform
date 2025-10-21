import { StyleSheet, Text, View, Image } from 'react-native';
import wel from './assets/wel.png';  


export default function App() {
  return (
    <View style={styles.container}>
      <Image style={styles.pattern} source={wel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pattern: {
  width: '100%',
  height: 240,
  resizeMode: 'cover',
}

});
