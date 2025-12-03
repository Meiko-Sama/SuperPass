import {
  Image, TouchableOpacity, View, Text, ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // <- FALTAVA ISSO
import { styles } from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil() {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const navigation = useNavigation(); // Corrigido (era Navigation com N maiúsculo)

  function backToHome() {
    navigation.goBack();
  }

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const id = 1; // futuramente virá do AsyncStorage
      const response = await axios.get(`http://10.144.170.38:8082/info/${id}`);

      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={localStyles.loaderContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={localStyles.errorContainer}>
        <Text style={{ color: "white" }}>Erro ao buscar dados...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.containerForm, localStyles.page]}>

      {/* Logo */}
      <Image
        source={require("../images/docinhomusculosa.png")}
        style={localStyles.logo}
      />

      {/* Barra superior */}
      <View style={localStyles.header}>
        <TouchableOpacity onPress={backToHome}>
          <FontAwesome
            name="arrow-circle-left"
            size={40}
            color="rgb(10, 146, 11)"
          />
        </TouchableOpacity>

        <Text style={localStyles.headerTitle}>Check-in</Text>
      </View>

      {/* Nome grande e destacado */}
      <Text style={localStyles.bigName}>
        {data.nome}
      </Text>

      {/* Cartão com informações */}
      <View style={localStyles.infoCard}>
        <View style={localStyles.row}>
          <Text style={localStyles.label}>Idade:</Text>
          <Text style={localStyles.value}>{data.idade}</Text>
        </View>

        <View style={localStyles.row}>
          <Text style={localStyles.label}>Peso:</Text>
          <Text style={localStyles.value}>{data.peso} kg</Text>
        </View>

        <View style={localStyles.row}>
          <Text style={localStyles.label}>Altura:</Text>
          <Text style={localStyles.value}>{data.altura} m</Text>
        </View>
      </View>

      {/* Calendário estilizado */}
      <View style={localStyles.calendarWrapper}>
        <Calendar
          style={localStyles.calendar}
          theme={{
            backgroundColor: '#111',
            calendarBackground: '#111',

            textSectionTitleColor: 'white',

            selectedDayBackgroundColor: 'green',
            selectedDayTextColor: 'white',

            todayTextColor: 'green',
            dayTextColor: 'white',
            textDisabledColor: '#555',

            dotColor: 'green',
            selectedDotColor: 'white',

            arrowColor: 'green',
            monthTextColor: 'green',
            indicatorColor: 'green',
          }}

          current={new Date().toISOString().split('T')[0]}
          minDate={'2023-01-01'}
          maxDate={'2025-12-31'}

          onDayPress={(day) => console.log('selected day', day)}
          monthFormat={'yyyy MM'}
          markingType={'simple'}

          markedDates={{
            [new Date().toISOString().split('T')[0]]: {
              selected: true,
              marked: true,
              dotColor: 'white'
            }
          }}
        />
      </View>
    </View>
  );
}

/* ----------------- ESTILOS APRIMORADOS ----------------- */

const localStyles = {
  page: {
    paddingHorizontal: 25,
    paddingTop: 110,
  },

  logo: {
    width: 55,
    height: 80,
    position: 'absolute',
    left: 25,
    top: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    width: "100%",
    marginBottom: 10,
  },

  headerTitle: {
    color: "rgb(10, 146, 11)",
    fontSize: 26,
    fontWeight: "bold",
  },

  bigName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#00FF00',
    textShadowRadius: 10,
  },

  infoCard: {
    width: "100%",
    padding: 22,
    backgroundColor: "#1a1a1a",
    borderRadius: 15,
    marginBottom: 25,
    borderWidth: 1.5,
    borderColor: "green",
    elevation: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  label: {
    fontSize: 18,
    color: "#ccc",
    fontWeight: "500",
  },

  value: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },

  calendarWrapper: {
    width: "100%",
    marginTop: 10,
  },

  calendar: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#111",
    elevation: 8,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
};
