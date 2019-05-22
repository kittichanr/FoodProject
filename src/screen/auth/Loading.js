import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, Animated } from 'react-native'
import firebaseService from '../../environment/Firebase'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
class Loading extends React.Component {

  state = {
    fadeAnim: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 3000,
      }
    ).start();
    firebaseService.auth().onAuthStateChanged(user => {
      // console.log(user)
      if (user != null) {
        Actions.replace('drawer')

      } else {
        Actions.replace('signup')

      }
    })


  }

  render() {
    let { fadeAnim } = this.state;
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Image source={require('../../../assets/foodlogo.png')} style={{ width: 100, height: 50 }} />
        <Text style={{ fontSize: 30 ,color:'#0288d1'}}>Project</Text>
      </Animated.View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default connect()(Loading)