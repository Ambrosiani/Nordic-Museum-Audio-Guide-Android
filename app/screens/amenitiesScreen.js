// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

// Copyright(c) 2018 Gustav Kjellberg, Gustaf Lidfeldt, Diar Sabri, Maria Lindblad,
// Lars Lundin, Carl Hultberg, Bruhan Hashi, Sebastian Franzén, Jesper Öberg,
// Björn Aurell Hansson, Tommy Samuelsson. gustav.kjellberg@hotmail.com

import React, { Component } from 'react';
import I18n from '../i18n/i18n';
import AmenitiesScreenDetails from './amenitiesScreenDetails'

import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const cellWidth = width;
const cellHeight = height * 2 / 3;
const buttonHeight = height * 1 / 18;

import { BACKGROUND_COLOR, AUDIO_PLAYER_HEIGHT } from '../styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  filler: {
    height: AUDIO_PLAYER_HEIGHT,
  },
});

class AmenitiesScreen extends Component {
  constructor() {
    super();

    var json = require('../amenities/amenities.json');
    var array = [];
    var json_length = Object.keys(json).length;
    var required;
    for (var i = 0; i < json_length; i++) {
      required = this.sourceFinder(String(i));
      array.push({ number: String(i), string: json[String(i)]["string"], floors: json[String(i)]["floors"], dropDown: false, icon: required});
    }
    this.state = {
      amenities: array,
    };
  }

  renderAmenities() {
    return this.state.amenities.map(amenity =>
      <AmenitiesScreenDetails key={amenity.number} number={amenity.number} string={amenity.string} floors={amenity.floors} dropDown={amenity.dropDown} icon={amenity.icon} />
    );
  }

  sourceFinder(imgIndex) {
    switch (imgIndex) {
      case "0":
        return require('../Images/toilets.png');
        break;
      case "1":
        return require('../Images/cloakroom.png');
        break;
      case "2":
        return require('../Images/babyChangingTable.png');
        break;
      case "3":
        return require('../Images/lunchroom.png');
        break;
      case "4":
        return '';
        break;
      case "5":
        return require('../Images/info.png');
        break;
      case "6":
        return '';
        break;
      case "7":
        return '';
        break;
      case "8":
        return require('../Images/wheelchairEntrance.png');
        break;
      case "9":
        return '';
        break;
      case "10":
        return require('../Images/shop.png');
        break;
      case "11":
        return require('../Images/restaurant.png');
        break;
      case "12":
        return '';
        break;
      case "13":
        return require('../Images/strollerParking.png');
        break;
      case "14":
        return '';
        break;
      case "15":
        return '';
        break;
      case "16":
        return '';
        break;

    }
  }

  render() {
    return (
      <ScrollView style={s.container}>
        <View>
          {this.renderAmenities()}
        </View>
        <View style={s.filler} />
      </ScrollView>

    );
  }
}

export default AmenitiesScreen;
