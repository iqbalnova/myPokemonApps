import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Dashboard from '../screens/Dashboard';
import PokeBag from '../screens/PokeBag';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="PokeBag" component={PokeBag} />
    </Tab.Navigator>
  );
}
