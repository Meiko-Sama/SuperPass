import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";

// IMPORTANDO PÁGINAS
import OnBoarding from "../pages/OnBoarding";
import Perfil from "../pages/Perfil";
import Home from "../pages/Home";
import CheckIn from "../pages/CheckIn";
import Login from "../pages/Login";

// DECLARANDO STACK
const Stack = createNativeStackNavigator();

// ASYNC STORAGE
import { getItem } from "./AsyncStorage";
import Onboarding from "react-native-onboarding-swiper";

export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  const [showLogin, setShowLogin] = useState(null);

  // Checagem Onboarding
  useEffect(() => {
    checkIfAlreadyOnboarded();
    checkIfAlreadyLoggedIn();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded === "1") {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  // Checagem Login
  const checkIfAlreadyLoggedIn = async () => {
    let login = await getItem("login");
    if (login === "1") {
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  };

  // Se ainda não carregou os dados, retorna vazio
  if (showOnboarding === null || showLogin === null) {
    return null;
  }

  // Se ainda não fez onboarding → manda para Onboarding
  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={OnBoarding} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
          <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // Se já fez onboarding → verifica login
  if (showLogin) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OnBoarding">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
          <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // Se já fez onboarding e já está logado → vai direto pro Home
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
