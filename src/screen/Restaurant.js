import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {
  Body,
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

import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';

const HEADER_MAX_HEIGHT = 200
const HEADER_MIN_HEIGHT = 60
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
const { width: SCREEN_WIDTH } = Dimensions.get('window')
const COLOR = 'rgb(45,181,102)'
const TAB_PROPS = {
  tabStyle: { width: SCREEN_WIDTH / 2, backgroundColor: COLOR },
  activeTabStyle: { width: SCREEN_WIDTH / 2, backgroundColor: COLOR },
  textStyle: { color: 'white' },
  activeTextStyle: { color: 'white' }
}

class Restaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      filterMenu: [],
      isReady: false,
      Allorder: []
    }
    this.headerY = Animated.multiply(
      Animated.diffClamp(this.state.scrollY, 0, HEADER_SCROLL_DISTANCE),
      -1
    )
  }


  componentDidMount() {
    const initfilter = this.props.item.Menu.filter(item => {
      return item.type == this.props.item.type[0]
    })
    this.setState({ filterMenu: initfilter })
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 })
    return (
      <View>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    )
  }

  filterMenu(i) {
    const data = this.props.item.Menu.filter(item => {
      return item.type == i.ref.props.heading
    })
    this.setState({ filterMenu: data })
  }

  tabBar = () => {

    const tabContent = (
      <List>{new Array(20).fill(null).map((_, i) => <Item
        key={i}><Text>Item {i}</Text></Item>)}</List>)
    const tabY = Animated.add(this.state.scrollY, this.headerY)
    return (

      <Animated.ScrollView
      
        scrollEventThrottle={1}
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ zIndex: 0,height:'100%', elevation: -1 }}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT}}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],

        )}
        overScrollMode="never"
        
      >
        <Tabs
          onChangeTab={(i, ref, from) => this.filterMenu(i)}
          renderTabBar={(props) => <Animated.View
            style={[{
              transform: [{ translateY: tabY }],
              zIndex: 1,
              width: '100%',
              backgroundColor: COLOR
            }, Platform.OS === 'ios' ? { paddingTop: 20 } : null]}>
            <ScrollableTab {...props} underlineStyle={{ backgroundColor: 'white' }} />
          </Animated.View>
          }>
          {this.props.item.type.map((data, index) => (
            <Tab heading={data} key={data}>
              {this.state.filterMenu.map((item, index) => {
                return (
                  <TouchableOpacity onPress={() => Actions.menu({ menu: item, restaurantName: this.props.item.Name })} key={index}>
                    <Card key={index}>
                      <CardItem cardBody>
                        <Image
                          source={{ uri: item.img }}
                          style={{ width: '100%', height: 150 }}
                        />
                      </CardItem>
                      <CardItem>
                        <Text>{item.name}</Text>
                        <Right>
                          <Text>{item.price} ฿</Text>
                        </Right>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                )
              })}
            </Tab>
          ))}
        </Tabs>
      
      </Animated.ScrollView>

    )
  }

  render() {
    // console.log("Allorder restaurant",this.state.Allorder)
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

    const { Name, Img } = this.props.item
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.header, {
          width: '100%',
          position: 'absolute',
          height: headerHeight,
          elevation: 0,
          flex: 1,
          zIndex: 1,
          backgroundColor: COLOR
        }]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={{ uri: Img }}
          />
          <Animated.View style={styles.bar}>
            <View>
              <Icon
                name='arrow-back'
                type='MaterialIcons'
                style={{
                  color: 'white',
                  fontSize: 24,
                  marginRight: 110,
                }}
                onPress={() => {
                  Actions.pop()
                  setTimeout(() => {
                    Actions.refresh({
                      Allorder: this.state.Allorder
                    })
                  }, 0)
                }}
              />
            </View>
            <Text style={styles.title}>{Name}</Text>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.tab]}>
          {this.tabBar()}
          
        </Animated.View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  fill: {
    flex: 1,
    marginTop: 5
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
    height: HEADER_MAX_HEIGHT
  },
  tab: {
    flex: 1
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 20,
    marginLeft: 5,
    height: 32,
    justifyContent: 'flex-start',

  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT + 60
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

export default connect()(Restaurant)
