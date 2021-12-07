import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, Dimensions, TouchableOpacity, TouchableHighlight,LogBox } from 'react-native';
import { firebaseAuth } from '../../environment/config';
import { db } from '../../environment/config';

LogBox.ignoreLogs(["Warning: EventEmitter."]);
LogBox.ignoreLogs(["`new NativeEventEmitter()` was called"]);
LogBox.ignoreLogs(["AsyncStorage"]);
LogBox.ignoreLogs(['EventEmitter']);

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null, users:[] }

  async componentDidMount() {
    await db.ref('/users').once('value', (dataSnapshot) => {
      var users = [];
      dataSnapshot.forEach((child) => {
        users.push({
          email: child.val().email,
          t_number : child.val().t_number,
          id: child.key
        });
      });
      this.setState({users: users});
    });
  }

  handleLogin = () => {
    // TODO: Firebase stuff...
    firebaseAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        for(let item in this.state.users){
          if(this.state.email === this.state.users[item].email){
            this.props.navigation.navigate('BottomTabNavigator',{userID : this.state.users[item].id, t_number: this.state.users[item].t_number})
          }
        }
        })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.heading}>Вход</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
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


                  <TouchableHighlight
                    style={styles.buttonBack}
                    underlayColor="white"
                    onPress={this.handleLogin}
                  >
                    <Text style={styles.buttonText}>Войти</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.buttonAdd}
                    underlayColor="white"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                  >
                    <Text style={styles.buttonText2}>Еще не зарегистрированы? Регистрация</Text>
                  </TouchableHighlight>


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
    padding: 4,
    marginRight: 5,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 19,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black'
  },
  heading: {
    width: '100%',
    height: '27%',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor:'#27C92E',
    color: '#fff',
    paddingTop: '10%',
    fontSize: 35,
    top: -40,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 8,
    color: '#fff'
  },
  signupBtn: {
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    width: 100,
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
    height: 45,
    width:'70%',
    flexDirection: 'row',
    backgroundColor: '#27C92E',
    borderColor: '#27C92E',
    color: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    margin: 2,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonBack: {
    paddingTop: 10,
    height: 45,
    width:'30%',
    marginRight: 10,
    flexDirection: 'row',
    backgroundColor: '#27C92E',
    borderColor: '#27C92E',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    margin: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center'
  }
})
