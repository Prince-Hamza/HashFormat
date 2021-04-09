import React, { Component } from "react";
import { Styles, Colors } from "./Verstyle";
import { TextInput , StyleSheet , TouchableOpacity } from "react-native";

class MessengerInput extends React.Component {
  constructor() {
    super();
    this.state = {
      Text: "",
      flex:0.1
    }
  }

  render() {
    return (
      <TouchableOpacity style = {{...Styles.Container , flex : this.state.flex  }}>
      <TextInput
        style={{ ...styles.Input, ...this.props.style , borderRadius:100 }}
        value={this.state.Text}
        placeholderTextColor = {'gray'}
        placeholder={ this.props.placeholder ? this.props.placeholder : "Type Your Message Here"}

        onChangeText={(text) => {
          this.setState({ Text: text })
          this.props.onChangeText ? this.props.onChangeText(text) : 0
        }}
        onSubmitEditing={(e) => {
            this.setState({ Text: "" })
            this.props.onSubmit ? this.props.onSubmit(e.nativeEvent.text) : 0
        }}

        onPress = {() =>  {  this.setState({flex:1})  }}

      />
      </TouchableOpacity>
    )
  }
}

export default MessengerInput;


const styles = StyleSheet.create ({
  Input:{
    height:'65%',
    width:'95%',
    backgroundColor:'lightgray',
  }
})