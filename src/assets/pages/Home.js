
import { StatusBar, Text, ImageBackground, TouchableOpacity, View, Image, } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import OnBoarding from './OnBoarding';
import { styles } from '../styles/styles';


// IMPORTAÇÃO DO NAVIGATION
import { useNavigation } from '@react-navigation/native';

import Carousel from '../components/Carousel';

//IMPORTAÇÃO DO ASYNC STORAGE
import { removeItem } from '../components/AsyncStorage';

//IMPORTAÇÃO PAGINA GALERIA

// IMPORTAÇÃO DE ICONE
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Home() {

  // DECLARANDO O NAVIGATION
  const navigation = useNavigation();

  // ENVIA PARA A TELA DE CHECK IN
  const CheckIn = () => {
    navigation.navigate("CheckIn")
  }

  // ENVIA PARA A TELA DE PERFIL
  const Perfil = () => {
    navigation.navigate("Perfil")
  }

  const backFormulario = () => {
    navigation.navigate('Formulario');
  };



  return (
    // <View style={styles.containerForm}>
    //   <Image
    //     source={require("../images/docinhomusculosa.png")}
    //     style={{ width: 50, height: 75, marginBottom: 20, position: 'absolute', left: 20, top: 5 }}
    //   />
    //   <View style={{ flexDirection: "row", width: "100%", height: "10%", alignItems: "center", gap: 10, top: 30 }}>
    //     <TouchableOpacity>
    //       <FontAwesome name="arrow-circle-left" size={40} color='rgb(10, 146, 11)' />
    //     </TouchableOpacity>
    //     <Text style={{ color: 'rgb(10, 146, 11)', fontSize: 25 }}>Página Home</Text>
    //   </View>
    //   <View style={{
    //     width: "100%",
    //     height: "100%",
    //     top: -40,
    //   }}></View>


    //   <View style={styles.paiDoBtnHome}>
    //     <TouchableOpacity onPress={CheckIn} style={styles.btnCadastroHome}>
    //       <Text style={styles.textinho}>Botao</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>

    <Carousel />
  );
}

