// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

// Copyright(c) 2018 Gustav Kjellberg, Gustaf Lidfeldt, Diar Sabri, Maria Lindblad,
// Lars Lundin, Carl Hultberg, Bruhan Hashi, Sebastian Franzén, Jesper Öberg,
// Björn Aurell Hansson, Tommy Samuelsson. gustav.kjellberg@hotmail.com

import React, { Component } from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import AudioPlayer from './audioPlayer';
import I18n, { languageRealm, realm, languageR } from '../i18n/i18n';
import RNRestart from 'react-native-restart';
import Realm from 'realm';
import { ACTION, BACKGROUND_COLOR, TEXT_COLOR, TEXT_COLOR_2, SELECTED, AUDIO_PLAYER_HEIGHT } from '../styles';
import {
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';





class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

    changeScreen() {
        this.props.navigation.navigate('WelcomeLanguageScreen');
    }



  render() {
    return (
      <View style={s.container}>
        <ImageBackground style={s.bgImg} source={require('../Images/welcome.png')}>
            <Text style={s.text}>
                WELCOME
            </Text>

        <TouchableOpacity style={s.btnContainer} onPress={() => { this.changeScreen(); } }>
            <Text style={s.btnText}>
                LET’S GET STARTED
            </Text>
        </TouchableOpacity>


        </ImageBackground>

      </View>
    );
  }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
    },
    bgImg: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 40,
        color: TEXT_COLOR,
        opacity: 0.8,
        marginBottom: 32,
    },
    btnContainer: {
        width: 250,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ACTION,
        borderRadius: 4,
        marginBottom: 32,

    },
    btnText: {
        fontSize: 20,
        color: TEXT_COLOR_2,
      },
  });

export default WelcomeScreen;
