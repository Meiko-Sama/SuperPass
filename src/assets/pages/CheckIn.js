import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


export default function CheckIn() {

  const Navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../images/docinhomusculosa.png")}
        style={{ width: 50, height: 75, marginBottom: 20, position: 'absolute', left: 20, top: 10 }}
      />

      <TouchableOpacity style={styles.closeButton}>
        <FontAwesome name="close" size={28} color="#00FF40"> </FontAwesome>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Check-in</Text>
        <Text style={styles.subtitle}>
          Faça o check-in somente quando estiver na recepção.
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.logoPlaceholder} />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.cardTitle}>Academia Ironberg</Text>
          <Text style={styles.cardSubtitle}>Musculação</Text>
        </View>
      </View>

      <View style={styles.progress}>
        <Text style={styles.progress}>Solicitação</Text>
        <Text style={styles.progress}>Pendente</Text>
        <Text style={styles.progress}>Confirmado</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Check-in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  content: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00FF40',
    marginBottom: 8,
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00FF40',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    maxWidth: 350,
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#1a1a1a'
  },
  progress: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#00FF40",
  },
  progressText: {
    color: '#00FF40',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#00FF40',
    borderRadius: 12,
    paddingVertical: 14,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: '700',
  },

})







