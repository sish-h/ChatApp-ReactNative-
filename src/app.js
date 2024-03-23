/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  AppRegistry,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

import Home from './home';
import Chat from './chat';

const App = StackNavigator({
  Home: { screen: Home },
  Chat: { screen: Chat },
});

initFirebase = () => {
  var config = {
    apiKey: "AIzaSyAyBI11R_3oOf0OgW5qe_dOkEWm7D_itoA",
    authDomain: "rn-chat-27e14.firebaseapp.com",
    databaseURL: "https://rn-chat-27e14.firebaseio.com",
    projectId: "rn-chat-27e14",
    storageBucket: "rn-chat-27e14.appspot.com",
    messagingSenderId: "1078893812278"
  };
  firebase.initializeApp(config);
  firebase.auth().signInAnonymously();
}
initFirebase();

AppRegistry.registerComponent('chat', () => App);
