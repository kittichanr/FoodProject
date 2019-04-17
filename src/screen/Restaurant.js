import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Image
} from 'react-native'
import {
  Tabs,
  Tab,
  Container,
  Content,
  Card,
  CardItem,
  Icon
} from 'native-base'
import { Actions } from 'react-native-router-flux';

const HEADER_MAX_HEIGHT = 200
const HEADER_MIN_HEIGHT = 60
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

export default class Restaurant extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      filterMenu: []
    }
  }
  componentDidMount () {
    const initfilter = this.props.item.Menu.filter(item => {
      return item.type == this.props.item.type[0]
    })
    this.setState({ filterMenu: initfilter })
  }
  _renderScrollViewContent () {
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

  filterMenu (i) {
    const data = this.props.item.Menu.filter(item => {
      return item.type == i.ref.props.heading
    })
    this.setState({ filterMenu: data })
  }

  tabBar = () => {
    return (
      <Container>
        <Tabs onChangeTab={(i, ref, from) => this.filterMenu(i)}>
          {this.props.item.type.map((data, index) => (
            <Tab heading={data} key={data}>
              <Animated.ScrollView
                style={styles.fill}
                onScroll={Animated.event([
                  { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
                ])}
              >
                {this.state.filterMenu.map((item, index) => {
                  return (
                    <Card key={index}>
                      <CardItem cardBody>
                        <Image
                          source={{ uri: item.img }}
                          style={{ width: '100%', height: 150 }}
                        />
                      </CardItem>
                      <CardItem>
                        <Text>{item.name}</Text>
                      </CardItem>
                    </Card>
                  )
                })}
                {this._renderScrollViewContent()}
              </Animated.ScrollView>
            </Tab>
          ))}
        </Tabs>
      </Container>
    )
  }

  render () {
    const tabY = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + 1],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })

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
    const { Name, Img } = this.props.item

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
            source={{ uri: Img }}
          />
          <Animated.View style={styles.bar}>
            <Icon
              name='arrow-back'
              type='MaterialIcons'
              style={{
                color: 'white',
                fontSize: 24,
                marginRight: 110,
              }}
              onPress={()=>Actions.pop()}
            />
            <Text style={styles.title}>{Name}</Text>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.tab, { marginTop: tabHeight }]}>
          {this.tabBar()}
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
    position: 'absolute',
    left: 0,
    right: 0,
    overflow: 'hidden'
  },
  bar: {
    
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 20,
    marginLeft: 5,
    height: 32,
    justifyContent:'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
    
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
