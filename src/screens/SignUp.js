import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, Dimensions, TouchableOpacity, TouchableHighlight, LogBox, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { firebaseAuth } from '../../environment/config';
import { db } from '../../environment/config';

let itemsRef = db.ref('/users');

LogBox.ignoreLogs(["Warning: EventEmitter."]);
LogBox.ignoreLogs(["`new NativeEventEmitter()` was called"]);
LogBox.ignoreLogs(["AsyncStorage"]);
LogBox.ignoreLogs(['EventEmitter']);

let addUser = (FIO, email, t_number, age, language) => {
  itemsRef.push({
    FIO: FIO,
    email: email,
    t_number: t_number,
    age: age,
    language: language
  });
};

const x = ['Русский','English']

export default class SignUp extends React.Component {
    state = { email: '', password: '', FIO:'', t_number: '', age: '', language:'Русский', errorMessage: null }

    handleSignUp = () => {
      firebaseAuth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
              if((this.state.email != '')&&(this.state.password != '')&&(this.state.FIO != '')&&(this.state.t_number != '')&&(this.state.age != '')){
                this.props.navigation.navigate('BottomTabNavigator')
                addUser(this.state.FIO,this.state.email,this.state.t_number,this.state.age,this.state.language);
              }
          })
            .catch(error => this.setState({ errorMessage: error.message }));

          }
  render() {
      return (
              <View style={styles.container}>
                  <Text style={styles.heading}>Регистрация</Text>
                  {this.state.errorMessage &&
                      <Text style={{ color: 'red' }}>
                          {this.state.errorMessage}
                      </Text>}
                      <ScrollView style={{ width: '100%' }}>
                  <TextInput
                      placeholder="Email"
                      placeholderTextColor="black"
                      autoCapitalize="none"
                      style={styles.itemInput}
                      onChangeText={email => this.setState({ email })}
                      value={this.state.email}
                  />
                  <TextInput
                      secureTextEntry
                      placeholder="Пароль"
                      placeholderTextColor="black"
                      autoCapitalize="none"
                      style={styles.itemInput}
                      onChangeText={password => this.setState({ password })}
                      value={this.state.password}
                  />
                  <TextInput
                      placeholder="ФИО"
                      placeholderTextColor="black"
                      autoCapitalize="none"
                      style={styles.itemInput}
                      onChangeText={FIO => this.setState({ FIO })}
                      value={this.state.FIO}
                  />
                  <TextInput
                      keyboardType="numeric"
                      placeholder="Номер телефона"
                      placeholderTextColor="black"
                      autoCapitalize="none"
                      style={styles.itemInput}
                      onChangeText={t_number => this.setState({ t_number })}
                      value={this.state.t_number}
                  />
                  <TextInput
                      keyboardType="numeric"
                      placeholder="Возраст"
                      placeholderTextColor="black"
                      autoCapitalize="none"
                      style={styles.itemInput}
                      onChangeText={age => this.setState({ age })}
                      value={this.state.age}
                  />
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
                          return (<Picker.Item color='black' style = {{fontSize: 19}} label={item} value={item} key={index}/>)
                  })}
                  </Picker>
                  </View>


                          <TouchableHighlight
                            style={styles.buttonBack}
                            underlayColor="white"
                            onPress={this.handleSignUp}
                          >
                            <Text style={styles.buttonText}>Зарегистрироваться</Text>
                          </TouchableHighlight>
                          <TouchableHighlight
                            style={styles.buttonAdd}
                            underlayColor="white"
                            onPress={() => this.props.navigation.navigate('Login')}
                          >
                            <Text style={styles.buttonText2}>Уже есть аккаунт? Войти</Text>
                          </TouchableHighlight>

</ScrollView>
              </View>
      )
  }
}

const heightConst = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  itemInput: {
    marginHorizontal: 10,
    height: 50,
    width: '94%',
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 19,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    color: 'black'
  },
  heading: {
    width: '100%',
    height: '20%',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor:'#27C92E',
    color: '#fff',
    paddingTop: '14%',
    fontSize: 35,
    top: -8,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 8,
    color: 'black'
  },
  signupBtn: {
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    width: 200,
    height: 35,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
            backgroundColor: '#fff',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize:16,
    textAlign: 'center',
  },
  buttonText2: {
    color: '#fff',
    fontSize:16,
    textAlign: 'center',
  },
  buttonAdd: {
    paddingTop: 10,
    height: 45,
    width:'70%',
    flexDirection: 'row',
    backgroundColor: '#27C92E',
    borderColor: '#27C92E',
    color: 'white',
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    margin: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center'
  },
  buttonBack: {
    paddingTop: 10,
    height: 45,
    width:'49%',
    flexDirection: 'row',
    backgroundColor: '#27C92E',
    borderColor: '#27C92E',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
    margin: 2,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})
