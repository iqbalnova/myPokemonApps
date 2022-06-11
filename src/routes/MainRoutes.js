import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {useSelector} from 'react-redux';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import TopTabs from './TopTab';
import DetailPokemon from '../screens/DetailPokemon';

const Stack = createStackNavigator();

export default function MainRoutes() {
  const {_user} = useSelector(state => state.login);
  return (
    <Stack.Navigator
      initialRouteName={_user._id ? 'Main' : 'Login'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Main" component={TopTabs} />
      <Stack.Screen name="Detail" component={DetailPokemon} />
    </Stack.Navigator>
  );
}
