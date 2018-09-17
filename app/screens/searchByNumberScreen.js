// Copyright(c) 2018 Stiftelsen Nordiska museet (Aron.Ambrosiani@nordiskamuseet.se), 
// Maria Lindblad (mali4@kth.se), 
// Anita Software Development AB (Tommy Samuelsson) (tommysam@kth.se).

// Copyright(c) 2018 Gustav Kjellberg, Gustaf Lidfeldt, Diar Sabri, Maria Lindblad,
// Lars Lundin, Carl Hultberg, Bruhan Hashi, Sebastian Franzén, Jesper Öberg,
// Björn Aurell Hansson, Tommy Samuelsson. gustav.kjellberg@hotmail.com

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, TouchableHighlight, Dimensions } from 'react-native';
import AudioPlayer from './audioPlayer';
import I18n from '../i18n/i18n';
import { HEADER_TEXT_COLOR, HEADER_BACKGROUND_COLOR, BACKGROUND_COLOR, TEXT_COLOR, BORDER_COLOR_1, BUTTON_ON_PRESS_COLOR_1, AUDIO_PLAYER_HEIGHT } from '../styles';



export default class SearchByNumberScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text1: ' ',
            text2: ' ',
            text3: ' ',
            searchString: ' ',
            headerText: I18n.t('searchScreen_Title'),
        };
    }

    addDigit(digit) {
        if (this.state.text1 === ' ') {
            this.setState({ text1: digit });
        } else if (this.state.text2 === ' ') {
            this.setState({ text2: digit });
        } else if (this.state.text3 === ' ') {
            this.setState({ text3: digit })
            this.searchForTrack(this.state.text1 + this.state.text2 + digit);
        }
    }

    learnMore = (title, image, duration, floor, songs) => {
        this.props.navigation.navigate('TourstopScreenSearch', { title, image, duration, floor, songs });
    }

    renderTourStop(theme) {
        var json = require('../soundInfo/exhibitionInfo.json');
        var lang = String(I18n.locale);
        var json_length = Object.keys(json).length;
        var required;
        if (json[lang][String(theme)]["image"] == "0") {
            required = require('../Images/highlights.png');
        } else if (json[lang][String(theme)]["image"] == "1") {
            required = require('../Images/highlightsKids.png');
        } else if (json[lang][String(theme)]["image"] == "2") {
            required = require('../Images/homesAndInteriors.png');
        }else if (json[lang][String(theme)]["image"] == "3") {
            required = require('../Images/homesAndInteriors2.png');
        }else if (json[lang][String(theme)]["image"] == "4") {
            required = require('../Images/homesAndInteriors3.png');
        }else if (json[lang][String(theme)]["image"] == "5") {
            required = require('../Images/powerOfFashion.png');
        }else if (json[lang][String(theme)]["image"] == "6") {
            required = require('../Images/sapmi.png');
        }else if (json[lang][String(theme)]["image"] == "7") {
            required = require('../Images/swedishFolkArt.png');
        }else if (json[lang][String(theme)]["image"] == "8") {
            required = require('../Images/tableSettings.png');
        }else if (json[lang][String(theme)]["image"] == "9") {
            required = require('../Images/tableSettings2.png');
        }else if (json[lang][String(theme)]["image"] == "10") {
            required = require('../Images/textileGallery.png');
        }else if (json[lang][String(theme)]["image"] == "11") {
            required = require('../Images/traditions.png');
        }

        this.learnMore(json[lang][String(theme)]["name"], required, json[lang][String(theme)]["duration"], json[lang][String(theme)]["floor"], json[lang][String(theme)]["sounds"]);
    }

    searchForTrack(searchString) {
        var jsonExh = require('../soundInfo/exhibitionInfo.json');
        var json = require('../soundInfo/soundInfo.json');
        var lang = String(I18n.locale);
        var array = [];
        var maxIndex = -1;
        var startIndex = 0;
        var track = json[lang][String(searchString)];
        if (typeof track === 'undefined') {
            this.setState({ headerText: I18n.t('tryAgain') });
            this.resetHeaderWithDelay();
            this.clearDigitWithDelay();
        } else {
            var theme = json[lang][String(searchString)].theme;
            var exhibitionAudios = jsonExh[lang][String(theme)].sounds;
            var json_length = Object.keys(exhibitionAudios).length;
            for (var i = 0; i < json_length; i++) {
                if (String(exhibitionAudios[String(i)]) == searchString) {
                    startIndex = i;
                }
                array.push({text: json[lang][String(exhibitionAudios[String(i)])].name, number: String(exhibitionAudios[String(i)]), thisIndex: i, filePath: json[lang][String(exhibitionAudios[String(i)])].filepath, highlight: json[lang][String(exhibitionAudios[String(i)])].highlight});
                maxIndex++;
              }
            this.props.screenProps.addAudioPlayer(track.filepath, array, startIndex, maxIndex, track.name, searchString, track.highlight, track.duration);
            this.clearDigitWithDelay();
            this.renderTourStop(theme);
        }
    }

    resetHeaderWithDelay() {
        setTimeout(() => {
            this.setState({ headerText: I18n.t('searchScreen_Title') });
        }, 1500)
    }

    clearDigitWithDelay() {
        setTimeout(() => {
            this.clearDigit();
        }, 1500)
    }

    clearDigit() {
        this.setState({ text3: ' ' });
        this.setState({ text2: ' ' });
        this.setState({ text1: ' ' });
    }

    removeDigit() {
        if (!(this.state.text3 === ' ')) {
            this.setState({ text3: ' ' });
        } else if (!(this.state.text2 === ' ')) {
            this.setState({ text2: ' ' });
        } else if (!(this.state.text1 === ' ')) {
            this.setState({ text1: ' ' });
        }
    }

    readyToSearch() {
        return this.state.searchString;
    }

    renderInputRow(){
       if(this.props.screenProps.rtl === true){
            return(
                <View style={s.inputRow}>
                    <Text style={s.input}>
                        {this.state.text3}
                    </Text>
                    <Text style={s.input}>
                        {this.state.text2}
                    </Text>
                    <Text style={s.input}>
                        {this.state.text1}
                    </Text>
                </View>
            )
        }
        else {
            return(
                <View style={s.inputRow}>
                    <Text style={s.input}>
                        {this.state.text1}
                    </Text>
                    <Text style={s.input}>
                        {this.state.text2}
                    </Text>
                    <Text style={s.input}>
                        {this.state.text3}
                    </Text>
                </View>
            )
        }    
    }

    renderButtomRow(num1, num2, num3) {
        if(this.props.screenProps.rtl === true){
            let tempNum = num1;
            num1 = num3;
            num3 = tempNum;
        }
        return(
            <View style={s.buttonRow}>
                <TouchableHighlight underlayColor={BUTTON_ON_PRESS_COLOR_1} onPress={() => { this.addDigit(num1); }} style={s.buttonContainer}>
                    <Text style={s.buttonText}>
                        {num1}
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={BUTTON_ON_PRESS_COLOR_1} onPress={() => { this.addDigit(num2); }} style={s.buttonContainer}>
                    <Text style={s.buttonText}>
                        {num2}
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={BUTTON_ON_PRESS_COLOR_1} onPress={() => { this.addDigit(num3); }} style={s.buttonContainer}>
                    <Text style={s.buttonText}>
                        {num3}
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }

    renderBottomRow(num){
        if(this.props.screenProps.rtl === true && num === 1 || this.props.screenProps.rtl === false && num === 2){
            return(
                <TouchableOpacity onPress={() => { this.removeDigit(); }} style={s.buttonNoContainer}>
                    <Image source={require('../assets/DeleteButton.png')} style={s.deleteButton} />
                </TouchableOpacity>
            )
        }else{
            return(
                <View style={[s.filler]} />
            )
        }
    }

    render() {
        return (
            <View style={s.container}>
                <View style={s.headerBorder}>
                    <Text style={s.textHeader}>
                        {this.state.headerText}
                    </Text>
                </View>
               
                {this.renderInputRow()}
                {this.renderButtomRow("1", "2", "3")}
                {this.renderButtomRow("4", "5", "6")}
                {this.renderButtomRow("7", "8", "9")}

                <View style={s.buttonRow}>
                    { this.renderBottomRow(1) }
                    <TouchableHighlight underlayColor={BUTTON_ON_PRESS_COLOR_1} onPress={() => { this.addDigit("0"); }} style={s.buttonContainer}>
                        <Text style={s.buttonText}>
                            0
                        </Text>
                    </TouchableHighlight>
                    { this.renderBottomRow(2) }
                </View>
                <View style={{ height: AUDIO_PLAYER_HEIGHT }} />
            </View>
        );
    }
}

