import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
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

import { connect } from 'react-redux'
import {increaseValue,decreaseValue,removeOrder,checkDuplicateItem} from '../actions/Menu'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalPrice: 0,
      Allorder: ''
    }
  }

  componentWillMount() {
    this.props.checkDuplicateItem();
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      Actions.refresh({ onBack: () => this._back() })
    })
  }

  _back = () => {
    Actions.pop()
  }

  checkOut = () => {
    alert('Check Out Success')
    Actions.checkout({orderCheckOut:this.props.order,restaurantname:this.props.restaurantname})
  }

  decreaseValue = index => {
    this.props.decreaseValue(index)

  }

  increaseValue = index => {
    this.props.increaseValue(index)
  }

  remove = index => {
    this.props.removeOrder(index)
  }

  renderItem = ({ item, index }) => {
    let amountItem = item.amount
    const amountPrice = amountItem * item.order.price

    return (
      <CardItem>
        <Left style={{ flexDirection: 'column' }}>
          <Text>{item.Menuname}</Text>
          <Text style={{ textAlign: 'left' }}>({item.order.item})</Text>
        </Left>
        <Body style={{ flexDirection: 'row' }}>
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
        <Right>
          <TouchableOpacity
            style={styles.removeButton}
            activeOpacity={0.5}
            onPress={() => {
              this.remove(index)
            }}
          >
            <Text style={{ color: '#fff', fontSize: 10, textAlign: 'center' }}>
              REMOVE
            </Text>
          </TouchableOpacity>
        </Right>
      </CardItem>
    )
  }

  test(order) {
    var sum = 0
    for (var i = 0; i < order.length; i++) {
      sum += order[i].amount * order[i].order.price
    }
    if (order.length == 0) {
      return (
        <View
          style={styles.container}
        >
          <Text>There are no item in cart!</Text>
        </View>
      )
    }
    return (
      <View
        style={styles.container}
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
            <Right />
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
            <Right />
          </CardItem>
        </Card>
        <View
          style={styles.viewCheckOut}
        >
          <TouchableOpacity
            style={styles.checkOut}
            activeOpacity={0.5}
            onPress={() => {
              this.checkOut()
            }}
          >
            <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>
              Check out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const order = this.props.order
    return <View style={{ flex: 1 }}>{this.test(order)}</View>
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  removeButton: {
    height: 30,
    width: 60,
    backgroundColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    marginLeft: 5
  },
  checkOut: {
    height: 40,
    width: 150,
    backgroundColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    marginLeft: 5
  },
  viewCheckOut: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'space-around',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    flexDirection: 'row'
  }
})

const mapStateToProps = state => ({
  order: state.menu.order,
  restaurantname:state.menu.restaurantname,
})
const mapDispatchToProps = dispatch => ({

  increaseValue: (index) => {
    dispatch(increaseValue(index))
  },
  decreaseValue:(index) => {
    dispatch(decreaseValue(index))
  },
  removeOrder:(index) =>{
    dispatch(removeOrder(index))
  },
  checkDuplicateItem:()=>{
    dispatch(checkDuplicateItem())
  }

})
export default connect(mapStateToProps,mapDispatchToProps)(Cart)
