import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  TouchableOpacity,Dimensions,CheckBox
} from 'react-native';
import {
  
  Card,
  CardItem,
  Icon,
  Left,
  Right
} from 'native-base'
import { Actions } from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import RadioGroup from 'react-native-radio-buttons-group';

const PARALLAX_HEADER_HEIGHT = 300
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num:0
    };
  }

  _renderScrollViewContent(menu) {
    
    return (
      <View style={styles.scrollViewContent}>
      
      <Card>
          <CardItem>
            <Left>
              <Text>{menu.name}</Text>
            </Left>
            <Right>
              <Text>{menu.price} ฿</Text>
            </Right>
          </CardItem>
        </Card>
        <View style={styles.customize}>
          <Text>Customize</Text>
          <Text>{menu.customize.question} (Choose One)</Text>
          {menu.customize.choice.map((item,index)=>{
            
            return(
              <View style={{flexDirection:'row'}} key={index}>
              
              <Text key={index}>{item.item}</Text>
              </View>
            )
          })}
        </View>
      </View>
    );
  }

  render() {
    
    const {img,name,price} = this.props.menu
    const { num } = this.state; 
    return (
      <View style={styles.container}>
        <ParallaxScrollView
      stickyHeaderHeight={ 80 }
      backgroundColor="blue"
      contentBackgroundColor="white"
      parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
      fadeOutForeground={true}
      renderStickyHeader={()=> (
      <View key="sticky-header"  style={{ height: 200, justifyContent: 'flex-start',top:20}}>
      <Icon
              name='close'
              type='MaterialIcons'
              style={{
                color: 'white',
                fontSize: 32,
                marginRight: 5,
                marginTop: 22,
              }}
              onPress={()=>{Actions.pop()
                setTimeout(() => {
                  Actions.refresh({
                  param : "555"
                  });
                  }, 0); 
              }
              }
            />
      </View>
  )}
      renderForeground={() => (
       <View style={{ height: 200, flex: 1, alignItems: 'center', justifyContent: 'center' ,}}>
          
        </View>
      )}
      renderBackground={() => (
        <View key="background" style={{backgroundColor:'white'}}>
          <Image source={{uri: img,
                          width: '100%',
                          height: PARALLAX_HEADER_HEIGHT}} style={{marginTop:20}}/>
          
        </View>
      )}
      
      >
      <View style={{ height: 500 }}>
      {this._renderScrollViewContent(this.props.menu)}
      </View>

     
    </ParallaxScrollView>
    <View
      style={{
        backgroundColor: 'white',
        height: 60,
        justifyContent:'space-around',
        borderColor:"black",
        borderWidth:1,
        padding:5,
        flexDirection: 'row'
      }}
    >
    <View style={{
    textAlign: 'center',
    justifyContent:'center',
    flexDirection: 'row',
    width:150}}>
    <Icon
              name='remove-circle-outline'
              type='MaterialIcons'
              style={{
                color: 'black',
                fontSize: 40,
              }}
              onPress={()=>this.setState({num:num-1})}
            />
            <Text style={styles.title}>{this.state.num}</Text>
            <Icon
              name='control-point'
              type='MaterialIcons'
              style={{
                color: 'black',
                fontSize: 40,
              }}
              onPress={()=>this.setState({num:num+1})}
            />
    </View>
    <View style={{justifyContent:'space-evenly',
    flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.SubmitButtonStyle}
          activeOpacity = { .5 }
          onPress={()=>{alert('555')}}
       >
         <Text style={styles.title2}>ADD TO CART</Text>
       </TouchableOpacity>

    </View>
    </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  SubmitButtonStyle: {

    height:45,
    width:180,
    backgroundColor:'#00BCD4',
    borderRadius:10,
    borderWidth: 1,
    textAlign: 'center',
    justifyContent:'center',
    borderColor: '#fff'
  },
  title: {
    color: 'black',
    fontSize: 16,
  },
  title2: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 10,
  },
  scrollViewContent: {
    top:50,
    margin:10,
    backgroundColor: 'white',
  },
  row: {
    height: 40,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subRow: {
    height: 40,
    marginVertical: 4,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  customize:{
    flex:1,
    flexDirection:'column',
    justifyContent:'flex-start',
    marginLeft:10,
  }
});

