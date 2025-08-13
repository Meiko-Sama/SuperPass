import { Text, ImageBackground, TouchableOpacity, View, Pressable } from 'react-native';

// IMPORTAÇÃO REACT NATIVE
import { useNavigation } from '@react-navigation/native';

//IMPORTAÇÃO StyleSheet
import { styles } from '../styles/styles';

export default function Cadastro() {

  const Navigation = useNavigation();

  return (
    <ImageBackground style={{}} source={require("../images/cotage.png")}>

      <Text style={{ color: "000", fontSize: 20 }}>ACESSE SUA CONTA!</Text>
      <Text style={{ color: "000", fontSize: 10 }}> Bem vindo de volta usuário!</Text>

      <View style={styles.campo}>

        <Pressable style={{ position: 'absolute', right: -10, bottom: 15 }} onPress={() => { }}>
          <Text style={{ color: "#6ea2d0", fontSize: 12 }}>Forgot your password?</Text>
        </Pressable>
      </View>

      <View style={styles.div}>
        <Text style={{ color: "000", fontSize: 8 }}>Não tem uma conta ainda?</Text>
      </View>


    </ImageBackground>
  );
}


