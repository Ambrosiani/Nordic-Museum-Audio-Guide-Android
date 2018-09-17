// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

import React, { Component } from 'react';
import { View, Text, ActivityIndicator, } from 'react-native';
import I18n, { languageRealm, realm, languageR } from './i18n/i18n';
import { ACTION, } from './styles';
import RNFetchBlob from 'react-native-fetch-blob';
import SplachScreen from 'react-native-splash-screen';


class LoadingStack extends Component {
  componentDidMount(){
    SplachScreen.hide();
  }
  constructor(props){
    super(props);
    this.state = {
      realmValue: languageR[0].name,
    }
  }
  componentWillMount(){
    if(this.state.realmValue === 'none'){
      this.props.navigation.navigate('Welcome');
    }
    else{
      this.props.navigation.navigate('App')
    }
  }

  render() {
    return (
      <View>
        <ActivityIndicator size='large' color={ACTION} />
      </View>
    );
  }

}

export default LoadingStack;
