import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import OnBoarding from './OnBoarding';
import { useNavigation } from '@react-navigation/native';

import { BlurView } from 'expo-blur';

export default function Cadastro() {

  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");

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
        alert("Erro! Você não está logado.");
        setLoading(false);
        return;
      }

      const res = await axios.get("http://10.144.170.56:8082/auth/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNome(res.data.user.nome);
      setEmail(res.data.user.email);

    } catch (error) {
      console.log("ERRO:", error);
    } finally {
      setLoading(false);
    }
  };

  const btnEnvia = () => {
    navigation.navigate('TelaInicial');
  };


  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");

      if (!token) {
        alert("Erro! você não está logado");
        setLoading(false);
        return;
      }

      const res = await axios.put("http://10.144.170.56:8082/auth/update", {
        nome, email
      }, {
        headers: {
          "Content-Type": "application/json", Authorization: `Bearer ${token}`
        }
      });

    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Validação codigo

  const validarCodigo = async () => {
    try {
      if (!codigo.trim()) {
        alert("Digite um código!");
        return;
      }

      const res = await axios.post("http://10.144.170.56:8082/auth/verificarCodigo", {
        codigo
      });

      if (res.data.valid) {
        navigation.navigate("Formulario");
      } else {
        alert("Código inválido!");
      }

    } catch (error) {
      alert("Erro ao validar o código.");
      console.log("Erro:", error);
    }
  };


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

      <View style={{ position: 'relative', flex: 1, marginTop: 70 }}>
        <View style={{ marginTop: 25, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: 'rgb(10, 146, 11)', fontSize: 18, marginBottom: 5 }}>Código de acesso</Text>
          <TextInput
            placeholder="Digite o código..."
            placeholderTextColor="#aaa"
            value={codigo}
            onChangeText={setCodigo}
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

          <TouchableOpacity style={{ position: 'absolute', bottom: -30, right: 20 }}>
            <Text style={{ color: 'white' }} onPress={() => setVisible(true)} > Não sabe o código?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            padding: 20,
            width: 350,
            marginLeft: 15,
            backgroundColor: "green",
            borderRadius: 30,
            marginTop: 350,
            alignItems: "center"
          }}
          onPress={goToFormulario}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Seguir para FORMULÁRIO</Text>
        </TouchableOpacity>
      </View>

      {/* ALERT COM BLURVIEW */}
      <Modal
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
        transparent={true}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
          <View style={{
            width: "80%",
            height: "25%",
            borderRadius: 20,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 40,
          }}>
            <Text style={{ fontSize: 18, marginBottom: 15, textAlign: "center", color: "#000" }}>
              Verifique com o RH da sua empresa, para que disponibilizem seu código de acesso.
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: "#000", paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20, marginTop: 15 }}
              onPress={() => setVisible(false)}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>

      <View style={{
      }}>

      </View>
      <StatusBar hidden />
    </View>
  );
}
