import React, { Component } from 'react';
import {View , Text, StyleSheet , TextInput , ScrollView , Image } from 'react-native'
import Space from '../Components/Interface/Interface'
import {Styles , Colors} from '../Components/Interface/Verstyle'
import { Actions } from 'react-native-router-flux';
import {ChatRoomKey} from '../Components/Features/Messenger'
import firebase from 'firebase'
import Constants from 'expo-constants';
import RNSimData from 'react-native-sim-data'

var  HistoryArray = [] ,  MultiArray = []


class ChatHistory extends React.Component {

 componentDidMount = () => {
  
   // this.props.myId
   let  Me = firebase.auth().currentUser.uid 

   firebase.database().ref(`/ChatPlugin/${Me}/History`).once('value' , (resp) => {
      resp.forEach((Object) => { 
          let info = Object.val()
          HistoryArray.push(info)
       })

      
       this.setState({ConversationInfo : HistoryArray , Complete:true })

       alert(JSON.stringify(HistoryArray))

   })
 }
 

  constructor(){
      super()
      this.state = { 
        MsgsArray:[],
        ConversationInfo:[],
        Complete:false         
      }
  }


  render () {

if (this.state.Complete) {
  return (
   <View style = {Styles.ContainBelow} >
  
   </View>
  )}
  return null
     }
       }

export default ChatHistory

const styles = StyleSheet.create({
    
});
  

