import { StatusBar } from 'expo-status-bar';
import { Text, ImageBackground, TextInput, TouchableOpacity, View, Pressable } from 'react-native';

//Importar icones
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Importação dos INPUTS
import CadastroInput from '../components/CadastroInput';

// IMPORTAÇÃO STYLES
import { styles } from '../styles/styles';

// IMPORTAÇÃO DO USE STATE
import { useState } from 'react';

// IMPORTAÇÃO NATIVE
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../components/AsyncStorage';
import CadastroText from '../components/CadastroText';
import PressableInput from '../components/PressableInput';
import OnBoarding from './OnBoarding';


// IMPORTAÇÃO DE ICONE
// OMG HIIIII ><
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Login() {

  const [btnEmagrecimento, setBtnEmagrecimento] = useState(false)
  const [btnHipertrofia, setBtnHipertrofia] = useState(false)
  const [btnSaudeGeral, setBtnSaudeGeral] = useState(false)
  const [btnCondicionamentoFisico, setBtnCondicionamentoFisico] = useState(false)
  const [btnFeminino, setBtnFeminino] = useState(false)
  const [btnMasculino, setBtnMasculino] = useState(false)

  const navigation = useNavigation();

  // FAZENDO FUNÇÃO DO BOTÃO ENVIAR PARA PAGINA HOME
  const handleLogin = async () => {
    await setItem("login", "1")
    navigation.navigate("Home")
  }

  return (
    <ImageBackground style={styles.containerForm}>

      {/* NÃAAAAO CLICA NO ICONE ... POR ENQUANTO */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity >
          <FontAwesome name="arrow-circle-left" size={40} color='rgb(10, 146, 11)' onPress={OnBoarding} />
        </TouchableOpacity>
        <Text style={styles.title}>Página de Questionário</Text>
      </View>
      <View style={styles.pai}>
        <View style={styles.titleSubtitle}>


          <Text style={{ color: 'white', paddingTop: 20, fontSize: 15 }}>Questionário básico para melhorar a sua experiência:</Text>
          <Text style={{ color: 'rgb(10, 146, 11)', fontSize: 20, position: "absolute", top: 80, right: 110 }}>Informações pessoais:</Text>
        </View>
        {/* COMPONENTIZAÇÃO DOS INPUTS UTILIZADOS! */}
        <View style={styles.escrita}>
          <CadastroText txt="Nome Completo:" />
          <CadastroInput />

          <CadastroText txt="Idade:" />
          <CadastroInput />

          <CadastroText txt="Altura:" />
          <CadastroInput />

          <CadastroText txt="Peso atual:" />
          <CadastroInput />
        </View>

        {/* INPUTS DE ASSINALAR 😭😭😭 */}

        <View style={styles.objetivo}>
          <Text style={styles.bolas}>Qual é o seu objetivo: </Text>
          <PressableInput btn={btnEmagrecimento} setbtn={setBtnEmagrecimento} text="Emagrecimento" />
          <PressableInput btn={btnHipertrofia} setbtn={setBtnHipertrofia} text="Hipertrofia" />
          <PressableInput btn={btnSaudeGeral} setbtn={setBtnSaudeGeral} text="Saúde Geral" />
          <PressableInput btn={btnCondicionamentoFisico} setbtn={setBtnCondicionamentoFisico} text="Condicionamento Físico" />
        </View>

        <View style={styles.genero}>
          <Text style={styles.bolas}>Qual sua preferência de corpo: </Text>
          <PressableInput btn={btnFeminino} setbtn={setBtnFeminino} text="Feminino" />
          <PressableInput btn={btnMasculino} setbtn={setBtnMasculino} text="Masculino" />
        </View>

      </View>
      <StatusBar hidden />
    </ImageBackground>



  );
}
