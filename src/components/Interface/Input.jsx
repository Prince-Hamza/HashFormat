import React, { Component } from "react";
import { Styles, Colors } from "./Verstyle";
import { StyleSheet , TextInput } from "react-native";

class NiceInput extends React.Component {

  
  constructor() {
    super();
    this.state = { textValue: "" , First:true };
  }
  render() {
      const Placeholder = this.props.placeholder ? this.props.placeholder : "Type Your Text Here";
    return (
     
        <TextInput
          style={{...styles.niceInput, borderRadius: 50, width: "90%" , ...this.props.style }}
          value={this.state.textValue}
          onChangeText={(text) => {
           const Spc = this.state.First ? "    " : ""
           this.setState({textValue: Spc + text , First:false})
           this.props.onChange(text)  
            }}
          placeholder={`    ${Placeholder}`}
        />
    );
  }
}

export default NiceInput;


const styles = StyleSheet.create({
    niceInput:{
      height: 40,
      width:360,
      borderWidth: 0,
      borderBottomWidth:0.5,
      borderBottomColor: 'lightgray',
      color:'white'
    }
  })
  

