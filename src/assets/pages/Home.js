
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

    <Carousel />
  );
}

