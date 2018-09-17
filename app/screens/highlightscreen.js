// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

// Copyright(c) 2018 Gustav Kjellberg, Gustaf Lidfeldt, Diar Sabri, Maria Lindblad,
// Lars Lundin, Carl Hultberg, Bruhan Hashi, Sebastian Franzén, Jesper Öberg,
// Björn Aurell Hansson, Tommy Samuelsson. gustav.kjellberg@hotmail.com

import React, { Component } from 'react';
import AudioPlayer from './audioPlayer';
import { Player, MediaStates } from 'react-native-audio-toolkit';
import HighlightScreenDetails from './highlightscreenDetails';
import I18n from '../i18n/i18n';

import {
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  View,
  Text
} from 'react-native';

import { AUDIO_PLAYER_HEIGHT } from '../styles';

const { width, height } = Dimensions.get('window');
const cellWidth = width;
const cellHeight = height / 4;

class HighlightScreen extends Component {
  constructor(props) {
    super(props);

    var json = require('../soundInfo/exhibitionInfo.json');
    var lang = String(I18n.locale);
    var array = [];
    var json_length = Object.keys(json[lang]).length;
    var required;
    for (var i = 0; i < json_length; i++) {
      required = this.sourceFinder(json[lang][String(i)]["image"]);
      array.push({ 
        title: json[lang][String(i)]["name"], 
        image: required, 
        duration: json[lang][String(i)]["duration"], 
        songs: json[lang][String(i)]["sounds"], 
        floor: json[lang][String(i)]["floor"] });
    }
    this.state = { highlights: array };
  }

  renderHighlights() {
    return this.state.highlights.map(highlights =>
      <HighlightScreenDetails key={highlights.title + highlights.floor} title={highlights.title} image={highlights.image} duration={highlights.duration} songs={highlights.songs} floor={highlights.floor} learnMore={this.learnMore} />
    );
  }

  learnMore = (title, image, duration, floor, songs) => {
    this.props.navigation.navigate('TourstopScreen', { title, image, duration, floor, songs });
  }

  sourceFinder(imgIndex) {
    switch (imgIndex) {
      case "0":
        return require('../Images/highlights.png');
        break;
      case "1":
        return require('../Images/highlightsKids.png');
        break;
      case "2":
        return require('../Images/homesAndInteriors.png');
        break;
      case "3":
        return require('../Images/homesAndInteriors2.png');
        break;
      case "4":
        return require('../Images/homesAndInteriors3.png');
        break;
      case "5":
        return require('../Images/powerOfFashion.png');
        break;
      case "6":
        return require('../Images/sapmi.png');
        break;
      case "7":
        return require('../Images/swedishFolkArt.png');
        break;
      case "8":
        return require('../Images/tableSettings.png');
        break;
      case "9":
        return require('../Images/tableSettings2.png');
        break;
      case "10":
        return require('../Images/textileGallery.png');
        break;
      case "11":
        return require('../Images/traditions.png');
        break;

    }
  }

  render() {
    return (
      <ScrollView>
        {this.renderHighlights()}
        <View style={{ height: AUDIO_PLAYER_HEIGHT }} />
      </ScrollView>
    );
  }
}
export default HighlightScreen;
