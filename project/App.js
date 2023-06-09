import React, { useEffect, useState } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './views/HomeStack';
import BoardScreen from './views/Board';
import DoneScreen from './views/Done';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  const Stack = createStackNavigator()


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={BoardScreen} />
          <Stack.Screen name="Finish" component={DoneScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  )
}

