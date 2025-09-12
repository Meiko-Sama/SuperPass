import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("@token");
      if (!token) {
        alert("Erro! Você não está logado.")
        setLoading(false);
        return;
      }

      const res = await axios.get("http://localhost:8081/auth/profile", {
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

      const res = await axios.put("http://localhost:3001/auth/update", {
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
  return (
    <View>
      <Text> TESTE </Text>
    </View>
  )
}
