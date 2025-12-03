import {
  Image, TouchableOpacity, View, Text, ActivityIndicator
} from 'react-native';

import { useState, useEffect } from 'react';
import axios from "axios";
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Perfil() {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // setIsLoading(true);

      // // const id = await AsyncStorage.getItem("id");
      // // console.log(id)
      // if (!id) {
      //   setError("Nenhum cliente logado");
      //   return;
      // }
      const id = 1;
      const response = await axios.get(`http://10.144.170.38:8082/info/${id}`);
      console.log("GET /info/:id");

      console.log(response)
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white" }}>Erro ao buscar dados...</Text>
      </View>
    );
  }

  const Navigation = useNavigation();

  return (
    <View style={[styles.containerForm, { padding: 60 }]}>

      <Image
        source={require("../images/docinhomusculosa.png")}
        style={{ width: 50, height: 75, marginBottom: 20, position: 'absolute', left: 20, top: 30 }}
      />

      <Text style={{ color: "white" }}>
        Nome: {data.nome}
      </Text>
      <Text style={{ color: "white" }}>
        Idade: {data.idade}
      </Text>
      <Text style={{ color: "white" }}>
        Peso: {data.peso}
      </Text>
      <Text style={{ color: "white" }}>
        Altura: {data.altura}
      </Text>

      {/* Calendário com as novas cores */}
      <View style={{
        margin: 10,
        width: '100%',
      }}>
        <Calendar
          // Estilo básico
          style={{ borderRadius: 10 }}
          theme={{
            backgroundColor: 'black',            // fundo externo preto
            calendarBackground: 'white',         // fundo do calendário branco
            textSectionTitleColor: 'black',      // títulos dos dias (seg, ter...)
            textSectionTitleDisabledColor: 'black',

            selectedDayBackgroundColor: 'green', // dia selecionado
            selectedDayTextColor: 'white',       // texto do dia selecionado

            todayTextColor: "green",             // dia atual agora verde
            dayTextColor: 'green',               // texto dos dias
            textDisabledColor: 'black',          // dias desabilitados (preto)

            dotColor: 'green',                   // marcação verde
            selectedDotColor: 'white',

            arrowColor: 'green',                 // setas verdes
            monthTextColor: 'green',             // mês verde
            indicatorColor: 'green',             // indicador verde
          }}

          // Data atual automaticamente
          current={new Date().toISOString().split('T')[0]}

          minDate={'2023-01-01'}
          maxDate={'2025-12-31'}

          onDayPress={(day) => {
            console.log('selected day', day);
          }}

          monthFormat={'yyyy MM'}
          markingType={'simple'}

          // Marca o dia atual automaticamente
          markedDates={{
            [new Date().toISOString().split('T')[0]]: {
              selected: true,
              marked: true,
              dotColor: 'white'
            },
          }}
        />
      </View>
      {/* Fim do calendário */}


    </View>

  );



}

