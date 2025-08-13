import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// IMPORTAÇÃO USESTATE e USEEFFECT
import { useState, useEffect } from "react";

// IMPORTANDO AS PÁGINAS EXISTENTES
import OnBoarding from "../pages/OnBoarding";
import Cadastro from "../pages/Cadastro";
import Perfil from "../pages/Perfil";

// DECLARANDO STACK NAVIGATOR
const Stack = createNativeStackNavigator();

//IMPORTANDO ASYNC STORAGE
import { getItem } from "./AsyncStorage";

export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkIfAlredyOnboarded();
  }, [])

  const checkIfAlredyOnboarded = async () => {
    let onboarded = await getItem("onboarded")

    console.log(onboarded)
    console.log(typeof onboarded)

    if (onboarded === "1") {
      setShowOnboarding(false)
    } else {
      setShowOnboarding(true)
    }
  }

  const checkIfAlredyLoggedIn = async () => {
    let

  }



  // IF DE SEGURANÇA - Se não tiver encontrado nada, retorna nada
  if (showOnboarding === null) {
    return null
  }

  // Esse IF funciona caso o usuário nunca tiver entrado na tela ONBOARDING,
  // fazendo que ele seja redirecionado para essa tela antes de ir para HOME
  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={OnBoarding} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
          <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    )

    // Esse ELSE funciona caso o usuário já tenha entrado na tela ONBOARDING,
    // fazendo que ele seja redirecionado para a tela HOME diretamente.
  } else {
    if (logado) {

    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Onboarding" component={OnBoarding} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
            <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
  }
}
