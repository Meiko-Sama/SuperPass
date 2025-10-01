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
    <View style={styles.containerForm}>
      <Image source={require("../images/docinhomusculosa.png")} style={{ width: 50, height: 75 }} />
      <View style={{ flexDirection: "row", width: "100%", height: "10%", alignItems: "center", gap: 10, top: -40 }}>
        <TouchableOpacity>
          <FontAwesome name="arrow-circle-left" size={40} color='rgb(10, 146, 11)' onPress={goToOnBoarding} />
        </TouchableOpacity>
        <Text style={{ color: 'rgb(10, 146, 11)', fontSize: 25 }}>Página de Questionário</Text>
      </View>
    </View>
  );
}

// OI SARAH!!!! （。＾▽＾）:D
// oieeeeee ❤

// :P
