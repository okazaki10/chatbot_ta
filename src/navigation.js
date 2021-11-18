import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './globalstyles';
import Splash from './container/splash';

import Chat from './container/chat';




const Stack = createNativeStackNavigator();
const headerTitleStyle = [styles.font22, styles.bold];


function Navigation() {
  var initialroute = global.initialroute
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialroute}>
      <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown:false }}
       />
 
       <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown:false }}
       />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
