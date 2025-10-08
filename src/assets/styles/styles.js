import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerForm: {
    backgroundColor: '#000',
    width: "100%",
    height: "100%",
  },

  paiDoBtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 45,

  },

  btnCadastro: {
    backgroundColor: "rgb(10, 146, 11)",
    padding: 15,
    borderRadius: 60,
    width: 350,
    height: 55,
    alignItems: "center",

  },

  paiDoBtnHome: {
    // alignItems: "center",
    // backgroundColor: "rgb(10, 146, 11)",
    // justifyContent: "center",

    padding: 100,
    position: "absolute",

  },

  btnCadastroHome: {
    backgroundColor: "rgb(10, 146, 11)",
    padding: 15,
    borderRadius: 60,
    width: 200,
    height: 55,
    alignItems: "center",

    top: 500,
  },

  textinho: {
    fontSize: 20,
    letterSpacing: 1.5,
    fontWeight: 700
  },
});

