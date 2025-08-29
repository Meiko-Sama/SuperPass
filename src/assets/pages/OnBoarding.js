import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StyleSheet } from 'react-native';

import { setItem } from '../components/AsyncStorage';

import React, { useState, useEffect } from 'react';
// IMPORTAÇÃP STYLES
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
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[{
          backgroundColor: "black",
          image: (
            <View style={style.lottie}>
              <LottieView
                source={require("../images/docinhopeso.png")}
                autoPlay
                loop
                style={{ width: '100%', height: '100%' }} />
            </View>),
          title: "Bem-vindo ao SuperPass!!!"
        },

        {
          backgroundColor: "black",
          image: (
            <View style={style.lottie}>
              <LottieView
                source={require("../images/docinholevantapeso.png")}
                autoPlay
                loop
                style={{ width: '100%', height: '100%' }} />
            </View>),
          title: "Acesse"
        },

        {
          backgroundColor: "black",
          image: (
            <View style={style.lottie}>
              <LottieView
                source={require("../images/docinholevantapeso.png")}
                autoPlay
                loop
                style={{ width: '100%', height: '100%' }} />
            </View>),
          title: "Espero que você aproveite o app"
        }

        ]}
      />

    </SafeAreaView>
  );
}

export const style = StyleSheet.create({
  lottie: {
    width: width * 0.9,
    height: width
  },

  doneButton: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: "100%",
    borderBottomLeftRadius: "100%"
  },

});
