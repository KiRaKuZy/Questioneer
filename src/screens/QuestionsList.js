import React, { Component } from 'react';
import { Dimensions, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ImageBackground, Image, Button, TouchableHighlight, TouchableOpacity, TextInput} from 'react-native';
import { db } from '../../environment/config';

export default class QuestionsList extends Component {
  state = {
          questions: [],
          users: []
    }

    async componentDidMount() {
      await db.ref('/questions').on('value', (dataSnapshot) => {
        var questions = [];
        dataSnapshot.forEach((child) => {
          if(child.val().userFK!==this.props.navigation.dangerouslyGetParent().getParam('userID', 'nothing sent')){
          questions.push({
            text: child.val().text,
            userFK: child.val().userFK,
            id: child.key
          });}
        });
        this.setState({questions: questions});
      });

      await db.ref('/users').on('value', (dataSnapshot) => {
        var users = [];
        dataSnapshot.forEach((child) => {
          users.push({
            id: child.key,
            FIO: child.val().FIO,
            language: child.val().language,
            age: child.val().age,
            t_number: child.val().t_number,
            url: child.val().url
          });
        });
        this.setState({users: users});
      });
    }

    renderRow(item) {
              return (
                <View>
                <View style={styles.item}>

                    <Text style={{textAlign:'center', marginTop: 22, color: '#fff', fontSize: 21}}>{item.userFK}, {item.age}</Text>

                    <Text style={{textAlign:'center', marginTop: 13, color: '#fff', fontSize: 21}}>{item.language}</Text>

                    <Image
                      source={ {uri: item.url} }
                      style={{ width: 185, height: 185, alignSelf: 'center', marginTop: 28, borderRadius: 92, marginBottom: 28, backgroundColor: '#c4c4c4'}} />

                    <Text style={{textAlign:'center', color: '#fff', fontSize: 21}}>{item.text}</Text>

                </View>

                <TouchableHighlight
                  style={styles.buttonAdd}
                  underlayColor="#27C92E"

                >
                <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../src/images/Call.png')}
                  style={{ width: 20, height: 20, marginTop: 12, marginRight: 18 }} />
                  <Text style={styles.buttonText2}>{item.t_number}</Text>
                  </View>
                </TouchableHighlight>
                </View>
      )}

  render(){

    for (let question of this.state.questions) {
      for(let user of this.state.users){
        if(question.userFK === user.id){
          question.userFK = user.FIO;
          question.age = user.age;
          question.language = user.language;
          question.url = user.url;
          question.t_number = user.t_number;
        }
      }
    }

    return (
      <View style={styles.container}>
      <View style={{flexDirection:'row', height: '8%'}}>
        <Text style={styles.title}>Вопросы для Вас</Text>
      </View>
      <FlatList
        style={{marginTop: 27}}
        horizontal={true}
        data={this.state.questions}
        renderItem={({item}) => (this.renderRow(item))
        }
        keyExtractor={item => item.id}
      />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    width: '100%',
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
  bg: {
    flex: 1,
resizeMode: "cover",
justifyContent: "center"
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  itemInput: {
    height: 50,
    width: '89%',
    padding: 4,
    marginRight: 5,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    color: 'black'
  },
  item: {
    width: 320,
    height: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    backgroundColor: '#c4c4c4',
    marginVertical: 5,
    marginHorizontal: 20,
  },
  image: {
    margin: 7,
    borderRadius : 7,
    height: 100,
    width: "22%",
  },
  text: {
    flexDirection: 'row',
      width:'90%',
      textAlignVertical:'center',
      padding:2,
      color: '#000'
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
  buttonBack: {
    height: 45,
    width:'30%',
    flexDirection: 'row',
    backgroundColor: '#6f002a',
    borderColor: '#6f002a',
    borderWidth: 1,
    borderRadius: 8,
    marginLeft:10,
    marginBottom: 10,
    marginTop: 10,
    margin: 2,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonAdd: {
    width: 320,
    marginHorizontal: 20,
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#27C92E',
    borderColor: '#27C92E',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 29,
    margin: 2,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  image2: {
       height: 200,
       width: '100%',
       borderRadius: 20
   }
});
