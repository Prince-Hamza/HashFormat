import React, { Component } from 'react';
import {View , Text, StyleSheet , TextInput , ScrollView , Image } from 'react-native'
import Space from '../Components/Interface/Interface'
import {Styles , Colors} from '../Components/Interface/Verstyle'
import { Actions } from 'react-native-router-flux';
import {ChatRoomKey , updateHistory , SendMessage} from '../Components/Features/Messenger'
import firebase from 'firebase'
import Constants from 'expo-constants';
import RNSimData from 'react-native-sim-data'

var Key , MsgsArray = []


class Messenger extends React.Component {

 componentDidMount = () => {
  
     // Get Mutual Key

     Key = ChatRoomKey( this.props.User1.Id , this.props.User2.Id) // abc being user2Id

     // Read History if any ++ Listen New Messages
     
     firebase.database().ref(`/ChatPlugin/Conversations/${Key}`)
     .on('child_added' , (res) => {
         let Messages = res.val();
         MsgsArray.push(Messages)
         this.setState({MsgsArray : MsgsArray , Complete : true})
     })

     // inform user on new convo (optional)
     let App = this.props
     updateHistory(App.User2.Name  , App.User2.Photo , Key)


     // Notify unread Messages



 }
 
//  updateHistory = (Name , Photo , ConvoId) => {

//       let  Me = firebase.auth().currentUser.uid , Exists = false
//       let  Chat_History = firebase.database().ref(`/ChatPlugin/History/${Me}`)

//       Chat_History.once('value' , (resp) => {
//            resp.forEach((res) => {
//               let data = res.val()
//               if (data.Conversation == ConvoId)  Exists = true 
//       })

//        if (!Exists) Chat_History.push({ Name : Name, Photo:Photo, Conversation:ConvoId })
        
//       })
     
//  }

//  onSubmit = (Message) => {
//     let Me = firebase.auth().currentUser.uid
//     firebase.database().ref(`/ChatPlugin/Conversations/${Key}`)
//     .push({   Id : Me,   Message: Message  })
//     this.setState({Text:''})
//  }

//  onChangeText = (value) => {
//      this.setState({Text : value })
//  }

 

  constructor(){
      super()
      this.state = { 
        Text : '' ,
        MsgsArray:[],
        Complete:false         
      }
  }


  render () {

if (this.state.Complete) {
    
  return (
    
   <View style = {Styles.ContainBelow} >
       <ScrollView 
         style={styles.scrollView}
         ref={ref => {this.scrollView = ref}}
         onContentSizeChange={() => this.scrollView.scrollToEnd({animated: false})}
         contentContainerStyle={styles.MessengerContent}>
      

          {this.state.MsgsArray.map(info => {
            let App = this.props
            let img = ChoosePhoto(App , info.Id)
            let Size = ChooseWith(info.Message)
              return (
                <View style = {{...styles.TextView , height: Size.Height , width: Size.Width }} key = {Math.random()} >
                    <Image source = {{uri:img }}  style={styles.Photo}></Image>
                    <Text style={styles.text}>  {info.Message}     </Text>
                </View>
              )
           }) }

        <Space Pixel = {15} />

        </ScrollView>





       <TextInput
            style={Styles.MessengerInput}
            value = {this.state.Text}
            onChangeText={text => this.setState({Text:text})   }
            onSubmitEditing = {(e)=>{SendMessage(e.nativeEvent.text)}}
            placeholder = {'    Type a Message Here'}
       />

       <Space Pixel = {0.5} />

   </View>
  )}
  return null;
     }
       }

export default Messenger

const ChoosePhoto = (App , Id) => {
  let Me = firebase.auth().currentUser.uid
  if (Id == Me) {
          return App.User1.Photo
  } else
       {  return App.User2.Photo  }
 }

 const ChooseWith = (Message) => {

    let words = Message.length , height = 40 , width

    if (words <= 3)  width = words * 45
    if (words == 1)  width = words * 95
    if (words >= 5 && words <= 30) width = words * 18
    if (words >= 50) height = words * 1;

    return ({ Width : width , Height : height })


 }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    scrollView: {
      flex:1,
      marginHorizontal: 3,
      alignContent:'flex-end',
      width:350
    },
    MessengerContent:{
      flexGrow: 1, 
      flexDirection: 'column', 
      justifyContent: 'flex-start',
    },
    TextView:{
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems:'center',
        marginTop:25,
        borderWidth:0.5,
        borderStyle:'solid',
        borderColor:'lightgray',
        borderRadius:50,

        elevation: 5,
        shadowColor: 'lightgray',
        backgroundColor: 'white'

      
      },

    text: {
      width:250,
      marginLeft:8,
      textAlign:'auto',
      color:'purple'
    },

    Photo:{
      width:35,
      height: 35,
    }
});
  

