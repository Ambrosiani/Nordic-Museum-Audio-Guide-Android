// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

// Copyright(c) 2018 Gustav Kjellberg, Gustaf Lidfeldt, Diar Sabri, Maria Lindblad,
// Lars Lundin, Carl Hultberg, Bruhan Hashi, Sebastian Franzén, Jesper Öberg,
// Björn Aurell Hansson, Tommy Samuelsson. gustav.kjellberg@hotmail.com

import React, { Component } from 'react';
import AudioPlayer from './audioPlayer';
import Language from './language';
import I18n from '../i18n/i18n';
import { BACKGROUND_COLOR, BORDER_COLOR_2, TEXT_COLOR, BUTTON_ON_PRESS_COLOR_2, AUDIO_PLAYER_HEIGHT } from '../styles';
import {
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const cellWidth = width;
const cellHeight = height * 2 / 3;
const buttonHeight = height * 1 / 18;


const s = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
  },
  topImg: {
    height: 310,
    width: '100%',
  },
  button: {
    height: 40,
    width: cellWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: BORDER_COLOR_2,
    borderBottomWidth: 1,
  },
  text: {
    marginLeft: 16,
    fontSize: 20,
    color: TEXT_COLOR,
  },
  image: {
    width: 50,
    height: 50,
  },
});

class InfoScreen extends Component {

  renderArrowRotation(){
    if(this.props.screenProps.rtl === true){
      return(
        <Image style={[s.image, { transform: [{ rotate: '180deg'}] }]} source={require('../assets/DisclosureIndicator.png')} />
      )
    }else{
      return(
        <Image style={s.image} source={require('../assets/DisclosureIndicator.png')} />
      )
    }
  }

  render() {
    return (
      <ScrollView style={s.container}>
        <Image style={s.topImg} source={require('../Images/museumBackground.png')} />
        <View >
          <TouchableHighlight underlayColor={BUTTON_ON_PRESS_COLOR_2} onPress={() => this.props.navigation.navigate('Language')}>
            <View style={s.button}>
              <Text style={s.text}>
                {I18n.t('settingsScreen_Title')}
              </Text>
              { this.renderArrowRotation() }
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={BUTTON_ON_PRESS_COLOR_2} onPress={() => this.props.navigation.navigate('AmenitiesScreen')}>
            <View style={s.button}>
              <Text style={s.text}>
                {I18n.t('amenitiesScreen_Title')}
              </Text>
              { this.renderArrowRotation() }
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={BUTTON_ON_PRESS_COLOR_2} onPress={() => this.props.navigation.navigate('AboutMuseum')}>
            <View style={s.button}>
              <Text style={s.text}>
                {I18n.t('museumScreen_ListItem1Label')}
              </Text>
              { this.renderArrowRotation() }
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={BUTTON_ON_PRESS_COLOR_2} onPress={() => this.props.navigation.navigate('AboutApp')}>
            <View style={s.button}>
              <Text style={s.text}>
                {I18n.t('aboutTheAppScreen_Title')}
              </Text>
              { this.renderArrowRotation() }
            </View>
          </TouchableHighlight>
          <View style={{ height: AUDIO_PLAYER_HEIGHT }} />
        </View>
      </ScrollView>
    );
  }
}

export default InfoScreen;
