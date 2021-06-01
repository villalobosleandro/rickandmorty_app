/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  useColorScheme,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import firebase from '@react-native-firebase/app';

import Providers from './src/navigation';

const firebaseConfig = {
  apiKey: "AIzaSyDU5aeUt65wQ_0ol-o16D7cJLnkG4r0V0E",
  authDomain: "rickandmorty-6ab1c.firebaseapp.com",
  projectId: "rickandmorty-6ab1c",
  storageBucket: "rickandmorty-6ab1c.appspot.com",
  messagingSenderId: "1057220857208",
  appId: "1:1057220857208:web:6f934ccd0fbb417ef00c8d"
};

global.Constant = require('./src/shared/constant');

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else {
    firebase.app();
  }

  return (
    <>
      <Providers />
    </>
  );
};


export default App;
