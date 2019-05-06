import React, { Component } from 'react'
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  
} from 'react-native'
import { Card, CardItem, Icon, Left, Right ,Textarea,Form} from 'native-base'
import { Actions } from 'react-native-router-flux'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import RNPickerSelect from 'react-native-picker-select';


const PARALLAX_HEADER_HEIGHT = 300
export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: undefined,
      amount:0,
      specialIns:'',
      Allorder:[],
      resName:''
    }
  }

  componentWillMount(){
    this._load()
  }

  _load = async() =>{
    const resName = await AsyncStorage.getItem('restaurantName') ;
    this.setState({resName:resName})
    console.log(this.state.resName)
  }
  _renderScrollViewContent (menu) {
    var select = [];
    if( menu.customize != undefined){
    menu.customize.choice.forEach((item,index)=>{
      select.push({
        label:`${item.item.toString()+'     price: '+item.price.toString()+' '+item.unit}`,
        value:{item:item.item,price:item.price}
       },
      )
    })
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
    
        <View style={{flex:1,paddingVertical: 50,paddingHorizontal: 10,}}>
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
          style={{fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'eggplant',
            borderRadius: 8,
            color: 'black',
            paddingRight: 30,}}
          
        />
          </View>
          <Text>Special instructions</Text>
          <Form>
            <Textarea 
            rowSpan={5} 
            bordered 
            placeholder="Optional " 
            onChangeText={(value) => this.setState({ specialIns:value })}/>
          </Form>
          </View>
    }
      </View>
          
    )
  }

  decreaseValue=()=>{
    if(this.state.amount>0){
      this.setState({ amount: this.state.amount - 1 })
    }
  }

  // save Order to AsynStorage
  saveMenu = async() =>{
    let order = []
    const {name,id} = this.props.menu
    const {data,amount,specialIns} = this.state
    const obj = {Menuname:name,order:data,amount:amount,specialIns:specialIns}
    
    if(this.state.resName == this.props.restaurantName || this.state.resName == null){
    try {
      if(amount > 0 && data != undefined){
        const item = await AsyncStorage.getItem('Order') ;
        order = JSON.parse(item);
        // if(order != []){
        //   order = []
        // }
        order.push(obj)
        console.log(order)
        await AsyncStorage.setItem('Order',JSON.stringify(order))
        await AsyncStorage.setItem('restaurantName',this.props.restaurantName )
        alert('saved successfully.')
        Actions.pop();
      }
    } catch (error) {
      console.log(error.message) ;
    }
  }
  else{
    alert('Different restaurant')
    await AsyncStorage.setItem('Order',JSON.stringify([obj]))
    await AsyncStorage.setItem('restaurantName',this.props.restaurantName );
    Actions.pop();
  }
  }

  render () {
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
              style={{ height: 200, justifyContent: 'flex-start', top: 20 }}
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
          <View style={{ height: 500,}}>
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
              name='remove-circle-outline'
              type='MaterialIcons'
              style={{
                color: 'black',
                fontSize: 40
              }}
              onPress={() => this.decreaseValue()}
            />
            <Text style={styles.title}>{this.state.amount}</Text>
            <Icon
              name='control-point'
              type='MaterialIcons'
              style={{
                color: 'black',
                fontSize: 40
              }}
              onPress={() => this.setState({ amount: amount + 1 }) }
            />
          </View>
          <View
            style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}
          >
            <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity={0.5}
              onPress={() => {
                this.saveMenu();
                // Actions.pop();
                  // setTimeout(() => {
                  //   Actions.refresh({
                  //     Menuname:name,
                  //     order:this.state.data,
                  //     amount:this.state.amount,
                  //     specialIns:this.state.specialIns
                  //   })
                  // }, 0)
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
    fontSize: 16
  },
  title2: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 10
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
