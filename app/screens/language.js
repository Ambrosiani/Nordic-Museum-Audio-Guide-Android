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
import RNFetchBlob from 'react-native-fetch-blob';
import { BACKGROUND_COLOR, TEXT_COLOR, SELECTED, AUDIO_PLAYER_HEIGHT } from '../styles';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  I18nManager
} from 'react-native';

const { width, height } = Dimensions.get('window');
const cellWidth = width;
const cellHeight = height * 2 / 3;
const buttonHeight = height * 1 / 18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  button: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: BACKGROUND_COLOR,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: TEXT_COLOR,
  },
  image: {
    width: 50,
    height: 50,
  },
});

class Language extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.languageSelectBG();
  }

  languageSelectBG() {
    let isSelected = String(I18n.locale);

    this.setState({ bgColorSelectedEn: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedSv: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedSvSimple: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedSvKids: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedSeSme: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedSeSmj: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedSeSma: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedDe: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedEs: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedRu: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedFr: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedFi: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedIt: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedAr: BACKGROUND_COLOR });
    this.setState({ bgColorSelectedZh: BACKGROUND_COLOR });

    if (isSelected === 'en') {
      this.setState({ bgColorSelectedEn: SELECTED });
    }
    else if (isSelected === 'sv') {
      this.setState({ bgColorSelectedSv: SELECTED });
    }
    else if (isSelected === 'svSimple') {
      this.setState({ bgColorSelectedSvSimple: SELECTED });
    }
    else if (isSelected === 'svKids') {
      this.setState({ bgColorSelectedSvKids: SELECTED });
    }
    else if (isSelected === 'seSme') {
      this.setState({ bgColorSelectedSeSme: SELECTED });
    }
    else if (isSelected === 'seSmj') {
      this.setState({ bgColorSelectedSeSmj: SELECTED });
    }
    else if (isSelected === 'seSma') {
      this.setState({ bgColorSelectedSeSma: SELECTED });
    }
    else if (isSelected === 'de') {
      this.setState({ bgColorSelectedDe: SELECTED });
    }
    else if (isSelected === 'es') {
      this.setState({ bgColorSelectedEs: SELECTED });
    }
    else if (isSelected === 'ru') {
      this.setState({ bgColorSelectedRu: SELECTED });
    }
    else if (isSelected === 'fi') {
      this.setState({ bgColorSelectedFi: SELECTED });
    }
    else if (isSelected === 'it') {
      this.setState({ bgColorSelectedIt: SELECTED });
    }
    else if (isSelected === 'ar') {
      this.setState({ bgColorSelectedAr: SELECTED });
    }
    else if (isSelected === 'zh') {
      this.setState({ bgColorSelectedZh: SELECTED });
    }
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
  }


    changeScreen(lang) {
        this.langOption(lang);
        if(lang === 'ar'){ 
          I18nManager.forceRTL(true);
        }else{
          I18nManager.forceRTL(false);
        }
        this.props.screenProps.restart();
    }

  restart(language) {
    for(let i = 1; i < languageR.length; i++ ){
      RNFetchBlob.fs.unlink(languageR[i].path);
    }
    realm.write(() => {
      realm.deleteAll();
    })
    realm.write(() => {
      let lang = realm.create('languageRealm', {
        name: language,
      });
    });
    if(this.props.screenProps.currentAudio !== ''){
      this.props.screenProps.currentAudio.destroy();
    }
    this.changeScreen(language);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>

          <TouchableOpacity onPress={() => this.restart('en')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedEn }]}>
              <Text style={styles.text}>
                English
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.restart('sv')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedSv }]}>
              <Text style={styles.text}>
                Svenska
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.restart('svSimple')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedSvSimple }]}>
              <Text style={styles.text}>
                Lätt svenska
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.restart('svKids')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedSvKids }]}>
              <Text style={styles.text}>
                Barnens audioguide
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.restart('seSme')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedSeSme }]}>
              <Text style={styles.text}>
                Davvisámegiella
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.restart('seSmj')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedSeSmj }]}>
              <Text style={styles.text}>
                Julevsámegiella
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.restart('seSma')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedSeSma }]}>
              <Text style={styles.text}>
                Åarjelsaemien
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.restart('de')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedDe }]}>
              <Text style={styles.text}>
                Deutsch
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.restart('es')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedEs }]}>
              <Text style={styles.text}>
                Español
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.restart('ru')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedRu }]}>
              <Text style={styles.text}>
                Pусский
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.restart('fi')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedFi }]}>
              <Text style={styles.text}>
                Suomi
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.restart('it')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedIt }]}>
              <Text style={styles.text}>
                Italiano
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.restart('ar')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedAr }]}>
              <Text style={styles.text}>
                العربية
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.restart('zh')}>
            <View style={[styles.button, { backgroundColor: this.state.bgColorSelectedZh }]}>
              <Text style={styles.text}>
                简体中文
              </Text>
            </View>
          </TouchableOpacity>

        </View>
        <View style={{ height: AUDIO_PLAYER_HEIGHT }} />
      </ScrollView>
    );
  }
}

export default Language;
