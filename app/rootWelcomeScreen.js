// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

// Copyright(c) 2018 Gustav Kjellberg, Gustaf Lidfeldt, Diar Sabri, Maria Lindblad,
// Lars Lundin, Carl Hultberg, Bruhan Hashi, Sebastian Franzén, Jesper Öberg,
// Björn Aurell Hansson, Tommy Samuelsson. gustav.kjellberg@hotmail.com

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import WelcomeScreen from './screens/welcomeScreen';
import WelcomeLanguageScreen from './screens/welcomeLanguageScreen';

export const WelcomeStack = createStackNavigator({
    WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
        header: null,
      },
  },
  WelcomeLanguageScreen: {
    screen: WelcomeLanguageScreen,
    navigationOptions: {
        header: null,
      },
  },
});
