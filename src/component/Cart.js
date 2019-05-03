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
import {
  Body,
  Left,
  ListItem as Item,
  Card,
  CardItem,
  Icon,
  Right
} from 'native-base'
import { Actions } from 'react-native-router-flux'
export default class Cart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      totalPrice: 0,
      Allorder: ''
    }
  }
  componentWillMount () {
    this._load()
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      Actions.refresh({ onBack: () => this.saveItem() })
    })
  }

  // Save current order when back
  saveItem = async () => {
    await AsyncStorage.setItem('Order', JSON.stringify(this.state.Allorder))
    Actions.pop()
  }

  // Load Order from AsynStorage
  _load = async () => {
    try {
      const item = await AsyncStorage.getItem('Order')
      const order = JSON.parse(item)
      this.setState({ Allorder: order })
    } catch (error) {
      console.log(error.message)
    }
  }

  // Decrease value each item
  decreaseValue = index => {
    const Allorder = [...this.state.Allorder]
    Allorder[index].amount -= 1
    this.setState({ Allorder: Allorder })
    // if amount = 0 remove that index
    if (this.state.Allorder[index].amount < 1) {
      Allorder.splice(index, 1)
      this.setState({ Allorder: Allorder })
    }
  }

  //Increase value each item
  increaseValue = index => {
    const Allorder = [...this.state.Allorder]
    Allorder[index].amount += 1
    this.setState({ Allorder: Allorder })
  }

  renderItem = ({ item, index }) => {
    let amountItem = item.amount
    const amountPrice = amountItem * item.order.price

    return (
      <CardItem>
        <Left>
          <Text>{item.Menuname}</Text>
        </Left>
        <Body>
          <Icon
            name='remove-circle-outline'
            type='MaterialIcons'
            style={{
              color: 'black',
              fontSize: 20
            }}
            onPress={() => this.decreaseValue(index)}
          />
          <Text>{amountItem}</Text>
          <Icon
            name='control-point'
            type='MaterialIcons'
            style={{
              color: 'black',
              fontSize: 20
            }}
            onPress={() => this.increaseValue(index)}
          />
        </Body>
        <Right>
          <Text>{amountPrice} ฿</Text>
        </Right>
      </CardItem>
    )
  }

  test (order) {
    var sum = 0
    for (var i = 0; i < order.length; i++) {
      sum += order[i].amount * order[i].order.price
    }
    if (order.length == 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Text>There are no item in cart!</Text>
        </View>
      )
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Card style={{ width: 300 }}>
          <CardItem header>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Order</Text>
          </CardItem>
          <CardItem style={{ fontWeight: 'bold' }} bordered>
            <Left>
              <Text>Menu</Text>
            </Left>
            <Body>
              <Text>Amount</Text>
            </Body>
            <Right>
              <Text>Price </Text>
            </Right>
          </CardItem>
          <FlatList
            data={order}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{ padding: 10, marginTop: 30 }}
          />
          <CardItem style={{ fontWeight: 'bold' }} bordered>
            <Left>
              <Text style={{ fontWeight: 'bold' }}>Total Price</Text>
            </Left>
            <Body />
            <Right>
              <Text>{sum}</Text>
            </Right>
          </CardItem>
        </Card>
      </View>
    )
  }

  render () {
    const order = this.state.Allorder
    return <View style={{ flex: 1 }}>{this.test(order)}</View>
  }
}
