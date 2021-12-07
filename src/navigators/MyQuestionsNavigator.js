import React, { Fragment } from 'react';
import { createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AddQuestion from '../../src/screens/AddQuestion';
import MyQuestions from '../../src/screens/MyQuestions';
import EditQuestion from '../../src/screens/EditQuestion';

const MyQuestionsNavigator = createSwitchNavigator(
  {
    MyQuestionsS: MyQuestions,
    AddQuestionS: AddQuestion,
    EditQuestionS: EditQuestion
  }
)

export default MyQuestionsNavigator
