// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

import React, { Component } from 'react';
import RNRestart from 'react-native-restart';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, BackHandler, ToastAndroid} from 'react-native';
import I18n, { languageRealm, realm, languageR } from './i18n/i18n';
import { ACTION, BACKGROUND_COLOR, TEXT_COLOR, REALM_LENGTH } from './styles';


class LoadingContentStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      realmLength: languageR.length,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.interval = setInterval(() => {
      this.setState({ realmLength: languageR.length });
      if(this.state.realmLength >= REALM_LENGTH){
        RNRestart.Restart();

      }
    }, 500);
  }

  handleBackButton() {
    ToastAndroid.show('Cannot go back during the download', ToastAndroid.SHORT);
    return true;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    clearInterval(this.interval);
  }

  percentageConverter(denominator, numerator){
    let res = (denominator / numerator) * 100 ;
    return res.toFixed(0);
  }

  languageDecoder(){
    let lang = languageR[0].name;
    if (lang === 'en'){
      return 'English';
    }
    else if (lang === 'sv'){
      return 'Svenska';
    }
    else if (lang === 'svSimple'){
      return 'Lätt svenska';
    }
    else if (lang === 'svKids'){
      return 'Barnens audioguide';
    }
    else if (lang === 'seSme'){
      return 'Davvisámegiella';
    }
    else if (lang === 'seSmj'){
      return 'Julevsámegiella';
    }
    else if (lang === 'seSma'){
      return 'Åarjelsaemien';
    }
    else if (lang === 'de'){
      return 'Deutsch';
    }
    else if (lang === 'es'){
      return 'Español';
    }
    else if (lang === 'ru'){
      return 'Pусский';
    }
    else if (lang === 'fi'){
      return 'Suomi';
    }
    else if (lang === 'it'){
      return 'Italiano';
    }
    else if (lang === 'ar'){
      return 'العربية';
    }
    else if (lang === 'zh'){
      return '简体中文';
    }
  }


  render() {
    return (
      <View style={s.container}>
        <ImageBackground style={s.bgImg} source={require('./Images/welcome.png')}>
        <View style={s.containerOfText}>
          <Text style={s.text}>
            Downloading
          </Text>
          <Text style={s.text}>
            {this.languageDecoder()}
          </Text>
          <Text style={s.text}>
            language package {this.percentageConverter(this.state.realmLength, REALM_LENGTH)} %
          </Text>
          <ActivityIndicator size='large' color={ACTION} />
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerOfText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    color: TEXT_COLOR,
    opacity: 0.8,
  },
  realmText: {
    fontSize: 25,
    color: ACTION,
  },
});


export default LoadingContentStack;
