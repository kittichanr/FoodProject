import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button,
  AsyncStorage,
  InteractionManager
} from 'react-native'
import firebaseService from '../environment/Firebase'
import {
  Body,
  Left,
  ListItem as Item,
  Card,
  CardItem,
  Icon,
  Right,
  Footer
} from 'native-base'
import { Actions } from 'react-native-router-flux'
export default class HistoryScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      historyList: ''
    }
  }
  componentWillMount () {
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      Actions.refresh({ onBack: () => this._back() })
  })
  
    this.readUserData()
  }


  _back = () => {
    Actions.replace('drawer')
}

  readUserData() {
    const { uid } = firebaseService.auth().currentUser
        var history = []
        firebaseService.database().ref('order/').once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.child(uid).forEach(function (childchildSnapshot) {
                    history.push(childchildSnapshot.val())
                    this.setState({ historyList: history })
                }.bind(this));
            }.bind(this));
        }.bind(this));
}




  test (history) {
    if (history.length == 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Text>You don't have any purchase history!</Text>
        </View>
      )
    }
    console.log(this.state.historyList)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        
      </View>
    )
  }

  render () {
    const history = this.state.historyList
    return <View style={{ flex: 1 }}>{this.test(history)}</View>
  }
}
