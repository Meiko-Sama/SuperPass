import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";

// IMPORTANDO PÁGINAS
import OnBoarding from "../pages/OnBoarding";
import Perfil from "../pages/Perfil";
import Home from "../pages/Home";
import CheckIn from "../pages/CheckIn";
import Formulario from "../pages/Formulario";
import Cadastro from "../pages/Cadastro";
import Codigo from "../pages/Codigo";

// DECLARANDO STACK
const Stack = createNativeStackNavigator();



// ASYNC STORAGE
import { getItem } from "./AsyncStorage";

// IMPORTAÇÃO DO ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  const [showFormulario, setShowFormulario] = useState(null);
  const [showCadastro, setShowCadastro] = useState(null);


  // Checagem Onboarding
  useEffect(() => {
    // Limpa os dados a cada rodada
    const clearStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log("AsyncStorage limpo!");
      } catch (error) {
        console.log("Erro ao limpar AsyncStorage:", error);
      }
    };

    clearStorage()
    checkIfAlreadyOnboarded();
    checkIfAlreadyLoggedIn();
    checkIfAlreadySignUp();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded === "1") {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  // Checagem cadastro
  const checkIfAlreadyLoggedIn = async () => {
    let formulario = await getItem("formulario");
    if (formulario === "1") {
      setShowFormulario(false);
    } else {
      setShowFormulario(true);
    }
  };

  // Checagem cadastro
  const checkIfAlreadySignUp = async () => {
    let cadastro = await getItem("cadastro");
    if (cadastro === "1") {
      setShowCadastro(false);
    } else {
      setShowCadastro(true);
    }
  };

  // Se ainda não carregou os dados, retorna vazio
  if (showOnboarding === null || showCadastro === null || showFormulario === null) {
    return null;
  }

  // Se ainda não fez onboarding → manda para Onboarding
  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OnBoarding">
          <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
          <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
          <Stack.Screen name="Formulario" component={Formulario} options={{ headerShown: false }} />
          <Stack.Screen name="Codigo" component={Codigo} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // Se já fez onboarding → verifica cadastro
  if (showFormulario) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Cadastro">
          <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
          <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
          <Stack.Screen name="Formulario" component={Formulario} options={{ headerShown: false }} />
          <Stack.Screen name="Codigo" component={Codigo} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // Se já fez onboarding e já está logado → vai direto pro Home
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Codigo">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
        <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name="Formulario" component={Formulario} options={{ headerShown: false }} />
        <Stack.Screen name="Codigo" component={Codigo} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
