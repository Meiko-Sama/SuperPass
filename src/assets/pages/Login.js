import { StatusBar } from 'expo-status-bar';
import { Text, ImageBackground, TouchableOpacity, View, Pressable } from 'react-native';

// IMPORTANDO O ICONE
import Foundation from '@expo/vector-icons/Foundation';

import { styles } from '../styles/styles';

// IMPORTAÇÃO NATIVE
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../components/AsyncStorage';

// IMPORTAÇÃO DE ICONE
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Login() {

  const navigation = useNavigation();

  // FAZENDO FUNÇÃO DO BOTÃO ENVIAR PARA PAGINA HOME
  const handleLogin = async () => {
    await setItem("login", "1")
    navigation.navigate("Home")
  }

  return (
    <ImageBackground style={styles.containerSI} source={require("../images/cotage.png")}>
      <MaterialIcons name="movie" size={100} color="white" style={{ left: -120, bottom: 180 }} />



      <Text style={styles.tituloSI}>ACESSE SUA CONTA!</Text>
      <Text style={styles.subTituloSI}> Bem vindo de volta usuário!</Text>

      <View style={styles.campo}>
        <TextComp txt="Email:" />
        <InputComp textPlaceHolder={"Digite seu email"} password={false} />
        <TextComp txt="Senha:" />
        <InputComp textPlaceHolder={"Digite sua senha"} password={true} />
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.btnSI} >
        <Text style={styles.cadastroSI}> ENTRAR </Text>
      </TouchableOpacity>

    </ImageBackground>
  );

}
