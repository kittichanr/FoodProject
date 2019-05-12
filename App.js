import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  YellowBox
} from 'react-native'
import _ from 'lodash'
import {AppNavigator} from './src/navigation/AppNavigator'
import {
  Font,
  AppLoading
} from 'expo'

export default class App extends React.Component {
  state = {
    isReady: false
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({
      isReady: true
    })
  }

  render() {
    YellowBox.ignoreWarnings(['Setting a timer'])
    const _console = _.clone(console)
    console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message)
      }
    }
    if (!this.state.isReady) {
      return <AppLoading />;
    }
  
    return (
      // <View style={styles.container} >
        <AppNavigator /> 
      //  </View>
   
    )
  }
}

const styles = StyleSheet.create({
        container: {
        flex: 1,
      backgroundColor: '#fff'
    }
})