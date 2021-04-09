import * as React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default class Gradient extends React.Component {
  render() {
    return (
      <View style={{ ...styles.container  , ...this.props.style }}>
        <LinearGradient
          style={{...styles.background , ...this.props.style}}
          colors={this.props.Colors ? this.props.Colors : ["#ff00e0", "orange"]}
        />
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",  
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },

});

