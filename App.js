import React from 'react'
import { StyleSheet, Text, View, YellowBox } from 'react-native'
import _ from 'lodash'
import AppNavigator from './src/navigation/AppNavigator'
export default class App extends React.Component {
  render () {
    YellowBox.ignoreWarnings(['Setting a timer'])
    const _console = _.clone(console)
    console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message)
      }
    }
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
