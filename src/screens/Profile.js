import React, { Component } from 'react';
import {View,Text,TouchableHighlight,StyleSheet,TextInput,Alert,Button,ImageBackground,Image,LogBox,ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';

LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component"]);
LogBox.ignoreLogs(['EventEmitter']);
LogBox.ignoreLogs(['source.uri']);

import { db } from '../../environment/config';

let itemsRef = db.ref('/users');

let updateUser = (FIO, t_number, age, url, language, userID) => {
  itemsRef.once('value', (data) => {
    data.forEach((child) => {
      if(child.key === userID){
        db.ref('/users/' + userID).update({
          FIO: FIO,
          t_number: t_number,
          age: age,
          url: url,
          language: language
        });
      };
    });
  });
};

const x = ['Русский','English']

export default class Profile extends Component {
  state = {
    FIO: '',
    t_number: '',
    age: '',
    url: '',
    language: ''
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount(){
    await db.ref('/users').once('value', (dataSnapshot) => {
      dataSnapshot.forEach((child) => {
        if(child.key === this.props.navigation.dangerouslyGetParent().getParam('userID', 'nothing sent')){
          this.setState({
            FIO: child.val().FIO,
            t_number: child.val().t_number,
            age: child.val().age,
            url: child.val().url,
            language: child.val().language
          });
        }
      });
    });
  }

  handleChange = e => {
    this.setState({
      FIO: e.nativeEvent.text
    });
  };

  handleChange2 = e => {
    this.setState({
      t_number: e.nativeEvent.text
    });
  };

  handleChange3 = e => {
    this.setState({
      age: e.nativeEvent.text
    });
  };

  handleChange4 = e => {
    this.setState({
      url: e.nativeEvent.text
    });
  };

  handleSubmit = () => {
    if (this.state.FIO === "" || this.state.t_number === "" || this.state.age === "" || this.state.language === ""){
      Alert.alert('Не все поля заполнены!');
    }
    else{
      updateUser(this.state.FIO, this.state.t_number, this.state.age, this.state.url, this.state.language, this.props.navigation.dangerouslyGetParent().getParam('userID', 'nothing sent'));
      Alert.alert('Профиль успешно изменён');
    }
  };


  render(){
    return (
      <View style={styles.main}>

        <View style={{flexDirection:'row', height: '8%'}}>
          <Text style={styles.title}>Профиль</Text>
          <TouchableHighlight style={{backgroundColor:'#27C92E', paddingTop: '4%', width: '10%'}} underlayColor="#27C92E" onPress={() => { this.props.navigation.navigate('Login') }}>
          <Image
            source={require('../../src/images/Quit.png')}
            style={{ width: 20, height: 20 }} />
          </TouchableHighlight>
        </View>
<ScrollView>
        <Image
          source={ {uri: this.state.url} }
          style={{ width: 185, height: 185, alignSelf: 'center', marginTop: 52, borderRadius: 92, marginBottom: 38, backgroundColor: '#c4c4c4'}} />

        <TextInput style={styles.itemInput} onChange={this.handleChange} placeholder = "ФИО" value={this.state.FIO}/>
        <TextInput style={styles.itemInput} onChange={this.handleChange4} placeholder = "Ссылка на картинку профиля" value={this.state.url}/>
        <TextInput style={styles.itemInput} keyboardType="numeric" onChange={this.handleChange2} placeholder = "Номер телефона" value={this.state.t_number}/>
        <TextInput style={styles.itemInput} keyboardType="numeric" onChange={this.handleChange3} placeholder = "Возраст" value={this.state.age}/>

        <View style={styles.itemInput}>
        <Picker style={{ height: 40, width: '100%', top: -6 }}
          mode="dropdown"
          textStyle={{color:'blue'}}
          selectedValue={this.state.language}
          onValueChange={(itemValue) => {
            this.setState({language: itemValue});
        }}

        >
        {x.map((item, index) => {
                return (<Picker.Item color='black' style = {{fontSize: 15}} label={item} value={item} key={index}/>)
        })}
        </Picker>
        </View>

        <TouchableHighlight style={styles.buttonAdd} underlayColor="white" onPress={this.handleSubmit}>
          <Text style={styles.buttonText2}>Сохранить</Text>
        </TouchableHighlight>
</ScrollView>
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
    height: 50,
    width: '94%',
    padding: 4,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    color: 'black'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
    fontFamily:'#6f002a.ru_magnolia'
  },
  buttonText2: {
    fontSize: 21,
    color: '#fff',
    alignSelf: 'center',
    fontFamily:'#6f002a.ru_magnolia'
  },
  buttonAdd: {
    height: 45,
    width:'94%',
    flexDirection: 'row',
    backgroundColor: '#27C92E',
    borderColor: '#27C92E',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
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
