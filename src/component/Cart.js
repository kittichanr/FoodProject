import React, { Component } from 'react';
import { StyleSheet, Image, Text, View,TouchableOpacity,FlatList,Button} from 'react-native'
import {
  Body,Left,
  Header,
  List,
  ListItem as Item,
  ScrollableTab,
  Tab,
  Tabs,
  Title,
  Container,
  Content,
  Card,
  CardItem,
  Icon,
  Right
} from 'native-base'

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice:0
    };
  }
  
  renderItem = ({item}) =>{
    const amountPrice = item.amount*item.order.price
    return(

          <CardItem >
              <Left>
                <Text>{item.Menuname}</Text>
              </Left>
              <Body>
                  <Text>{item.amount}</Text>
              </Body>
              <Right>
                <Text>{amountPrice} ฿</Text>
              </Right>
          </CardItem>
    )
  }

  test (order) {
    var sum = 0;
    for (var i = 0; i < order.length; i++) {
      sum += (order[i].amount*order[i].order.price)
    }
    if(order.length ==0){
      return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", textAlign: "center"  }}>
        <Text>There are no item in cart!</Text>
      </View>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        
        <Card style={{width:300}}>
            <CardItem header >
              <Text style={{fontSize: 20,fontWeight: 'bold'}}>Your Order</Text>
            </CardItem>
            <CardItem style={{fontWeight: 'bold'}} bordered>
              <Left >
                <Text >Menu</Text>
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
              style={{padding:10,marginTop:30}}
            />
            <CardItem style={{fontWeight: 'bold'}} bordered>
              <Left >
                <Text style={{fontWeight: 'bold'}}>Total Price</Text>
              </Left>
              <Body>
              </Body>
              <Right>
                <Text>{sum}</Text>
              </Right>
          </CardItem>
          </Card>
          
      </View>
      )
    
  }

  render() {
    const order = this.props.Allorder
    return (
      <View  style={{ flex: 1}}>
        {console.log(order)}
        {this.test(order)}
      </View>
    );
  }
}
