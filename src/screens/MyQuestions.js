import React, { Component } from 'react';
import { Dimensions, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ImageBackground, Image, Button, TouchableHighlight, TouchableOpacity, TextInput} from 'react-native';
import { db } from '../../environment/config';
import Moment from 'moment';
import moment from 'moment';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const window = Dimensions.get('window');
const imagesWidth = window.width - 20;

let itemsRef = db.ref('/questions');

export default class MyQuestions extends Component {
  state = {
        items: [],
        filter: []
  }

  constructor(props) {

    super(props);
    this.itemsRef = db.ref('/questions');
    LogBox.ignoreLogs([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Encountered two children with the same key'
    ]);

  }

  componentDidMount() {
    itemsRef.on('value', (dataSnapshot) => {
      var items = [];
      dataSnapshot.forEach((child) => {

        if(child.val().userFK==this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('userID', 'nothing sent')){
        items.push({
          text: child.val().text,
          date: Moment(child.val().date).format("DD-MM-YYYY HH:mm:ss"),
          id: child.key
        });}
      });
      this.setState({items: items});
      this.setState({filter: items});
    });
  }

  renderRow(item) {
            return (

              <TouchableOpacity style={styles.item}
              onPress={() => {this.props.navigation.navigate('EditQuestionS',{id: item.id, text: item.text})}}
                 onLongPress={() => this.itemsRef.child(item.id).remove()}
                 >

                 <View style={{padding: 25}}>
                    <Text style={{color: 'grey',width: '100%'}}>{item.date}</Text>
                    <Text style={{color: 'black',width: '100%', fontSize: 20, marginTop: 10}}>{item.text}</Text>
                  </View>


              </TouchableOpacity>
    )}

    searchQuestion=e=>{
            console.log(e.nativeEvent.text);
        this.setState({
          filter:this.state.items.filter(i=>i.text.includes(e.nativeEvent.text))
        })
      }

  render(){
    return (
      <View style={styles.container}>

      <View style={{flexDirection:'row', height: '8%'}}>
        <Text style={styles.title}>Мои вопросы</Text>
      </View>

      <TextInput style={styles.itemInput} onChange={this.searchQuestion} placeholder = "Поиск"/>
      <View style={{flexDirection:'row'}}>

      </View>
        <FlatList
          data={this.state.filter}
          renderItem={({item}) => (this.renderRow(item))
          }
          keyExtractor={item => item.id}
        />
        <TouchableHighlight
          style={styles.buttonAdd}
          underlayColor="white"
          onPress={() => this.props.navigation.navigate('AddQuestionS')}
        >
          <Text style={styles.buttonText2}>Задать вопрос</Text>
        </TouchableHighlight>
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fff',
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
    fontSize: 18,
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
    width: '89%',
    marginHorizontal: 20,
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#27C92E',
    borderColor: '#27C92E',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    margin: 2,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  image2: {
       height: 200,
       width: '100%',
       borderRadius: 20,
       width: imagesWidth
   }
});
