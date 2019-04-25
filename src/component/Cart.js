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
    };
  }
  
  renderItem = ({item}) =>{
    return(
        <Card style={{marginLeft:0,marginRight:0}}>
          <CardItem >
              <Text>{item.Menuname}</Text>
              
              <Text>{item.order.price} ฿</Text>
          </CardItem>
        </Card>
    )
  }

  test (order) {
    if(order == undefined){
      return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", textAlign: "center"  }}>
        <Text>There are no item in cart!</Text>
      </View>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <FlatList
            data={order}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{padding:10,marginTop:30}}
          />
      </View>
      )
    
  }

  render() {
    const order = this.props.Allorder
    return (
      <View  style={{ flex: 1}}>
        {/* {console.log(order)} */}
        {this.test(order)}
      </View>
    );
  }
}
