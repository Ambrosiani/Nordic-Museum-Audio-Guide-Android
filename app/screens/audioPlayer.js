// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

// Copyright(c) 2018 Gustav Kjellberg, Gustaf Lidfeldt, Diar Sabri, Maria Lindblad,
// Lars Lundin, Carl Hultberg, Bruhan Hashi, Sebastian Franzén, Jesper Öberg,
// Björn Aurell Hansson, Tommy Samuelsson. gustav.kjellberg@hotmail.com

import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, Dimensions, } from 'react-native';
import { Player, MediaStates } from 'react-native-audio-toolkit';
import { AUDIO_PLAYER_COLOR, HIGHLIGHTS_TEXT, HIGHLIGHTS, TEXT_COLOR_2, ACTION, SELECTED } from '../styles';

const { width, height } = Dimensions.get('window');
const cellWidth = width;

const s = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: AUDIO_PLAYER_COLOR,
    borderColor: '#000000',
    borderBottomWidth: 1,
  },
  progressBarContainer: {
    //flexDirection: 'row-reverse',
    backgroundColor: SELECTED,
    height: 4,
  },
  audioDurationContainer: {
    backgroundColor: ACTION,
    height: 4,
  },
  audioTitleContainer: {
   // backgroundColor: 'blue',
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    justifyContent: "space-between",
  },
  audioTitleCenter: {
    //backgroundColor: 'red',
    justifyContent: 'center',
    //alignItems: "center",
    width: '70%',
    flexDirection: 'row',
  },
  audioTitleEdge: {
    //backgroundColor: 'green',
    marginLeft: 4,
    marginRight: 4,
  },
  audioTitleNumber: {
    color: TEXT_COLOR_2,
    fontSize: 15,
    marginLeft: 4,
    marginRight: 4,
  },
  audioTitleNameContainer: {
    //height: 10,
    maxWidth: '85%',
    //backgroundColor: 'yellow',
  },
  audioTitleName: {
    flex: 1,
    color: TEXT_COLOR_2,
    fontSize: 15,
  },
  audioPlayer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    shadowColor: '#0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    flexDirection: 'row'
  },
  audioIcon: {
    height: 30,
    width: 30,
  },
  highlightContainer: {
    borderRadius: 4,
    marginRight: 8,
  },
});

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progBarWidth: 0,
      timePast: 0,
      progBarDirection: 'row',
    };
  }

  componentWillMount() {
    if (this.props.logo == require('../assets/PauseButton.png')) {
      this.props.audio.play();
    }
    if(this.props.rtl === true){
      this.setState({ progBarDirection: 'row-reverse' });
    }
  }

  PlayPause = () => {
    if (this.props.logo == require('../assets/PauseButton.png')) {
      this.props.audio.pause();
      this.props.changeLogo();
    } else {
      this.props.audio.play();
      this.props.changeLogo();
    }
  }

  Next = () => {
    this.props.nextSong();
  }

  Previous = () => {
    this.props.previousSong();
  }

  renderNumber(){
    if (this.props.highlight == 1){
      return(
        <View style={[s.highlightContainer, { backgroundColor: HIGHLIGHTS }]}>
          <Text style={[s.audioTitleNumber, { color: HIGHLIGHTS_TEXT }]}>
            {this.props.audioNumber}
          </Text>
        </View>
      )
    }else {
      return(
        <View style={[s.highlightContainer, { backgroundColor: AUDIO_PLAYER_COLOR }]}>
          <Text style={[s.audioTitleNumber, { color: TEXT_COLOR_2 }]}>
            {this.props.audioNumber}
          </Text>
        </View>
      )
    }
  }

  prog(){
    if (this.props.audio.currentTime < 0) {
      this.setState({
        timeProg: this.props.audio.currentTime,
        progBarWidth: 0,
      });
    }
    else {
      this.setState({
        timeProg: this.props.audio.currentTime,
        progBarWidth: (this.props.audio.currentTime/this.props.audio.duration) * cellWidth,
      });
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.props.logo == require('../assets/PauseButton.png')) {
        this.prog();
      }
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  pad(n) {
    if (n < 0){
      n = 0;
    }
    return (n < 10) ? ("0" + n) : n;
  }

  millisecondsToTime(time){
    return this.pad(Math.floor(time / 60000)) + ':' + this.pad(((time - (time % 1000)) / 1000) % 60)
  }
  // info(){
  //   alert(this.props.audio.duration);
  // }

  renderBackArrow(){
    if(this.props.rtl === true){
      return(
        <TouchableOpacity onPress={this.Next}>
          <Image style={s.audioIcon} source={require('../assets/SkipButton.png')} />
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity onPress={this.Previous}>
          <Image style={[s.audioIcon, {transform: [{ rotate: '180deg' }] }]} source={require('../assets/SkipButton.png')} />
        </TouchableOpacity>
      )
    }
  }

  renderForwardArrow(){
    if(this.props.rtl === true){
      return(
        <TouchableOpacity onPress={this.Previous}>
          <Image style={[s.audioIcon, {transform: [{ rotate: '180deg' }] }]} source={require('../assets/SkipButton.png')} />
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity onPress={this.Next}>
          <Image style={s.audioIcon} source={require('../assets/SkipButton.png')} />
        </TouchableOpacity>
      )
    }
  }

  timeSeter(typeOftime){
    if (this.props.rtl === true && typeOftime === 'duration' || this.props.rtl === false && typeOftime === 'prog') {
      return(
        <Text style={s.audioTitleName}>
          { this.millisecondsToTime(this.state.timeProg) }
        </Text>
      )
    }
    else {
      return(
        <Text style={s.audioTitleName}>
          { this.millisecondsToTime(this.props.audio.duration) }
        </Text>
      )
    }
  }

  render(){
    return (
      <View style={s.container}>
        <View style={[s.progressBarContainer, { flexDirection: this.state.progBarDirection }]}>
          <View style={[s.audioDurationContainer, {width: this.state.progBarWidth }]}/>
        </View>
        <View style={s.audioTitleContainer}>
          <View style={s.audioTitleEdge}>
              { this.timeSeter('prog') }
          </View>
          <View style={s.audioTitleCenter}>
            { this.renderNumber() }
            <View style={s.audioTitleNameContainer}>
              <Text numberOfLines={1} style={s.audioTitleName}>
                {this.props.audioName}
              </Text>
            </View>
            
          </View>
          <View style={s.audioTitleEdge}>
          { this.timeSeter('duration') }
          </View>
        </View>
        <View style={s.audioPlayer}>
          { this.renderBackArrow() }
          <TouchableOpacity onPress={this.PlayPause}>
            <Image style={s.audioIcon} source={this.props.logo} />
          </TouchableOpacity>
          { this.renderForwardArrow() }
        </View>
      </View>
    );
  };
}

export default AudioPlayer;
