/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from 'react';
 import { StatusBar, View, Dimensions, Image, ImageBackground, ToastAndroid } from 'react-native';
 
 
 import { LogBox } from 'react-native';
 import Navigation from './src/navigation';
 LogBox.ignoreLogs([
   'Require cycle:',
   'Encountered two children with the same key',
   'VirtualizedLists',
   'Each child in a list should',
   'VirtualizedList',
   'Looks like',
   '['
 ]);
 global.initialroute = "Splash"
 global.url = "http://192.168.1.3:5000"
 global.nama_lengkap = ""
 global.email = ""
 function App() {
   const { width: DEVICE_WIDTH } = Dimensions.get('window');
   const [sudah, setsudah] = useState(false);
 
   return (
     <>
       <StatusBar barStyle="dark-content" />
       <Navigation />
     </>
   );
 };
 
 export default App;
 