import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native'
import {Tabs,Tab,Container, Content} from 'native-base'

const HEADER_MAX_HEIGHT = 200
const HEADER_MIN_HEIGHT = 60
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

export default class Restaurant extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      typeMenu:[]
    }
  }
componentDidMount(){
  console.log(Object.keys(this.props.item.Menu).length)
  console.log(Object.keys(this.props.item.Menu)[1])
  
    this.setState({typeMenu:Object.keys(this.props.item.Menu)})
  
  
}
  _renderScrollViewContent () {
  
    const data = Array.from({ length: 30 })
    return (
      <View >
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    )
  }

  render () {
    console.log(this.state.typeMenu)
   const tabY = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE+ 1],
      outputRange: [0, 0, 1]
    });

    const tabHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    })
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    })
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    })
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp'
    })
    const tabTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    })
    const { Name,Img} = this.props.item
    
    return (
      <View style={styles.container}>
        
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={{uri:Img}}
          />
          <Animated.View style={styles.bar}>
            <Text style={styles.title}>Title</Text>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.tab, {top: tabHeight }]}>
       <Container>
        <Tabs >
          
          <Tab heading="1">
       
          <ScrollView
          style={styles.fill}
          scrollEventThrottle={4}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
        >
          {this._renderScrollViewContent()}
        </ScrollView>   
          
          </Tab>
        
          <Tab heading="2"></Tab>
        </Tabs>
        </Container>
        </Animated.View>
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  fill: {
    flex: 1
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center'
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
  tab:{
    position: 'absolute',
    left: 0,
    right: 0,
    overflow: 'hidden',

  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: 20,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT+60
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover'
  }
})
