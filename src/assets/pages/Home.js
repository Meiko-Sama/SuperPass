import { StatusBar } from 'expo-status-bar';
import { Text, ImageBackground, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles/styles';

// IMPORTAÇÃO DO NAVIGATION
import { useNavigation } from '@react-navigation/native';

//IMPORTAÇÃO DO ASYNC STORAGE
import { removeItem } from '../components/AsyncStorage';

//IMPORTAÇÃO PAGINA GALERIA

// IMPORTAÇÃO DE ICONE
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Home() {

  // DECLARANDO O NAVIGATION
  const navigation = useNavigation();

  // FAZENDO FUNÇÃO DO BOTÃO ENVIAR PARA PAGINA HOME
  const handleReset = async () => {
    await removeItem("login");
    navigation.push("Login")
  }

  // FUNÇÃO PARA DIRECIONAR PARA PAGINA DE GALERIA DE FILMES
  const Gallery = () => {
    navigation.navigate("Gallery")
  }


  return (
    <ImageBackground style={styles.container} source={require("../images/Home.jpg")}>
      <MaterialIcons name="movie" size={250} color="white" />

      <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}> BEM VINDO A TELA HOME! </Text>
      <Text style={{ color: "white", fontSize: 15 }}> O que deseja fazer?</Text>

      <TouchableOpacity onPress={Gallery} style={styles.galleryBTN}>
        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>Ir para a Galeria</Text>
      </TouchableOpacity>

      {/* TEORICAMENTE AQUI É ONDE O REMOVE ITEM DEVE FICAR */}
      <TouchableOpacity onPress={handleReset} style={styles.resetBTN}>
        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>SAIR</Text>
      </TouchableOpacity>

    </ImageBackground>
  );
}
