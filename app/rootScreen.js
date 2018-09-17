// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

// Copyright(c) 2018 Gustav Kjellberg, Gustaf Lidfeldt, Diar Sabri, Maria Lindblad,
// Lars Lundin, Carl Hultberg, Bruhan Hashi, Sebastian Franzén, Jesper Öberg,
// Björn Aurell Hansson, Tommy Samuelsson. gustav.kjellberg@hotmail.com

import React, { Component } from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { Tabs } from './rootNavScreen';
import { WelcomeStack } from './rootWelcomeScreen';
import App from './app';
import LoadingStack from './loadingStack';
import LoadingContentStack from './loadingContent';



export const MainStack = createSwitchNavigator(

  {
    Loading: LoadingStack,
    Welcome: WelcomeStack,
    LoadingContent: LoadingContentStack,
    App: App,
  },
  {
    initialRouteName: 'Loading',
  }
);
