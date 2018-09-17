// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

// Copyright(c) 2018 Gustav Kjellberg, Gustaf Lidfeldt, Diar Sabri, Maria Lindblad,
// Lars Lundin, Carl Hultberg, Bruhan Hashi, Sebastian Franzén, Jesper Öberg,
// Björn Aurell Hansson, Tommy Samuelsson. gustav.kjellberg@hotmail.com

import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Image, View } from 'react-native';
import HighlightScreen from './screens/highlightscreen';
import TourstopScreen from './screens/tourstopscreen';
import SearchByNumberScreen from './screens/searchByNumberScreen';
import InfoScreen from './screens/infoScreen';
import Language from './screens/language';
import AboutApp from './screens/aboutApp';
import AboutMuseum from './screens/aboutMuseum';
import AmenitiesScreen from './screens/amenitiesScreen';
import WelcomeScreen from './screens/welcomeScreen';
import WelcomeLanguageScreen from './screens/welcomeLanguageScreen';
import I18n from './i18n/i18n';
//import Icon from 'react-native-vector-icons/Ionicons';
import { HEADER_BACKGROUND_COLOR, NAV_BAR_TEXT, NAV_BAR_BACKGROUND, ACTION, NAV_BAR_HEIGHT } from './styles';
//import NearMeScreen from './screens/nearMeScreen';

export const BrowserStack = createStackNavigator({
  Browser: {
    screen: HighlightScreen,
    navigationOptions: {
      headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
      title: I18n.t('storiesScreen_Title'),
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1
      },
    },
  },
  TourstopScreen: {
    screen: TourstopScreen,
    navigationOptions: {
      headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
      title: I18n.t('storiesScreen_Title'),
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1
      },
      headerRight: (<View />)
    },
  },
});
/*export const NearMeStack = StackNavigator({
   NearMe: {
    screen: NearMeScreen,
      navigationOptions:{
        headerStyle: {backgroundColor: HEADER_BACKGROUND_COLOR},
        title: I18n.t('settingsScreen_NearMeHeader'),
        headerTitleStyle:{
          textAlign: 'center',
          flexGrow: 1
        },
      },
    },
});*/
export const InfoStack = createStackNavigator({
  Info: {
    screen: InfoScreen,
    navigationOptions: {
      headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
      title: I18n.t('museumScreen_Title'),
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1
      },
    },
  },
  Language: {
    screen: Language,
    navigationOptions: {
      headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
      title: I18n.t('settingsScreen_Title'),
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1
      },
      headerRight: (<View />)
    },
  },
  AboutApp: {
    screen: AboutApp,
    navigationOptions: {
      headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
      title: I18n.t('aboutTheAppScreen_Title'),
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1
      },
      headerRight: (<View />)
    },
  },
  AboutMuseum: {
    screen: AboutMuseum,
    navigationOptions: {
      headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
      title: I18n.t('museumScreen_ListItem1Label'),
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1
      },
      headerRight: (<View />)
    },
  },
  AmenitiesScreen: {
    screen: AmenitiesScreen,
    navigationOptions: {
      headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
      title: I18n.t('amenitiesScreen_Title'),
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1
      },
      headerRight: (<View />)
    },
  },
});
export const SearchByNumberStack = createStackNavigator({
  SearchByNumberScreen: {
    headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
    screen: SearchByNumberScreen,
    navigationOptions: {
      header: null,
    },
  },
  TourstopScreenSearch: {
    screen: TourstopScreen,
    navigationOptions: {
      headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
      title: I18n.t('storiesScreen_Title'),
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1
      },
      headerRight: (<View />)
    },
  },
});


export const Tabs = createBottomTabNavigator({
    /*NearMe:{
        screen: NearMeStack,
        navigationOptions: {
            headerStyle: {backgroundColor: HEADER_BACKGROUND_COLOR},
            tabBarLabel: I18n.t('nearMeScreen_Title'),
            tabBarIcon: ({ tintcolor }) => (<Image source={require('./assets/nearTab.png')}/>)
        },
    },*/
  Browser: {
    screen: BrowserStack,
    navigationOptions: {
      headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
      tabBarLabel: I18n.t('storiesScreen_Title'),
      tabBarIcon: ({ tintcolor, focused }) => {
        return <Image source={focused ? require('./assets/storiesTabSelected.png') : require('./assets/storiesTab.png')} />},
    },
  },
  Search: {
    screen: SearchByNumberStack,
    navigationOptions: {
      headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
      tabBarLabel: I18n.t('searchScreen_Title'),
      tabBarIcon: ({ tintcolor, focused}) => {
        return <Image source={focused ? require('./assets/searchTabSelected.png') : require('./assets/searchTab.png')} />},
    },
  },
  Info: {
    screen: InfoStack,
    navigationOptions: {
      headerStyle: { backgroundColor: HEADER_BACKGROUND_COLOR },
      tabBarLabel: I18n.t('museumScreen_Title'),
      tabBarIcon: ({ tintcolor, focused }) => {
        return <Image source={focused ? require('./assets/museumTabSelected.png') : require('./assets/museumTab.png')} />},
     },
  },
 },

  {
    lazyLoad: false,
    tabBarOptions: {
      showLabel: true,
      showIcon: true,
      upperCaseLabel: false,
      pressColor: ACTION,
      style: {
        backgroundColor: NAV_BAR_BACKGROUND,
        height: NAV_BAR_HEIGHT,
      },
      labelStyle: {
        color: NAV_BAR_TEXT,
        fontSize: 12,
      },
      iconStyle: {
        height: 32,
        width: 32,
        marginTop: -4,
        marginBottom: -8,
      },
    }
  });
