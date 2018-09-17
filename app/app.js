// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

// Copyright(c) 2018 Gustav Kjellberg, Gustaf Lidfeldt, Diar Sabri, Maria Lindblad,
// Lars Lundin, Carl Hultberg, Bruhan Hashi, Sebastian Franzén, Jesper Öberg,
// Björn Aurell Hansson, Tommy Samuelsson. gustav.kjellberg@hotmail.com

import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Tabs } from './rootNavScreen';
import { WelcomeStack } from './rootWelcomeScreen';
import { MainStack } from './rootScreen';
import { Player, MediaStates } from 'react-native-audio-toolkit';
//import SplashScreen from 'react-native-splash-screen';
import RNRestart from 'react-native-restart';
import AudioPlayer from './screens/audioPlayer';
import { NAV_BAR_HEIGHT, AUDIO_PLAYER_HEIGHT, REALM_LENGTH } from './styles';
import I18n, { languageRealm, realm, languageR } from './i18n/i18n';



import RNFetchBlob from 'react-native-fetch-blob';

import WelcomeLanguageScreen from './screens/welcomeLanguageScreen';

class App extends Component {
  constructor() {
    super()
    this.state = {
      audio: new Player(),
      bottomScreen: false,
      logo: require('./assets/PlayButton.png'),
      array: null,
      index: 0,
      maxIndex: 0,
      audioName: '',
      audioNumber: '',
      highlight: '',
      duration: '',
      pathArray: [],
      welcome: String(I18n.locale),
      prog: '0',
      rtl: false,
    };
    this.createAudio = this.createAudio.bind(this);
    this.addAudioPlayer = this.addAudioPlayer.bind(this);
    this.changeLogo = this.changeLogo.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.previousSong = this.previousSong.bind(this);
    this.restart = this.restart.bind(this);
  }


componentWillMount() {
  this.state.audio.destroy();
  this.pathFinder();
  this.RTL();
}

RTL(){
  if(this.state.welcome === 'ar'){ 
      this.setState({rtl: true});
    }
}

pathFinder(){
  let array = [];
  for (let i = 1; i < languageR.length; i++ ){
    array.push({ path: languageR[i].path, number: languageR[i].number })
  }
  this.setState({ pathArray: array });
  //alert('IN PATCHFINDER\n\n' + 'pathArray length:\n' + array.length + '\n\n' + 'prog: \n' + this.state.prog + '\n\n' + 'languageR.length: \n'+ languageR.length);
  this.downloadHealthChecker(array.length);

}

downloadHealthChecker(array){
  if(array < REALM_LENGTH-1){
    Alert.alert("error code: #101" , I18n.t('interruptedDownload'));
  }
  else if(array > REALM_LENGTH-1){
    Alert.alert("error code: #202" , I18n.t('interruptedDownload'));
  }/*else if (array === REALM_LENGTH-1){
    Alert.alert("error code: #303" , I18n.t('interruptedDownload'));
  }*/
}

restart(){
  this.props.navigation.navigate('LoadingContent');
}

  createAudio(newAudio) {
    this.setState({ audio: new Player(newAudio, { continuesToPlayInBackground: true }).prepare().on('ended', () => { this.nextSong() }) });
  }

  addAudioPlayer(path, array, index, maxIndex, text, number, highlightNum, duration){
    console.log('pathArray: ', this.state.pathArray);
    for(let i=0; i<this.state.pathArray.length; i++){
      if(this.state.pathArray[i].number==number){
        path = this.state.pathArray[i].path;
      }
    }
    //alert('path:\n' + path + '\n\n' + 'pathArray length:\n' + this.state.pathArray.length + '\n\n' + 'pathArray:\n' + this.state.pathArray);
    if(this.state.audio !== ''){
      this.state.audio.destroy();
      this.setState({ audioNumber: '' });
    }
    this.createAudio(path);
    this.setState({ bottomScreen: true, logo: require('./assets/PauseButton.png'), array: array, index: index, maxIndex: maxIndex, audioName: text, audioNumber: number, duration: duration, highlight: highlightNum });
    setTimeout(()=>this.state.audio.play(),150);
  }

  changeLogo() {
    if (this.state.logo == require('./assets/PauseButton.png')) {
      this.setState({ logo: require('./assets/PlayButton.png') });
    } else {
      this.setState({ logo: require('./assets/PauseButton.png') });
    }
  }

  bottomComponent() {
    if (this.state.bottomScreen) {
      return (
        <View style={{ height: AUDIO_PLAYER_HEIGHT, position: 'absolute', left: 0, right: 0, bottom: NAV_BAR_HEIGHT }}>
          <AudioPlayer
            audio = {this.state.audio}
            logo = {this.state.logo}
            changeLogo = {this.changeLogo}
            nextSong = {this.nextSong}
            previousSong = {this.previousSong}
            audioName = {this.state.audioName}
            audioNumber = {this.state.audioNumber}
            highlight = {this.state.highlight}
            duration = {this.state.duration}
            rtl = {this.state.rtl}
          />
        </View>
      )
    }
  }

  nextSong() {
    if (this.state.index == this.state.maxIndex) {
      this.state.audio.destroy();
      this.setState({ bottomScreen: false, audio: '', audioNumber: ''  });
    }else{
      let newFilePath = this.state.array[String(this.state.index+1)].filePath;
      let audioName = this.state.array[String(this.state.index+1)].text;
      let audioNumber = this.state.array[String(this.state.index+1)].number;
      let highlight = this.state.array[String(this.state.index+1)].highlight;
      let duration = this.state.array[String(this.state.index+1)].duration;
      this.addAudioPlayer(newFilePath, this.state.array, this.state.index+1, this.state.maxIndex, audioName, audioNumber, highlight, duration);
    }
  }

  previousSong() {
    if (this.state.index == 0) {
      this.state.audio.destroy();
      this.setState({ bottomScreen: false, audio: '', audioNumber: ''  });
    }else{
      let newFilePath = this.state.array[String(this.state.index-1)].filePath;
      let audioName = this.state.array[String(this.state.index-1)].text;
      let audioNumber = this.state.array[String(this.state.index-1)].number;
      let highlight = this.state.array[String(this.state.index-1)].highlight;
      let duration = this.state.array[String(this.state.index-1)].duration;
      this.addAudioPlayer(newFilePath, this.state.array, this.state.index-1, this.state.maxIndex, audioName, audioNumber, highlight, duration);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Tabs
          screenProps={{
          currentAudio: this.state.audio,
          bottomScreen: this.state.bottomScreen,
          logo: this.state.logo,
          createAudio: this.createAudio,
          addAudioPlayer: this.addAudioPlayer,
          changeLogo: this.changeLogo,
          nextSong: this.nextSong,
          previousSong: this.previousSong,
          audioNumber: this.state.audioNumber,
          restart: this.restart,
          rtl: this.state.rtl,
          }}
        />
        {this.bottomComponent()}
      </View>
    );
  }

}


export default App;
