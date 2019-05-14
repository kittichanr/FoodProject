import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { Container, Header, Content, List, ListItem, Body, Title, Button } from 'native-base'
import firebaseService from '../environment/Firebase'
import { Actions } from 'react-native-router-flux'

class DrawerMenu extends Component {

  signOutUser = async () => {
    try {
      firebaseService.auth().signOut()
      Actions.replace('loading')
    } catch (e) {
      console.log(e)
    }
  }

  logout = () => {
    this.signOutUser()
  }

  tracking = () =>{
    Actions.replace('tracking');
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: 25 }}>
        <View style={{ flex: 1 }}>
          <Header>
            <Body>
              <Title>
                Food Project
          </Title>
            </Body>
          </Header>
        <Content>
          <List>
            <ListItem onPress={()=> this.tracking()}>
              <Text>Tracking</Text>
            </ListItem>
            <ListItem>
              <Text>History</Text>
            </ListItem>
          </List>
          </Content>
        </View>
        <View style={styles.footer}>

          <List>
            <ListItem  onPress={() => this.logout()}>
              <Text>LogOut</Text>
            </ListItem>
          </List>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
const mapStateToProps = state => ({})
export default connect(mapStateToProps)(DrawerMenu)