import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert,
  Button,
  ImageBackground,
  Image,
  LogBox,
  ScrollView
} from 'react-native';
import Moment from 'moment';
import moment from 'moment';

LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component"]);

import { db } from '../../environment/config';

let itemsRef = db.ref('/questions');

let addQuestion = (text, date, t_number, userFK) => {
  itemsRef.push({
    text: text,
    date: moment().format("YYYY-MM-DDTHH:mm:ss"),
    t_number: t_number,
    userFK: userFK
  });
};

export default class AddQuestion extends Component {
  state = {
    text: '',
    date: '',
    t_number: this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('t_number', 'nothing sent'),
    userFK: this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('userID', 'nothing sent')
  };

  handleChange = e => {
    this.setState({
      text: e.nativeEvent.text
    });
  };

  handleSubmit = () => {
    if (this.state.text === ""){
      Alert.alert('Введите текст вопроса');
    }
    else{
      addQuestion(this.state.text, this.state.date, this.state.t_number, this.state.userFK);
      Alert.alert('Вопрос опубликован');
    }
  };

  render() {
    return (
      <View style={styles.main}>

      <View style={{flexDirection:'row', height: '8%'}}>
      <TouchableHighlight style={{backgroundColor:'#27C92E', paddingTop: '4%', width: '10%'}} underlayColor="#27C92E" onPress={() => { this.props.navigation.navigate('MyQuestionsS') }}>
      <Image
        source={ require('../../src/images/Back.png') }
        style={{ width: 21, height: 21, marginLeft:10 }} />
      </TouchableHighlight>

        <Text style={styles.title}>Спросить</Text>
      </View>

        <TextInput style={styles.itemInput} multiline={true} numberOfLines={6} onChange={this.handleChange} placeholder = "Текст вопроса"/>

        <TouchableHighlight
          style={styles.buttonAdd}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText2}>Опубликовать</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  main: {
    flex: 1,
    flexDirection: 'column',

    backgroundColor: '#fff'
    //backgroundColor: 'black'
  },
  title: {
    width: '90%',
    height: '100%',
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 25,
    textAlign: 'left',
    color: '#fff',
    paddingTop: '2%',
    backgroundColor: '#27C92E',

    //fontStyle: 'italic',
    fontWeight: "bold",
  },
  itemInput: {
    width: '89%',
    padding: 4,
    marginBottom: 10,
    marginTop: 37,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    marginHorizontal: 20,
    color: 'black'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
    fontFamily:'#6f002a.ru_magnolia'
  },
  buttonText2: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    fontFamily:'#6f002a.ru_magnolia'
  },
  buttonAdd: {
    height: 45,
    width: '89%',
    marginHorizontal: 20,
    backgroundColor: '#27C92E',
    borderColor: '#27C92E',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    margin: 2,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonBack: {
    height: 45,
    width:'49%',
    flexDirection: 'row',
    backgroundColor: '#6f002a',
    borderColor: '#6f002a',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    margin: 2,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
