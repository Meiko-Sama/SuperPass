import { createNativeStackNavigator } from '@react-navigation/native-stack';

// IMPORTAÇÃO DO NAVIGATION
import { useNavigation } from '@react-navigation/native';

import Carousel from '../components/Carousel';



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

