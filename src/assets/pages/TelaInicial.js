import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


export default function TelaInicial() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SuperPass</Text>
        <Image
          source={require('../images/docinhomusculosa.png')}
          style={styles.character}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'green',
    fontSize: 40,
    fontWeight: 'bold',
  },
  character: {
    width: 50,
    height: 75,
    marginLeft: 10,
  },
})
