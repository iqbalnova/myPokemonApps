import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import {useSelector} from 'react-redux';
import Login from '../screens/Auth/Login';
import Dashboard from '../screens/Dashboard';
import Register from '../screens/Auth/Register';

const Stack = createStackNavigator();

export default function MainRoutes() {
  // const {_user} = useSelector(state => state.login);
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}
