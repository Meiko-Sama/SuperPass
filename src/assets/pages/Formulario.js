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

export default function Formulario() {

  const [btnEmagrecimento, setBtnEmagrecimento] = useState(false);
  const [btnHipertrofia, setBtnHipertrofia] = useState(false);
  const [btnSaudeGeral, setBtnSaudeGeral] = useState(false);
  const [btnCondicionamento, setBtnCondicionamento] = useState(false);
  const [btnPreferencia, setBtnPreferencia] = useState(false);


  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // HEX para aceitar ponto e virgula na altura e peso
  const handleChangeAltura = (text) => {
    const filtrado = text.replace(/[^0-9.,]/g, '');
    setAltura(filtrado);
  };

  const handleChangePeso = (text) => {
    const filtrado = text.replace(/[^0-9.,]/g, '');
    setPeso(filtrado);
  };


  // Redireciona para tela OnBoarding Novamente
  const goToOnBoarding = () => {
    navigation.navigate('OnBoarding');
  };

  const handleFormulario = async () => {
    if (!nome || !idade || !altura || !peso) {
      alert("Preencha todos os campos!!");
      return;
    }

    setLoading(true);

    try {

      // Aqui envia para a tela de cadastro
      navigation.navigate("Cadastro");

      const res = await axios.post("http://10.144.170.110:8081/auth/Formulario", {
        nome,
        idade,
        altura,
        peso,
        emagrecimento: btnEmagrecimento ? 1 : 0,
        hipertrofia: btnHipertrofia ? 1 : 0,
        saude: btnSaudeGeral ? 1 : 0,
        condicionamento: btnCondicionamento ? 1 : 0,
        preferencia: btnPreferencia
      });

      alert("Sucesso ao cadastrar!");

      // Limpa os campos
      setNome("");
      setIdade("");
      setAltura("");
      setPeso("");



    } catch (error) {
      console.log("ERRO:", error);
      alert("Erro ao cadastrar, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.containerForm}>
      <Image source={require("../images/docinhomusculosa.png")} style={{ width: 50, height: 75 }} />
      <View style={{ flexDirection: "row", width: "100%", height: "10%", alignItems: "center", gap: 10, top: -40 }}>
        <TouchableOpacity>
          <FontAwesome name="arrow-circle-left" size={40} color='rgb(10, 146, 11)' onPress={goToOnBoarding} />
        </TouchableOpacity>
        <Text style={{ color: 'rgb(10, 146, 11)', fontSize: 25 }}>Página de Questionário</Text>
      </View>
      <View style={{
        width: "100%",
        height: "100%",
        top: -40,
      }}>
        <Text style={{ color: "#fff", fontSize: 17 }}>Questionário para aprimorar sua experiência!</Text>

        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", marginTop: 15 }}>
          <Text style={{ color: "#fff", width: "16%", fontSize: 18, fontStyle: "italic" }}>Nome:</Text>
          <TextInput
            style={{
              paddingLeft: 10,
              color: 'white',
              height: 35,
              borderWidth: 1,
              borderColor: 'rgb(10, 146, 11)',
              width: "72%",
              borderRadius: 20,
              fontSize: 15,
              textAlignVertical: 'center',
            }}
            value={nome} onChangeText={setNome}

          />
        </View>

        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", marginTop: 15 }}>
          <Text style={{ color: "#fff", width: "16%", fontSize: 18, fontStyle: "italic" }}>Idade:</Text>
          <TextInput
            style={{
              paddingLeft: 10,
              color: 'white',
              height: 35,
              borderWidth: 1,
              borderColor: 'rgb(10, 146, 11)',
              width: "72%",
              borderRadius: 20,
              fontSize: 15,
              textAlignVertical: 'center',
            }}
            value={idade} onChangeText={setIdade} keyboardType="numeric"
          />
        </View>

        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", marginTop: 15 }}>
          <Text style={{ color: "#fff", width: "16%", fontSize: 18, fontStyle: "italic" }}>Altura:</Text>
          <TextInput
            style={{
              paddingLeft: 10,
              color: 'white',
              height: 35,
              borderWidth: 1,
              borderColor: 'rgb(10, 146, 11)',
              width: "72%",
              borderRadius: 20,
              fontSize: 15,
              textAlignVertical: 'center',
            }}
            value={altura} onChangeText={handleChangeAltura} keyboardType="numeric"
          />
        </View>

        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", marginTop: 15 }}>
          <Text style={{ color: "#fff", width: "16%", fontSize: 18, fontStyle: "italic" }}>Peso:</Text>
          <TextInput
            style={{
              paddingLeft: 10,
              color: 'white',
              height: 35,
              borderWidth: 1,
              borderColor: 'rgb(10, 146, 11)',
              width: "72%",
              borderRadius: 20,
              fontSize: 15,
              textAlignVertical: 'center',
            }}
            value={peso} onChangeText={handleChangePeso} keyboardType="numeric"
          />
        </View>


        {/* Objetivos */}
        <Text style={{ color: "#fff", marginTop: 40, fontSize: 17 }}>Objetivo Principal:</Text>
        <Pressable onPress={() => setBtnEmagrecimento(!btnEmagrecimento)} style={{ marginTop: 15 }}>
          <Text style={{ margintop: 40, marginLeft: 140, color: 'white', margin: 8 }}>{btnEmagrecimento ? "🟢" : "⚪"} EMAGRECIMENTO</Text>
        </Pressable>
        <Pressable onPress={() => setBtnHipertrofia(!btnHipertrofia)}>
          <Text style={{ marginLeft: 140, color: 'white', margin: 8 }}>{btnHipertrofia ? "🟢" : "⚪"} HIPERTROFIA</Text>
        </Pressable>
        <Pressable onPress={() => setBtnSaudeGeral(!btnSaudeGeral)} style={{ justifyContent: "center" }}>
          <Text style={{ marginLeft: 140, color: 'white', margin: 8 }}>{btnSaudeGeral ? "🟢" : "⚪"} SAÚDE GERAL</Text>
        </Pressable>
        <Pressable onPress={() => setBtnCondicionamento(!btnCondicionamento)} style={{ justifyContent: "center" }}>
          <Text style={{ marginLeft: 140, color: 'white', margin: 8 }}>{btnCondicionamento ? "🟢" : "⚪"} CONDICIONAMENTO FÍSICO</Text>
        </Pressable>


        {/* Gênero */}
        <Text style={{ fontSize: 17, color: "#fff", marginTop: 20, margin: 20 }}>Preferência de Corpo:</Text>
        <Pressable onPress={() => setBtnPreferencia("feminino")}>
          <Text style={{ marginLeft: 140, color: 'white', margin: 8 }}>{btnPreferencia === "feminino" ? "🟢" : "⚪"} FEMININO</Text>
        </Pressable>
        <Pressable onPress={() => setBtnPreferencia("masculino")}>
          <Text style={{ marginLeft: 140, color: 'white', margin: 8 }}>{btnPreferencia === "masculino" ? "🟢" : "⚪"} MASCULINO</Text>
        </Pressable>

        {/* BOTÃO */}
        <View style={styles.paiDoBtn}>
          <TouchableOpacity onPress={handleFormulario} disabled={loading} style={styles.btnCadastro}>
            <Text style={styles.textinho}>{loading ? "Carregando..." : "Seguir"}</Text>
          </TouchableOpacity>
        </View>

        {/* Você consegue Sarah!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        {/* obrigada 😭 */}
      </View>
      <StatusBar hidden />
    </View>
  );
}

