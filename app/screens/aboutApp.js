// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

// Copyright(c) 2018 Gustav Kjellberg, Gustaf Lidfeldt, Diar Sabri, Maria Lindblad,
// Lars Lundin, Carl Hultberg, Bruhan Hashi, Sebastian Franzén, Jesper Öberg,
// Björn Aurell Hansson, Tommy Samuelsson. gustav.kjellberg@hotmail.com

import React, { Component } from 'react';
import AudioPlayer from './audioPlayer';
import I18n, { languageRealm, realm, languageR } from '../i18n/i18n';
import RNRestart from 'react-native-restart';
import Realm from 'realm';

import {
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  AsyncStorage,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const cellWidth = width;
const cellHeight = height * 2 / 3;
const buttonHeight = height * 1 / 18;

import { TEXT_COLOR, BACKGROUND_COLOR, AUDIO_PLAYER_HEIGHT } from '../styles';

const s = StyleSheet.create({

  scrollContainer: {
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    marginLeft: 16,
    marginRight: 16,
  },
  textHeader: {
    marginTop: 16,
    fontSize: 20,
    color: TEXT_COLOR,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    color: TEXT_COLOR
  },
  filler: {
    height: AUDIO_PLAYER_HEIGHT,
  },
});

class AboutApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      aboutTheAppProjectManagerNordicMuseumBody: 'Nordic Museum: Aron Ambrosiani',
      aboutTheAppDevelopmentAndDesignBody: 'Maria Lindblad\nTommy Samuelsson',
      aboutTheAppAdvisoryTeamBody: 'Nordic Museum: Vanessa Gandy\nNordic Museum: Loredana Jelmini\nNordic Museum: Sven Rentzhog',
      aboutTheAppAppIconBody: 'Ann-Sofi Marminge Design',
      aboutTheAppTranslationsBody: 'BTI Studios',
      aboutTheAppPhotoCreditsBody: 'Welcome Image: NMA.03906 Photo: Karl-Erik Granath\nHighlights: NMA.0030770 Photo: Karl Heinz Hernried\nTraditions: NMA.0029961 Photo: Karl Heinz Hernried\nTable Settings: NMA.0036167 Photo: Karl-Erik Granath\nPower of Fashion: NMA.0038609 Photo: Nordin Nilsson\nTextile Gallery: NMA.0027979 Photo: Mats Landin\nSápmi: NMA.0056303 Photo: Rolf Kjellström\nSwedish Folk Art: NM.0050874 Photo: Karolina Kristensson\nHomes and Interiors: NMA.0033276 Photo: Unknown © Nordiska museets arkiv\nPhoto of the Nordic Museum: photo by John Swan/Canopy Aero',
    };
  }

  render() {
    return (
      <ScrollView style={s.scrollContainer}>
        <View style={s.container}>
          <Text style={s.textHeader} selectable={true}>
            {I18n.t('aboutTheAppAudioContentHeader')}
          </Text>
          <Text style={s.text} selectable={true}>
            {I18n.t('aboutTheAppAudioContentBody')}
          </Text>
          <Text style={s.textHeader} selectable={true}>
            {I18n.t('aboutTheAppTheAppHeader')}
          </Text>
          <Text style={s.text} selectable={true}>
            {I18n.t('aboutTheAppTheAppBody')}
          </Text>
          <Text style={s.textHeader} selectable={true}>
            {I18n.t('aboutTheAppProjectManagerNordicMuseumHeader')}
          </Text>
          <Text style={s.text} selectable={true}>
            {this.state.aboutTheAppProjectManagerNordicMuseumBody}
          </Text>
          <Text style={s.textHeader} selectable={true}>
            {I18n.t('aboutTheAppDevelopmentAndDesignHeader')}
          </Text>
          <Text style={s.text} selectable={true}>
            {this.state.aboutTheAppDevelopmentAndDesignBody}
          </Text>
          <Text style={s.textHeader} selectable={true}>
            {I18n.t('aboutTheAppAdvisoryTeamHeader')}
          </Text>
          <Text style={s.text} selectable={true}>
            {this.state.aboutTheAppAdvisoryTeamBody}
          </Text>
          <Text style={s.textHeader} selectable={true}>
            {I18n.t('aboutTheAppAppIconHeader')}
          </Text>
          <Text style={s.text} selectable={true}>
            {this.state.aboutTheAppAppIconBody}
          </Text>
          <Text style={s.textHeader} selectable={true}>
            {I18n.t('aboutTheAppTranslationsHeader')}
          </Text>
          <Text style={s.text} selectable={true}>
            {this.state.aboutTheAppTranslationsBody}
          </Text>
          <Text style={s.textHeader} selectable={true}>
            {I18n.t('aboutTheAppPhotoCreditsHeader')}
          </Text>
          <Text style={s.text} selectable={true}>
           {I18n.t('aboutTheAppPhotoCreditsBody')}
          </Text>
          <View style={s.filler} />
        </View>
      </ScrollView>
    );
  }
}

export default AboutApp;
