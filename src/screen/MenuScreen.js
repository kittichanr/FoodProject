import React, { Component } from 'react'
import { Text, View } from 'react-native'


export default class MenuScreen extends Component {
  render() {
      console.log(this.props.menu) 
    return (
      <View>
        <Text> MenuScreen </Text>
      </View>
    )
  }
}
