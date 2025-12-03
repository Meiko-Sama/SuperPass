import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


export default function CheckIn() {

  const Navigation = useNavigation();

  const [status, setStatus] = useState("solicitacao");

  useEffect(() => {
    setStatus("solicitacao");

    setTimeout(() => setStatus("pendente"), 2000);
    setTimeout(() => setStatus("confirmado"), 4000);
  }, []);

  const navigation = useNavigation();

  const backToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>

      <Image
        source={require("../images/docinhomusculosa.png")}
        style={{ width: 50, height: 75, marginBottom: 20, position: 'absolute', left: 20, top: 10 }}
      />
      <View style={{ flexDirection: "row", width: "100%", alignItems: "center", gap: 10, marginTop: 70 }}>
        <TouchableOpacity onPress={backToHome}>
          <FontAwesome name="arrow-circle-left" size={40} color="rgb(10, 146, 11)" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
        <Text style={{ color: "rgb(10, 146, 11)", fontSize: 25, fontWeight: '900' }}>Check-in</Text>
      </View>

      <View style={styles.txtInicial}>
        <Text style={styles.subtitle}>
          Faça o check-in somente quando estiver na recepção.
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.logoAcad} />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.cardTitle}>Academia Ironberg</Text>
          <Text style={styles.cardSubtitle}>Musculação</Text>
        </View>
      </View>

      <View style={styles.progress}>
        <Text style={{ fontSize: 16, color: '#fff' }}>{status === "solicitacao" ? "🟢" : "⚪"} Solicitação</Text>
        <Text style={{ fontSize: 16, color: '#fff' }}>{status === "pendente" ? "🟢" : "⚪"} Pendente</Text>
        <Text style={{ fontSize: 16, color: '#fff' }}>{status === "confirmado" ? "🟢" : "⚪"} Confirmado</Text>
      </View>

      <TouchableOpacity
        style={{
          padding: 20,
          width: 350,
          marginLeft: 30,
          borderRadius: 30,
          marginTop: 200,
          alignItems: "center",
          borderColor: 'rgb(10, 146, 11)',
          borderWidth: 2
        }}
      >
        <Text style={{ color: 'rgb(10, 146, 11)', fontSize: 16 }}>Check-in</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
  },

  txtInicial: {
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 40,
    color: '#fff'
  },

  subtitle: {
    fontSize: 17,
    color: '#fff',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(10, 146, 11)',
    padding: 20,
    marginHorizontal: 15,
    marginTop: 60,
    borderRadius: 12,
    marginBottom: 16,
  },

  logoAcad: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#ddd',
    marginRight: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  cardSubtitle: {
    fontSize: 13,
    color: '#101010',
  },

  progress: {
    marginTop: 16,
    marginHorizontal: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // (opcional) estilo para cada step se quiser ajustar espaçamento
  stepText: {
    marginVertical: 6,
    fontSize: 16,
  },
});

