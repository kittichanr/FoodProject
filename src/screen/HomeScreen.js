import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import firebaseService from '../environment/Firebase'
import { Actions } from 'react-native-router-flux'

export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = { currentUser: null }
  }

  componentDidMount () {
    const { currentUser } = firebaseService.auth()
    this.setState({ currentUser })
  }

  signOutUser = async () => {
    try {
      firebaseService.auth().signOut()
      Actions.reset('loading')
    } catch (e) {
      console.log(e)
    }
  }

  logout = () => {
    this.signOutUser()
  }

  render () {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <Button title='LogOut' onPress={() => this.logout()} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
