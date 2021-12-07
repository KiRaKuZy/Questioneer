import React, { Fragment } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SignUp from '../../src/screens/SignUp';
import Login from '../../src/screens/Login';
import BottomTabNavigator from '../../src/navigators/BottomTabNavigator';

const AuthNavigator = createSwitchNavigator(
  {
    SignUp: SignUp,
    Login: Login,
    BottomTabNavigator: BottomTabNavigator
  },
  {
    initialRouteName: 'SignUp',
    headerMode: 'none'
  }
)

//export default AuthNavigator
export default createAppContainer(AuthNavigator);
