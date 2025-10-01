import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import OnBoarding from './OnBoarding';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {

  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();
  // BOTÃO PARA O FORMULÁRIO
  const backToCad = () => {
    navigation.navigate('Cadastro');
  };

  const goToFormulario = () => {
    navigation.navigate('Formulario');
  };

  // BOTÃO PARA O ALERT
  const handleCODIGOalert = () => {
    alert("Você pode pedir um código para o RH da sua empresa.", [
      { text: "Cancelar", style: "cancel" },
      { text: "OK", onPress: () => console.log("OK Pressionado") }
    ]);
  };

  const [visible, setVisible] = useState(false);


  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("@token");
      if (!token) {
        alert("Erro! Você não está logado.")
        setLoading(false)
        return;
      }

      const res = await axios.get("http://10.144.170.110:8081/auth/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })

      setNome(res.data.user.nome);
      setEmail(res.data.user.email);

    } catch (error) {
      console.log("ERRO:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");

      if (!token) {
        alert("Erro! você não está logado")
        setLoading(false);
        return;
      }

      const res = await axios.put("http://10.144.170.110:8081/auth/update", {
        nome, email
      }, {
        headers: {
          "Content-Type": "application/json", Authorization: `Bearer ${token}`
        }
      })

    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  // VOCE CONSEGUE SASHA (☞ﾟヮﾟ)☞ ο(=•ω＜=)ρ

  return (
    <View style={[styles.containerForm, { padding: 20 }]}>

      <Image
        source={require("../images/docinhomusculosa.png")}
        style={{ width: 50, height: 75, marginBottom: 20, position: 'absolute', left: 20, top: 30 }}
      />

      <View style={{ flexDirection: "row", width: "100%", alignItems: "center", gap: 10, marginTop: 70 }}>
        <TouchableOpacity onPress={backToCad}>
          <FontAwesome name="arrow-circle-left" size={40} color="rgb(10, 146, 11)" />
        </TouchableOpacity>
        <Text style={{ color: "rgb(10, 146, 11)", fontSize: 25 }}>Verifique sua empresa</Text>
      </View>

      <Text style={{ color: "#fff", fontSize: 18, textAlign: "center", marginBottom: 10, marginTop: 5 }}>
        Cadastre-se com o código fornecido pela sua empresa!
      </Text>


      <View style={{ position: 'relative', flex: 1, justifyContent: "center" }}>
        <View style={{ marginTop: 25, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: 'rgb(10, 146, 11)', fontSize: 18, marginBottom: 5 }}>Código de acesso</Text>
          <TextInput
            placeholder="Buscar empresa..."
            placeholderTextColor={"#aaa"}
            style={{
              color: "white",
              backgroundColor: "#262626",
              height: 50,
              borderRadius: 20,
              marginHorizontal: 20,
              paddingLeft: 15,
              width: "80%"
            }}
          />

          <TouchableOpacity style={{ position: 'absolute', bottom: -25, right: 0 }}>
            <Text style={{ color: 'white' }} onPress={() => setVisible(true)} > Não sabe o código?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: "green",
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 150
          }}
          onPress={goToFormulario}
        >
          <Text style={{ color: "white", fontSize: 16, }}>Seguir para FORMULÁRIO</Text>
        </TouchableOpacity>
      </View>

      {/* BOTÃO */}
      <View style={{ width: "80%", alignSelf: "center", marginTop: 75 }}>

      </View>




      {/* ALERT */}
      <Modal
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>

          <View style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.6)", justifyContent: "center", alignItems: "center" }}>

            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>⚠ Atenção!</Text>
            <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 180, marginLeft: 40, marginRight: 40 }}>
              Você pode conseguir um código válido com o RH da sua empresa.
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={{ backgroundColor: "green", flex: 1, padding: 12, borderRadius: 90, alignItems: "center", marginLeft: 50, marginRight: 50 }}
                onPress={() => {
                  console.log("OK Pressionado");
                  setVisible(false);
                }} >
                <Text style={{ color: "white", fontWeight: "bold" }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


    </View >
  );
}



