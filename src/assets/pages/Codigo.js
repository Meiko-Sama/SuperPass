import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, ImageBackground, TouchableOpacity, View, Pressable, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CadastroInput from '../components/CadastroInput';
import { styles } from '../styles/styles';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CadastroText from '../components/CadastroText';
import OnBoarding from './OnBoarding';
import axios from "axios";

export default function Codigo() {

  return (
    <View style={styles.containerForm}>
      <Image source={require("../images/docinhomusculosa.png")} style={{ width: 50, height: 75 }} />
      <View style={{ flexDirection: "row", width: "100%", height: "10%", alignItems: "center", gap: 10, top: -40 }}>
        <TouchableOpacity>
          <FontAwesome name="arrow-circle-left" size={40} color='rgb(10, 146, 11)' onPress={OnBoarding} />
        </TouchableOpacity>
        <Text style={{ color: 'rgb(10, 146, 11)', fontSize: 25 }}>Verifique sua empresa</Text>
      </View>
      <Text style={{ color: "#fff", fontSize: 17, }}>Busque a empresa que oferece o SuperPass para você</Text>

    </View>

  );
}








