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
    ScrollView,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    TouchableOpacity,
    I18nManager,
} from 'react-native';

class WelcomeLanguageScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  downloadManager(lang){
    console.log("downloading");
    let json = require('../soundInfo/soundInfo.json');
    for (let i in json[lang]) {
      RNFetchBlob
      .config({
        fileCache : true,
        useDownloadManager : true,
      })
      .fetch('GET', json[lang][String(i)]["filepath"], {})
      .then((res) => {
        console.log("Download");
        console.log('The file saved to ', res.path());
        realm.write(() => {
          let lang = realm.create('languageRealm', {
            path: res.path(),
            number: i,
          });
        });
      })
    }
  }

  langOption(lang){
    this.downloadManager(lang);
    realm.write(() => {
      languageR[0].name = lang;
    });
  }


    changeScreen(lang) {
        this.langOption(lang);
        if(lang === 'ar'){ 
            I18nManager.forceRTL(true);
        }else{
            I18nManager.forceRTL(false);
        }
        this.props.navigation.navigate('LoadingContent');
    }

    render() {
        return (
        <View style={s.container}>
            <ImageBackground style={s.bgImg} source={require('../Images/welcome.png')}>
                <ScrollView>
                    <View style={s.ScrollContainer}>
                        <Text style={s.text}>
                            Choose a language below
                        </Text>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('en'); }}>
                            <Text style={s.btnText}>
                                English
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('sv'); }}>
                            <Text style={s.btnText}>
                                Svenska
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('svSimple'); }}>
                            <Text style={s.btnText}>
                                Lätt svenska
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('svKids'); }}>
                            <Text style={s.btnText}>
                                Barnens audioguide
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('seSme'); }}>
                            <Text style={s.btnText}>
                                Davvisámegiella
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('seSmj'); }}>
                            <Text style={s.btnText}>
                                Julevsámegiella
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('seSma'); }}>
                            <Text style={s.btnText}>
                                Åarjelsaemien
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('de'); }}>
                            <Text style={s.btnText}>
                                Deutsch
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('es'); }}>
                            <Text style={s.btnText}>
                                Español
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('ru'); }}>
                            <Text style={s.btnText}>
                                Pусский
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('fi'); }}>
                            <Text style={s.btnText}>
                                Suomi
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('it'); }}>
                            <Text style={s.btnText}>
                              Italiano
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('ar'); }}>
                            <Text style={s.btnText}>
                                العربية
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.btnContainer}  onPress={() => { this.changeScreen('zh'); }}>
                            <Text style={s.btnText}>
                                简体中文
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
        );
    }
}

const s = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUND_COLOR,
    },
    bgImg: {
        height: '100%',
        width: '100%',
    },
    ScrollContainer: {
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 30,
        color: TEXT_COLOR,
        opacity: 0.8,
        marginTop: 200,
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

export default WelcomeLanguageScreen;
