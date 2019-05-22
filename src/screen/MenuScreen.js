import React, { Component } from 'react'
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,

} from 'react-native'
import { Card, CardItem, Icon, Left, Right, Textarea, Form } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { addOrder } from '../actions/Menu'


const PARALLAX_HEADER_HEIGHT = 300;
class MenuScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: undefined,
      amount: 0,
      specialIns: '',
      Allorder: [],
      resName: ''
    }
  }

  componentWillMount() {

  }

  _renderScrollViewContent(menu) {
    var select = [];
    if (menu.customize != undefined) {
      menu.customize.choice.forEach((item, index) => {
        select.push({
          label: `${item.item.toString() + '     price: ' + item.price.toString() + ' ' + item.unit}`,
          value: { item: item.item, price: item.price }
        }
        );
      });
    }
    return (
      <View style={styles.scrollViewContent}>
        <Card>
          <CardItem>
            <Left>
              <Text>{menu.name}</Text>
            </Left>
          </CardItem>
        </Card>
        {menu.customize == undefined ? null :
          <View>
            <View style={styles.customize}>
              <Text>Customize</Text>
              <Text>{menu.customize.question} (Choose One)</Text>
            </View>

            <View style={{ flex: 1, paddingVertical: 50, paddingHorizontal: 10, }}>
              <RNPickerSelect
                placeholder={{
                  label: 'Select',
                  value: null,
                  color: '#9EA0A4',
                }}
                items={select}
                onValueChange={value => {
                  this.setState({
                    data: value,
                  });
                }}
                value={this.state.data}
                style={{
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderWidth: 0.5,
                  borderColor: 'eggplant',
                  borderRadius: 8,
                  color: 'black',
                  paddingRight: 30,
                }}

              />
            </View>
            <Text>Special instructions</Text>
            <Form>
              <Textarea
                rowSpan={5}
                bordered
                placeholder="Optional "
                onChangeText={(value) => this.setState({ specialIns: value })} />
            </Form>
          </View>
        }
      </View>

    )
  }

  decreaseValue = () => {
    if (this.state.amount > 0) {
      this.setState({ amount: this.state.amount - 1 })
    }
  }


  addOrder = () => {
    const { name, id } = this.props.menu
    const { data, amount, specialIns } = this.state
    const obj = { Menuname: name, order: data, amount: amount, specialIns: specialIns }
    if (amount > 0 && data != undefined) {
      this.props.addOrder(obj, this.props.restaurantName);
      alert('Add Order');
      Actions.pop();
    }


  }

  render() {

    const { img, name, price } = this.props.menu
    const { amount } = this.state
    return (
      <View style={styles.container}>
        <ParallaxScrollView
          stickyHeaderHeight={80}
          backgroundColor='blue'
          contentBackgroundColor='white'
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          fadeOutForeground
          renderStickyHeader={() => (
            <View
              key='sticky-header'
              style={{ height: 200, justifyContent: 'flex-start', top: 20, backgroundColor: '#0288d1' }}
            >
              <Icon
                name='close'
                type='MaterialIcons'
                style={{
                  color: 'white',
                  fontSize: 32,
                  marginRight: 5,
                  marginTop: 22
                }}
                onPress={() => {
                  Actions.pop()
                }}
              />
            </View>
          )}
          renderForeground={() => (
            <View
              style={{
                height: 200,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          )}
          renderBackground={() => (
            <View key='background' style={{ backgroundColor: 'white' }}>
              <Image
                source={{
                  uri: img,
                  width: '100%',
                  height: PARALLAX_HEADER_HEIGHT
                }}
                style={{ marginTop: 20 }}
              />
            </View>
          )}
        >
          <View style={{ height: 500, }}>
            {this._renderScrollViewContent(this.props.menu)}

          </View>
        </ParallaxScrollView>
        <View
          style={{
            backgroundColor: 'white',
            height: 60,
            justifyContent: 'space-around',
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              width: 150
            }}
          >
            <Icon
              name='md-remove'
              type='Ionicons'
              style={{
                color: 'black',
                fontSize: 40
              }}
              onPress={() => this.decreaseValue()}
            />
            <Text style={styles.title}>{this.state.amount}</Text>
            <Icon
              name='md-add'
              type='Ionicons'
              style={{
                color: 'black',
                fontSize: 40
              }}
              onPress={() => this.setState({ amount: amount + 1 })}
            />
          </View>
          <View
            style={{ justifyContent: 'center', flexDirection: 'row', alignSelf: 'center' }}
          >
            <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity={0.5}
              onPress={() => {
                this.addOrder();
              }}
            >
              <Text style={styles.title2}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  SubmitButtonStyle: {
    height: 45,
    width: 180,
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: '#fff'
  },
  title: {
    color: 'black',
    fontSize: 20,
    marginHorizontal:20
  },
  title2: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  scrollViewContent: {
    top: 50,
    margin: 10,
    backgroundColor: 'white'
  },
  row: {
    height: 40,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  subRow: {
    height: 40,
    marginVertical: 4,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  customize: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10
  }
})

const mapStateToProps = state => ({
  order: state.menu.order
})
const mapDispatchToProps = dispatch => ({

  addOrder: (order, restaurantname) => {
    dispatch(addOrder(order, restaurantname))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen)