import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity,Image ,ScrollView} from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Card, CardItem, Body, Icon, Left, Right } from 'native-base'

export class TrackDetail extends Component {
  

  _image = (name) => {
    if(name=="Burger King's"){
        return <Image 
        source={{uri: "https://www.festisite.com/static/partylogo/img/logos/burger-king.png"}}
        style={{width:100,height:100,}}    
        />
    }
    if(name=="McDonald's"){
        return <Image 
            source={{uri: "https://unitedegg.com/wp-content/uploads/2018/06/mcdonald-998495_640-Pixabay.png"}}
            style={{width:100,height:100}}
        />
    }
}

renderItem = ({ item, index }) => {
  let amountItem = item.amount
  const amountPrice = amountItem * item.order.price

  return (
    <CardItem>
      <Left style={{ flexDirection: 'column',marginLeft:20  }}>
        <Text>{item.Menuname}</Text>
        <Text style={{ textAlign: 'left' }}>({item.order.item})</Text>
      </Left>
      <Body style={{justifyContent: 'center',alignItems: 'center'}}>
        
        <Text>{amountItem}</Text>
        
      </Body>
      <Right style={{ marginRight:20 }}>
        <Text>{amountPrice} ฿</Text>
      </Right>
    </CardItem>
  )
}
  render() {
    const item = this.props.item
    var sum = 0
    for (var i = 0; i < item.order.length; i++) {
      sum += item.order[i].amount * item.order[i].order.price
    }
      console.log(item)
    return (
      <View>
       <ScrollView>
        <Card style={{}}>
          <CardItem style={{justifyContent: 'center',alignItems: 'center',}} header>
          {this._image(item.restaurantname)}
          </CardItem>
          <CardItem style={{ fontWeight: 'bold' }} bordered>
            <Left style={{ marginLeft:20 }}>
              <Text style={{ fontWeight: 'bold' }}>Menu</Text>
            </Left>
            <Body  style={{justifyContent: 'center',alignItems: 'center'}}>
              <Text style={{ fontWeight: 'bold' }}>Amount</Text>
            </Body>
            <Right style={{ marginRight:20 }}>
              <Text style={{ fontWeight: 'bold' }} >Price </Text>
            </Right>
          </CardItem>
          <FlatList
            data={item.order}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: 20 }}
          />
          <CardItem style={{}} bordered>
            <Left style={{ marginLeft:20 }}>
              <Text style={{ fontWeight: 'bold' }}>Total Price</Text>
            </Left>
            <Body />
            <Right style={{ marginRight:20 }}>
              <Text>{sum} ฿</Text>
            </Right>
          </CardItem>
        </Card>

        <Card style={{}}>
          <CardItem style={{justifyContent: 'center',alignItems: 'center',}} header>
              <Text style={{ fontWeight: 'bold',fontSize:20 }} >Receiver</Text>
          </CardItem>
          <CardItem bordered>
            <Left style={{ marginLeft:20 }}>
              <Text style={{ fontWeight: 'bold' }}>Receiver Name  :</Text>
            </Left>
            <Right style={{ marginRight:20 }}>
              <Text>{item.name}</Text>
            </Right>
          </CardItem>
          <CardItem bordered>
            <Left style={{ marginLeft:20 }}>
              <Text style={{ fontWeight: 'bold' }}>Phone  :</Text>
            </Left>
            <Right style={{ marginRight:20 }}>
              <Text>{item.contact}</Text>
            </Right>
          </CardItem>
          <CardItem bordered>
            <Left style={{ marginLeft:20 }}>
              <Text style={{ fontWeight: 'bold' }}>Location  :</Text>
            </Left>
            <Right style={{ marginRight:20 }}>
              <Text>{item.location? item.location:"not ew"}</Text>
            </Right>
          </CardItem>
        </Card>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetail)
