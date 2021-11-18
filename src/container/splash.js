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
import { colors } from '../globalstyles';
LogBox.ignoreLogs([
  'Require cycle:',
  'Encountered two children with the same key',
  'VirtualizedLists',
  'Each child in a list should',
  'VirtualizedList',
  'Looks like'
]);
global.initialroute = "Login"
function Splash(props) {
  const { width: DEVICE_WIDTH } = Dimensions.get('window');
  const [sudah, setsudah] = useState(false);
  /*
    const next = async () => {
      try {
        const value = await AsyncStorage.getItem('email')
        const value2 = await AsyncStorage.getItem('nama_lengkap')
        global.email = value
        global.nama_lengkap = value2
        setTimeout(() => {
          if (value !== null) {
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Menubar' }],
            });
          } else {
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }, 1000);
      } catch (e) {
        // error reading value
  
      }
    }
  */

  const next = async () => {

    setTimeout(() => {
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'Chat' }],
      });
    }, 1000);

  }

  useState(() => {
    next()
  })
  return (
    <>
      <StatusBar backgroundColor={colors.bar} />

      <View>

        <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
          <Image
            source={require("../assets/image/d-removebg-preview.png")}
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          ></Image>
        </View>


      </View>
    </>
  );
};

export default Splash;
