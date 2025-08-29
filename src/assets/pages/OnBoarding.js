import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <TouchableOpacity style={styles.doneButton} {...props}>
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
          backgroundColor: "yellow",
          image: (
            <View style={styles.lottie}>
              <LottieView
                source={require("../images/")}
                autoPlay
                loop
                style={{ width: '100%', height: '100%' }} />
            </View>),
          title: "Bem-vindo ao SuperPass!!!"
        },

        {
          backgroundColor: "blue",
          image: (
            <View style={styles.lottie}>
              <LottieView
                source={require("../src/assets/do")}
                autoPlay
                loop
                style={{ width: '100%', height: '100%' }} />
            </View>),
          title: "Acesse"
        },

        {
          backgroundColor: "orange",
          image: (
            <View style={styles.lottie}>
              <LottieView
                source={require("../images/")}
                autoPlay
                loop
                style={{ width: '100%', height: '100%' }} />
            </View>),
          title: "Espero que você aproveite o app"
        }

        ]}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
