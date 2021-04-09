import React, { Component } from "react";
import { View, Text } from "react-native";
import { Styles, Colors, TextColors } from "./Verstyle";

class Card extends React.Component {
  render() {
    return (
      <View style={{ ...Styles.Card, ...this.props.style , fontSize: 12 }}>
        {this.props.children}
      </View>
    );
  }
}

export default Card;
