import { Image, TouchableOpacity, View, } from 'react-native';

import { Calendar } from 'react-native-calendars';  // Importando o calendário

// IMPORTAÇÃO REACT NATIVE
import { useNavigation } from '@react-navigation/native';

import { styles } from '../styles/styles';


export default function Perfil() {


  const Navigation = useNavigation();

  return (
    <View style={[styles.containerForm, { padding: 60 }]}>

      <Image
        source={require("../images/docinhomusculosa.png")}
        style={{ width: 50, height: 75, marginBottom: 20, position: 'absolute', left: 20, top: 30 }}
      />

      {/* Calendário com as novas cores */}
      <View style={{
        margin: 10, height: 20,
        width: '100%',
      }}>
        <Calendar
          // Estilo básico
          style={{ borderRadius: 10, }}
          theme={{
            backgroundColor: 'black',
            calendarBackground: 'white',
            textSectionTitleColor: 'black',
            textSectionTitleDisabledColor: '#fff',
            selectedDayBackgroundColor: 'green',
            selectedDayTextColor: 'white',
            todayTextColor: "blue",
            dayTextColor: 'green',
            textDisabledColor: 'grey',
            dotColor: 'green',
            selectedDotColor: 'green',
            arrowColor: 'green',
            monthTextColor: 'green',
            indicatorColor: 'blue',

          }}
          // Configuração do calendário
          current={'2025-11-26'}
          minDate={'2023-01-01'}
          maxDate={'2025-12-31'}
          onDayPress={(day) => {
            console.log('selected day', day);
          }}
          monthFormat={'yyyy MM'}
          markingType={'simple'}
          markedDates={{
            '2025-11-26': { selected: true, marked: true, dotColor: 'white' },
          }}
        />
      </View>
      {/* Fim do calendário */}


    </View>

  );



}

