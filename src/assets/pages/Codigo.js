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
      {/* LOGO */}
      <Image source={require("../images/docinhomusculosa.png")} style={{ width: 50, height: 75, marginBottom: 2 }} />

      {/* VOLTAR E TÍTULO */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
        <TouchableOpacity onPress={backToCad}>
          <FontAwesome name="arrow-circle-left" size={40} color='rgb(10, 146, 11)' />
        </TouchableOpacity>
        <Text style={{ color: 'rgb(10, 146, 11)', fontSize: 25, marginLeft: 10, }}>Verificação de cadastro</Text>
      </View>

      {/* SUBTÍTULO E INPUT */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: 'white', fontSize: 25, marginBottom: 30, textAlign: "center" }}>Cadastre-se com o código fornecido pela sua empresa!</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: 'rgb(10, 146, 11)', fontSize: 18, marginBottom: 5 }}>Código de acesso</Text>
          <TextInput
            style={{
              width: "80%",
              height: 45,
              borderWidth: 2,
              borderColor: "rgb(10, 146, 11)",
              borderRadius: 20,
              paddingHorizontal: 10,
              color: "white"
            }}
          />
        </View>
      </View>

      {/* ALERT */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111", }}>
        <TouchableOpacity>
          <Text style={{ color: 'white', paddingLeft: 225 }} onPress={() => setVisible(true)} > Não sabe o código?</Text>
        </TouchableOpacity>
        <Modal
          transparent
          animationType="fade"
          visible={visible}
          onRequestClose={() => setVisible(false)}
        >
          <View style={{ flex: 1, backgroundColor: "transparent", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>⚠ Atenção!</Text>
            <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 20 }}>
              Você precisa inserir um código válido.
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={{ backgroundColor: "green", flex: 1, padding: 12, borderRadius: 8, alignItems: "center" }}
                onPress={() => {
                  console.log("OK Pressionado");
                  setVisible(false);
                }} >
                <Text style={{ color: "white", fontWeight: "bold" }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      );

      {/* BOTÃO */}
      <View style={{ marginTop: 280, width: "80%", alignSelf: "center" }}>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: "green",
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={goToFormulario}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Seguir para FORMULÁRIO</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}



