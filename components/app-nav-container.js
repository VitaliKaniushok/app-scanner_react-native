import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Options from './options/options.js';
import Scanner from './home/scanner.js';

const AppNavigator = createStackNavigator(
  {
  	Home:  Scanner,
  	Details: Options
  },
  {
  	initialRouteName: "Home"
  }
);

export const AppNavContainer = createAppContainer(AppNavigator);