import React, { Fragment } from 'react';
import QuestionsList from '../../src/screens/QuestionsList';
import MyQuestionsNavigator from '../../src/navigators/MyQuestionsNavigator';
import Profile from '../../src/screens/Profile';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image } from 'react-native';

const BottomTabNavigator = createBottomTabNavigator(
    {
      Ответить: QuestionsList,
      Задать: MyQuestionsNavigator,
      Профиль: Profile
    },
    {
      initialRouteName: 'Ответить',
      defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Ответить') {
          return (
            <Image
              source={ require('../../src/images/QuestionsList.png') }
              style={{ width: 20, height: 20, }} />
          );
        } else if (routeName === 'Задать') {
          return (
            <Image
              source={ require('../../src/images/MyQuestions.png') }
              style={{ width: 20, height: 20 }} />
          );
        } else if (routeName === 'Профиль'){
          return (
            <Image
              source={ require('../../src/images/Profile.png') }
              style={{ width: 20, height: 20 }} />
          );
        }
      },
    }),
    tabBarOptions: {
      activeBackgroundColor:'#27C92E',
      activeTintColor: '#fff',
      inactiveTintColor: '#263238',
    },
    }
)

export default BottomTabNavigator
