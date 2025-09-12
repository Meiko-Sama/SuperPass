import { StatusBar } from 'expo-status-bar';
import { Text, ImageBackground, TextInput, TouchableOpacity, View, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { styles } from '../styles/styles';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

export default function Cadastro() {
  // Inputs de texto
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [loading, setLoading] = useState(false);

  // Botões de assinalar
  const [btnEmagrecimento, setBtnEmagrecimento] = useState(false);
  const [btnHipertrofia, setBtnHipertrofia] = useState(false);
  const [btnSaudeGeral, setBtnSaudeGeral] = useState(false);
  const [btnCondicionamento, setBtnCondicionamento] = useState(false);
  const [btnFeminino, setBtnFeminino] = useState(false);
  const [btnMasculino, setBtnMasculino] = useState(false);

  const navigation = useNavigation();

  // Função de cadastro (integração com backend)
  const handleRegister = async () => {
    if (!nome || !idade || !altura || !peso) {
      alert("Preencha todos os campos!!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://10.144.170.110:3001/auth/cadastro", {
        nome,
        idade,
        altura,
        peso,
        objetivo: btnEmagrecimento
          ? "emagrecimento"
          : btnHipertrofia
            ? "hipertrofia"
            : btnSaudeGeral
              ? "saude_geral"
              : btnCondicionamento
                ? "condicionamento"
                : null,
        genero: btnFeminino ? "feminino" : btnMasculino ? "masculino" : null,
      });

      alert(`Sucesso ao cadastrar: ${res.data.message}`);

      // Limpar os campos
      setNome("");
      setIdade("");
      setAltura("");
      setPeso("");

      // Redireciona pra Home
      navigation.navigate("Home");
    } catch (error) {
      console.log("ERRO:", error.response?.data || error.message);
      alert("Erro ao cadastrar!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground style={styles.containerForm}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <FontAwesome
            name="arrow-circle-left"
            size={40}
            color="rgb(10, 146, 11)"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Página de Questionário</Text>
      </View>

      <View style={styles.pai}>
        {/* Inputs */}
        <Text>Nome Completo:</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text>Idade:</Text>
        <TextInput style={styles.input} value={idade} onChangeText={setIdade} />

        <Text>Altura:</Text>
        <TextInput style={styles.input} value={altura} onChangeText={setAltura} />

        <Text>Peso atual:</Text>
        <TextInput style={styles.input} value={peso} onChangeText={setPeso} />

        {/* Objetivos */}
        <Text>OBJETIVO PRINCIPAL:</Text>
        <Pressable onPress={() => setBtnEmagrecimento(!btnEmagrecimento)}>
          <Text>{btnEmagrecimento ? "🟢" : "⚪"} EMAGRECIMENTO</Text>
        </Pressable>
        <Pressable onPress={() => setBtnHipertrofia(!btnHipertrofia)}>
          <Text>{btnHipertrofia ? "🟢" : "⚪"} HIPERTROFIA</Text>
        </Pressable>
        <Pressable onPress={() => setBtnSaudeGeral(!btnSaudeGeral)}>
          <Text>{btnSaudeGeral ? "🟢" : "⚪"} SAÚDE GERAL</Text>
        </Pressable>
        <Pressable onPress={() => setBtnCondicionamento(!btnCondicionamento)}>
          <Text>{btnCondicionamento ? "🟢" : "⚪"} CONDICIONAMENTO</Text>
        </Pressable>

        {/* Gênero */}
        <Text>PREFERÊNCIA DE CORPO:</Text>
        <Pressable onPress={() => setBtnFeminino(!btnFeminino)}>
          <Text>{btnFeminino ? "🟢" : "⚪"} FEMININO</Text>
        </Pressable>
        <Pressable onPress={() => setBtnMasculino(!btnMasculino)}>
          <Text>{btnMasculino ? "🟢" : "⚪"} MASCULINO</Text>
        </Pressable>

        {/* Botão cadastrar */}
        <TouchableOpacity onPress={handleRegister} disabled={loading} style={styles.btn}>
          <Text>{loading ? "Cadastrando..." : "Cadastrar"}</Text>
        </TouchableOpacity>

        <StatusBar hidden />
      </View>
    </ImageBackground>
  );
}
