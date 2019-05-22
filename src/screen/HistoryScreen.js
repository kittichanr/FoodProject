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
      historyList: '',
      imgtrack: [],
    }
    const { uid } = firebaseService.auth().currentUser
    this.ref = firebaseService.database().ref('history/' + uid)
    this.unsubscribe = null
    this.ref2 = firebaseService.database().ref('ImgResTrack/')
    this.imgtrack = null
    _isMounted = false
  }
  componentWillMount() {
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      Actions.refresh({ onBack: () => this._back() })
    })

    this._isMounted = true
    this.unsubscribe = this.ref.on('value', this.readUserData)
    this.imgtrack = this.ref2.on('value', this.getImageTrack)
  }

  componentWillUnmount() {
    this.unsubscribe
    this.imgtrack
    this._isMounted = false
  }

  _back = () => {
    Actions.replace('drawer')
  }

  getImageTrack = (snapshot) => {
    var imgtrack = []
    snapshot.forEach(function (childSnapshot) {
      imgtrack.push({ name: childSnapshot.key, url: childSnapshot.val() })
      if (this._isMounted) {
        this.setState({ imgtrack: imgtrack })
      }
    }.bind(this))
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
  _image = (name) => {
    for (var i = 0; i < this.state.imgtrack.length; i++) {
      if (this.state.imgtrack[i].name == name.replace(/\s/g, '')) {
        return (<Image
          source={{ uri: this.state.imgtrack[i].url }}
          style={{ width: 50, height: 50 }}
        />
        )
      }
    }
  }

  renderItem = ({ item }) => {
    return (
      <HistoryList
        touch={() => Actions.historydetail({ item: item, imgtrack: this.state.imgtrack })}
        data={item}
        image={this._image(item.item.restaurantname)}
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
