import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Card, CardItem, Body, Icon, Left, Right } from 'native-base'
import firebaseService from '../environment/Firebase'
import { Actions } from 'react-native-router-flux';
import Modal from "react-native-modal";
import moment from 'moment';

export class TrackDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false
    }
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  _image = (name) => {
    for (var i = 0; i < this.props.imgtrack.length; i++) {
      if (this.props.imgtrack[i].name == name.replace(/\s/g, '')) {
        return (<Image
          source={{ uri: this.props.imgtrack[i].url }}
          style={{ width: 100, height: 100 }}
        />
        )
      }
    }
  }

  renderItem = ({ item, index }) => {
    let amountItem = item.amount
    const amountPrice = amountItem * item.order.price
    return (
      <CardItem>
        <Left style={{ flexDirection: 'column', marginLeft: 20 }}>
          <Text>{item.Menuname}</Text>
          <Text style={{ textAlign: 'left' }}>({item.order.item})</Text>
        </Left>
        <Body style={{ justifyContent: 'center', alignItems: 'center' }}>

          <Text>{amountItem}</Text>

        </Body>
        <Right style={{ marginRight: 20 }}>
          <Text>{amountPrice} ฿</Text>
        </Right>
      </CardItem>
    )
  }

  cancel = (resname) => {
    const { uid } = firebaseService.auth().currentUser
    // console.log(uid)
    const trackKey = this.props.trackKey
    firebaseService.database().ref('order/' + resname + '/' + uid + '/' + trackKey).remove()
    Actions.pop();

  }
  success = (resname) => {
    var date = new Date();
    
    const { uid } = firebaseService.auth().currentUser
    firebaseService.database().ref('history/' + uid).push({
      item: this.props.item,
      date:moment(date).format('MMM DD YYYY')
      
    })
    this.cancel(resname)
    Actions.drawer()
  }
  render() {

    const item = this.props.item
    var sum = 0
    for (var i = 0; i < item.order.length; i++) {
      sum += item.order[i].amount * item.order[i].order.price
    }
    
    return (
      <View>
        <ScrollView>
          <Card style={{}}>
            <CardItem style={{ justifyContent: 'center', alignItems: 'center', }} header>
              {this._image(item.restaurantname)}
            </CardItem>
            <CardItem style={{ fontWeight: 'bold' }} bordered>
              <Left style={{ marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>Menu</Text>
              </Left>
              <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>Amount</Text>
              </Body>
              <Right style={{ marginRight: 20 }}>
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
              <Left style={{ marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>Total Price</Text>
              </Left>
              <Body />
              <Right style={{ marginRight: 20 }}>
                <Text>{sum} ฿</Text>
              </Right>
            </CardItem>
          </Card>

          <Card style={{ height: 350 }}>
            <CardItem style={{ justifyContent: 'center', alignItems: 'center', }} header>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }} >Receiver</Text>
            </CardItem>
            <CardItem bordered>
              <Left style={{ marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>Receiver Name  :</Text>
              </Left>
              <Right style={{ marginRight: 20 }}>
                <Text>{item.name}</Text>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Left style={{ marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>Phone  :</Text>
              </Left>
              <Right style={{ marginRight: 20 }}>
                <Text>{item.contact}</Text>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Left style={{ marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>Location  :</Text>
              </Left>
              <Right style={{ marginRight: 20 }}>
                <Text>{item.location ? item.location : "not ew"}</Text>
              </Right>
            </CardItem>
          </Card>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.checkOut, { backgroundColor: 'red' }]}
            activeOpacity={0.5}
            onPress={() => {
              // this.cancel(item.restaurantname)
              this.toggleModal()
            }}
          >
            <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>
              Cancel
                        </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkOut}
            activeOpacity={0.5}
            onPress={() => {
              this.success(item.restaurantname)
            }}
          >
            <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>
              Success
                        </Text>
          </TouchableOpacity>

        </View>
        <View >
          <Modal isVisible={this.state.isModalVisible}
            onBackdropPress={() => this.setState({ isModalVisible: false })}
          >
            <View style={{
              backgroundColor: 'white',
              padding: 22,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text>Are you sure?</Text>
              {/* <View style={{flexDirection:'column'}}> */}
              <Button title="Yes" onPress={() => { this.cancel(item.restaurantname) }} />
              <Button title="No" onPress={() => { this.toggleModal() }} />
              {/* </View> */}
            </View>
          </Modal>
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
  },
  checkOut: {
    height: 35,
    width: 150,
    backgroundColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    marginLeft: 5
  },

})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetail)
