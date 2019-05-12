import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux';

class DrawerMenu extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
const mapStateToProps = state => ({})
export default connect(mapStateToProps)(DrawerMenu)