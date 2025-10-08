import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// IMPORTAÇÃO REACT NATIVE
import { useNavigation } from '@react-navigation/native';

//IMPORTAÇÃO StyleSheet
import { styles } from '../styles/styles';

export default function CheckIn() {

  const Navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../images/docinhomusculosa.png")}
        style={{ width: 50, height: 75, marginBottom: 20, position: 'absolute', left: 20, top: 10 }}
      />

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


