import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { setItem } from '../components/AsyncStorage';
import React, { useState, useEffect } from 'react';
// IMPORTAÇÃo STYLES
import { styles } from '../styles/styles';

const { width, height } = Dimensions.get("window")
export default function OnBoarding() {
  const navigation = useNavigation();

  const handleDone = () => {
    setItem('onboarded', '1')
    navigation.navigate("Login");
  }

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={style.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.containerOB}>
      <Onboarding
        style={styles.barra}
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[{
          backgroundColor: "black",
          image: (
            <View style={style.page}>
              <Image
                source={require("../images/docinhomusculosa.png")}
                autoPlay
                style={{ width: '100%', height: '800' }} />
            </View>),
          title: "Bem-vindo ao SuperPass!!!",
          titleStyles: {
            fontSize: 25
          },
          subtitle: "O SuperPass é um aplicativo que foi criado para fornecer uma forma mais rápida de conectar o usuário as academias, independentemente de sua posição geográfica.",
          subTitleStyles: {
            fontSize: 17,
            marginBottom: 100
          },
        },

        {
          backgroundColor: "black",
          image: (
            <View style={style.pageEspecial}>
              <Image
                source={require("../images/docinhomalhada.png")}
                autoPlay
                loop
                style={{ width: '100%', height: '800' }} />
            </View>),
          title: "Esperamos que você goste!!",
          titleStyles: {
            fontSize: 25
          },
          subtitle: "O aplicativo conta com um sistema de check-in, sistema de busca de academias no seu radar, uma interface com corpo disponível, um calendário para registar os dias de frequência na academia e muito mais!!",
          subTitleStyles: {
            fontSize: 17,
            marginBottom: 100
          },
        },

        {
          backgroundColor: "black",
          image: (
            <View style={style.pageEspecialDois}>
              <Image
                source={require("../images/DocinhoCega.png")}
                autoPlay
                loop
                style={{ width: '100%', height: '540' }} />
            </View>),
          title: "Esperamos que você aproveite o app!!",
          titleStyles: {
            fontSize: 25
          },
          subtitle: "O público alvo principal desse projeto são as pessoas interessadas em poder encontrar uma academia de forma simples, rápida e intuitiva.",
          subTitleStyles: {
            fontSize: 17,
            marginBottom: 100
          },
        }
        ]}
      />

    </SafeAreaView>

  );
}

export const style = StyleSheet.create({
  page: {
    width: width * 0.9,
    height: width,
    display: "flex",
    bottom: 100
  },

  pageEspecial: {
    width: width * 0.9,
    height: width,
    display: "flex",
    bottom: 170
  },

  pageEspecialDois: {
    width: width * 0.9,
    height: width,
    display: "flex",
    bottom: 40
  },

  doneButton: {
    padding: 20,
    backgroundColor: 'rgb(10, 146, 11)',
    borderTopLeftRadius: "100%",
    borderBottomLeftRadius: "100%"
  },



});