const { height } = Dimensions.get('window');
const cellHeight = height / 10;

const s = StyleSheet.create({

    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: HEADER_TEXT_COLOR,
    },
    headerBorder: {
        width: "100%",
        height: 56,
        backgroundColor: HEADER_BACKGROUND_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 4,
    },
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
    },
    input: {
        width: (cellHeight/2)+8,
        height: (cellHeight/2)+8,
        color: TEXT_COLOR,
        fontSize: cellHeight/2,
        textAlign: 'center',
        margin: 10,
        borderBottomWidth: 1,
    },
    buttonContainer: {
        height: cellHeight,
        width: cellHeight,
        justifyContent: 'center',
        borderRadius: cellHeight/2,
        borderColor: BORDER_COLOR_1,
        borderWidth: 1,
        margin: 8,
    },
    buttonNoContainer: {
        height: cellHeight,
        width: cellHeight,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        color: TEXT_COLOR,
        fontSize: cellHeight/2,
        textAlign: 'center',
    },
    deleteButton: {
        height: cellHeight/2,
        width: cellHeight/2,
        resizeMode: 'contain',
        justifyContent: 'center',
    },
    inputRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: cellHeight/2
    },
    buttonRow: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    notDigitRow: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    filler: {
        width: cellHeight,
        height: cellHeight,
        margin: 10,
    },
});
