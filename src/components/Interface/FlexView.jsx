import React from "react";
import {  View , StyleSheet } from "react-native";

export default class FlexView extends React.Component {
  
  render() {
    return (
      <View style = {{ ...styles.FlexView ,   ...this.props.style}} >
        {this.props.JSONArray.map((item) => {
          return <View key = {this.props.key ? this.props.key : Math.random() }>
            {this.props.Item(item)}
          </View>
        })}
      </View>
    )
  }
}



const styles = StyleSheet.create({
  FlexView: {
    flex: 1,
    flexDirection:'row',
    alignItems: "flex-start",
    flexWrap:'wrap',
    justifyContent: "center",
    width: "100%",
    height:'100%',
    backgroundColor:'whitesmoke'
  },
  
})

