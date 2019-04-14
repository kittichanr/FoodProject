import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebaseService from '../../environment/Firebase'
import { Actions } from 'react-native-router-flux';

export default class Loading extends React.Component {

  componentDidMount() {
    firebaseService.auth().onAuthStateChanged(user => {
      // console.log(user)
      if(user != null){
        Actions.reset('home')
        
      }else{
        Actions.reset('signup')
        
      } 
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
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