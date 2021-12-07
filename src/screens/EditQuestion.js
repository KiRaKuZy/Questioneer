import React, { Component } from 'react';
import {View,Text,TouchableHighlight,StyleSheet,TextInput,Alert,Button,ImageBackground,Image,LogBox,ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';

LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component"]);
LogBox.ignoreLogs(['EventEmitter']);

import { db } from '../../environment/config';

let itemsRef = db.ref('/questions');

let updateQuestion = (text, questionID) => {
  itemsRef.once('value', (data) => {
    data.forEach((child) => {
      if(child.key === questionID){
        db.ref('/questions/' + questionID).update({
          text: text
        });
      };
    });
  });
};

export default class EditQuestion extends Component {
  state = {
    text: '',
    questionID: ''
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount(){
    this.setState({
      text: (await this.props.navigation.getParam('text', 'nothing sent')),
      questionID: (await this.props.navigation.getParam('id', 'nothing sent'))
    });
  }

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
      updateQuestion(this.state.text, this.state.questionID);
      Alert.alert('Вопрос успешно изменён');
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

        <Text style={styles.title}>Изменить вопрос</Text>
      </View>

        <TextInput style={styles.itemInput} multiline={true} numberOfLines={6} onChange={this.handleChange} placeholder = "Текст вопроса" value={this.state.text}/>

        <TouchableHighlight
          style={styles.buttonAdd}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText2}>Сохранить</Text>
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
