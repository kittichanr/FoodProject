import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
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
import HistoryList from '../component/HistoryList'


export default class HistoryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      historyList: ''
    }
    const { uid } = firebaseService.auth().currentUser
    this.ref = firebaseService.database().ref('history/' + uid)
    this.unsubscribe = null
  }
  componentWillMount() {
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      Actions.refresh({ onBack: () => this._back() })
    })


    this.unsubscribe = this.ref.on('value', this.readUserData)
  }

  componentWillUnmount() {
    this.unsubscribe
  }

  _back = () => {
    Actions.replace('drawer')
  }

  readUserData = (snapshot) => {

    var history = []
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot
      history.push(childData.val())
      this.setState({ historyList: history })
    }.bind(this));

  }

  renderItem = ({ item }) => {
    return (
      <HistoryList
        touch={() => Actions.historydetail({ item: item })}
        data={item}
      />

    )
  }


  test(history) {
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

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={history}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }

  render() {
    const history = this.state.historyList
    return <View style={{ flex: 1 }}>{this.test(history)}</View>
  }
}
