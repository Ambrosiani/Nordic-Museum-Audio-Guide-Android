// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

import React, { Component } from 'react';
import {MainStack} from './rootScreen';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, } from 'react-native'

class stackSwitcher extends Component {
    render() {
        return <MainStack  />;
    }
}


export default stackSwitcher;