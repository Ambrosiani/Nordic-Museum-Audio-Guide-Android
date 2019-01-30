// Copyright(c) 2018 Gustav Kjellberg, Gustaf Lidfeldt, Diar Sabri, Maria Lindblad,
// Lars Lundin, Carl Hultberg, Bruhan Hashi, Sebastian Franzén, Jesper Öberg,
// Björn Aurell Hansson, Tommy Samuelsson. gustav.kjellberg@hotmail.com
import {AppRegistry} from 'react-native';
import StackSwitcher from './app/stackSwitcher';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => StackSwitcher);