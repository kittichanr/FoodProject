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
  Right,
  Footer
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
  }

  // Load Order from AsynStorage
  _load = async () => {
    try {
      const item = await AsyncStorage.getItem('Order')
      const order = JSON.parse(item)
      if(order!=null){
      this.setState({ Allorder: order })
      }else{
        this.setState({ Allorder: [] })
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }

  checkOut = async () => {
    // await AsyncStorage.setItem('History', JSON.stringify(this.state.Allorder))
    await AsyncStorage.removeItem('Order');
    alert("Check Out Success")
    Actions.pop()
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

  remove = index => {
    const Allorder = [...this.state.Allorder]
    Allorder.splice(index, 1)
    this.setState({ Allorder: Allorder })
    this.saveItem()
  }

  renderItem = ({ item, index }) => {
    let amountItem = item.amount
    const amountPrice = amountItem * item.order.price

    return (
      <CardItem>
        <Left style={{flexDirection:"column"}}>
          <Text>{item.Menuname}</Text>
          <Text style={{textAlign: 'left'}}>({item.order.item})</Text>
        </Left>
        <Body style={{flexDirection:"row"}}>
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
        <Right >
          <TouchableOpacity
              style={{height: 30,
                      width: 60,
                      backgroundColor: 'grey',
                      borderRadius: 10,
                      borderWidth: 1,
                      textAlign: 'center',
                      justifyContent: 'center',
                      borderColor: '#fff',
                      marginLeft:5}}
              activeOpacity={0.5}
              onPress={() => {
                this.remove(index);
                Actions.pop()
              }}
            >
              <Text style={{color:'#fff', fontSize: 10,textAlign: 'center',}}>REMOVE</Text>
            </TouchableOpacity>
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
              <Right >
              </Right>
          </CardItem>
          <FlatList
            data={order}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: 30 }}
          />
          <CardItem style={{ fontWeight: 'bold' }} bordered>
            <Left>
              <Text style={{ fontWeight: 'bold' }}>Total Price</Text>
            </Left>
            <Body />
            <Right>
              <Text>{sum} ฿</Text>
            </Right>
            <Right>
            </Right>
          </CardItem>
        </Card>
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,backgroundColor: 'white',
            height: 60,
            justifyContent: 'space-around',
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
            flexDirection: 'row'}}>
        <TouchableOpacity
              style={{height: 40,
                      width: 150,
                      backgroundColor: 'green',
                      borderRadius: 10,
                      borderWidth: 1,
                      textAlign: 'center',
                      justifyContent: 'center',
                      borderColor: '#fff',
                      marginLeft:5}}
              activeOpacity={0.5}
              onPress={() => {
                this.checkOut()
              }}
            >
              <Text style={{color:'#fff', fontSize: 20,textAlign: 'center',}}>Check out</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    const order = this.state.Allorder
    return <View style={{ flex: 1 }}>{this.test(order)}</View>
  }
}
