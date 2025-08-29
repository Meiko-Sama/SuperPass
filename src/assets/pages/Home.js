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

  const handleReset = async () => {
    await removeItem("login");
    navigation.push("Login")
  }

  const CheckIn = () => {
    navigation.navigate("CheckIn")
  }

  const Perfil = () => {
    navigation.navigate("Perfil")
  }


  return (
    <ImageBackground style={styles.container} source={require("../images/cotage.png")}>
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
