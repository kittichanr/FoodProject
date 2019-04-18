import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,Dimensions,CheckBox
} from 'react-native';
import {
  Tabs,
  Tab,
  Container,
  Content,
  Card,
  CardItem,
  Icon,ScrollableTab
} from 'native-base'
import { Actions } from 'react-native-router-flux';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num:0,
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
    };
  }

  _renderScrollViewContent(menu) {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
      
          <View style={styles.row}>
            <Text style={styles.title}>Please Choose Your Meat <Text style={{color: 'deeppink'}}>(Select One)</Text></Text>
          </View>
          <View style={styles.subRow}>
            <CheckBox style={{marginRight:20}}/>
            <Text style={[styles.title,{color:"gray"}]}>Chicken</Text>
          </View>
          <View style={styles.subRow}>
            <CheckBox style={{marginRight:20}}/>
            <Text style={[styles.title,{color:"gray"}]}>Pork</Text>
          </View>
          <View style={styles.subRow}>
            <CheckBox style={{marginRight:20}}/>
            <Text style={[styles.title,{color:"gray"}]}>Meat</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Special Instruments</Text>
          </View>
          <View style={styles.subRow}>
            <Text style={[styles.title,{color:"gray"}]}>Optional</Text>
          </View>
          <View style={styles.subRow}>
            <Text style={[styles.title,{color:"gray"}]}>Optional</Text>
          </View>
      </View>
    );
  }

  render() {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const nameOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    const nameOpacityReverse = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });
    const {img,name,price} = this.props.menu
    const { num } = this.state; 
    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
        >
          
          {this._renderScrollViewContent(this.props.menu)}
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={{uri:img}}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
          <Icon
              name='close'
              type='MaterialIcons'
              style={{
                color: 'white',
                fontSize: 40,
                marginRight: 140,
              }}
              onPress={()=>Actions.pop()}
            />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar3,
            {
                opacity: nameOpacityReverse,
            },
          ]}
        >
          <Text style={styles.title}>{name}</Text>
          
          <Text style={styles.title}>{price} ฿</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.bar2,
            {
                opacity: nameOpacity,
            },
          ]}
        >
          <Text style={styles.title}>{name}</Text>
          
          <Text style={styles.title}>{price} ฿</Text>
        </Animated.View>
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
  fill: {
    flex: 1,
    marginTop: 20
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 30,
    marginLeft: 2.5,
    height: 32,
    justifyContent:'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bar2: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 70,
    padding: 15,
    height: 60,
    justifyContent:'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth:1,
    borderBottomColor:"black",
  },
  bar3: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 300,
    padding: 15,
    height: 60,
    justifyContent:'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth:1,
    borderBottomColor:"black",
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
    marginTop: HEADER_MAX_HEIGHT + 60,
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
});


// import React, { Component } from 'react'
// import { Text, View } from 'react-native'
// import Parallax from 'react-native-parallax'

// export default class MenuScreen extends Component {

  
//   render() {
    
//       console.log(this.props.menu) 
//     return (
//       <View>
//         <Text> MenuScreen </Text>
//         <Parallax.ScrollView>
//             <Parallax.Image
//               style={{ height: 200 }}
//               overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.3)'}}
//               source={{ uri: 'http://loremflickr.com/640/480' }}
//             >
//               <Text>This is optional overlay content</Text>
//             </Parallax.Image>
//           </Parallax.ScrollView>
//       </View>
//     )
//   }
// }
