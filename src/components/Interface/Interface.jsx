import React, { Component } from 'react';
import {Styles , Colors} from './Verstyle'
import {View , Text, TouchableOpacity} from 'react-native'

class iButton extends React.Component {      
render () {    
  return (
    <TouchableOpacity style = {{...Styles.Button  ,  backgroundColor : this.props.Colors ? this.props.Colors[0] : 'cyan' ,
    ...this.props.style  }}
    onPress={()=> {this.props.OnPress()}} >         
   <Text style = {{color:this.props.Colors ? this.props.Colors[1] : 'magenta'}} >
     {this.props.children}
   </Text>
  </TouchableOpacity>
  );
}
}
//export default iButton




class Space extends React.Component {      
  render () {    
    return (<Text style = {{fontSize:this.props.Pixel ? this.props.Pixel : 3}} ></Text> );
   }
}
export default Space








