import { StatusBar } from 'expo-status-bar';
import { Text, ImageBackground, TextInput, TouchableOpacity, View, Pressable } from 'react-native';

// Importação dos INPUTS
import CadastroInput from '../components/CadastroInput';

// IMPORTAÇÃO STYLES
import { styles } from '../styles/styles';

// IMPORTAÇÃO NATIVE
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../components/AsyncStorage';
import CadastroText from '../components/CadastroText';

// IMPORTAÇÃO DE ICONE
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Login() {

  const navigation = useNavigation();

  // FAZENDO FUNÇÃO DO BOTÃO ENVIAR PARA PAGINA HOME
  const handleLogin = async () => {
    await setItem("login", "1")
    navigation.navigate("Home")
  }

  return (
    <ImageBackground style={styles.containerForm}>
      <View>
        <Text style={{ color: 'rgb(10, 146, 11)', fontSize: 22 }}>Página de Questionário</Text>
        <Text style={{ color: 'white', paddingTop: 30, fontSize: 15 }}>Questionário básico para melhorar a sua experiência:</Text>
        <Text style={{ color: 'rgb(10, 146, 11)', fontSize: 20, position: "absolute", top: 110, right: 110 }}>Informações pessoais:</Text>

        <CadastroText txt="Nome Completo:" />
        <CadastroInput />

        <CadastroText txt="Idade:" />
        <CadastroInput />

        <CadastroText txt="CPF:" />
        <CadastroInput />

        <CadastroText txt="RG:" />
        <CadastroInput />

      </View>
      <StatusBar hidden />
    </ImageBackground>



  );
}
