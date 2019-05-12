import React from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity, FlatList, Button } from 'react-native'
import firebaseService from '../environment/Firebase'
import { Actions } from 'react-native-router-flux'
import { Icon, Card, CardItem, } from 'native-base';
import { Constants, Location, Permissions } from 'expo';
import { connect } from 'react-redux';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };
class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      location: { coords: { latitude: 0, longitude: 0 } },
      result: '',
      items: [],
      Allorder: []
    }
  }

  _renderRightButton = () => {
    return (
      <Icon type='Feather' name='shopping-bag' style={{ fontSize: 24, color: 'black', paddingHorizontal: 5 }} onPress={() => Actions.push('cart', { Allorder: this.state.Allorder })} />

    );
  };

  componentWillMount() {
    this.props.navigation.setParams({
      right: this._renderRightButton
    });
    firebaseService.database().ref(`/Restaurant`).once(
      'value', (snapshot) => {
        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({ items });
      });
  }

  componentDidMount() {
    const { currentUser } = firebaseService.auth()
    this.setState({ currentUser })
  }

  signOutUser = async () => {
    try {
      firebaseService.auth().signOut()
      Actions.replace('loading')
    } catch (e) {
      console.log(e)
    }
  }

  logout = () => {
    this.signOutUser()
  }

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    const location = await Location.getCurrentPositionAsync(GEOLOCATION_OPTIONS);
    this.setState({ location: { coords: { latitude: location.coords.latitude, longitude: location.coords.longitude } } });
    try {
      let result = await Location.reverseGeocodeAsync(this.state.location.coords);

      this.setState({ result });
    } catch (e) {
      this.setState({ error: e });
    }
    // console.log(this.state.result)
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => Actions.push('restaurant', { item: item })}>
        <Card>
          <CardItem cardBody>
            <Image source={{ uri: item.Img }} style={{ width: '100%', height: 150 }} />
          </CardItem>
          <CardItem >
            <Text>{item.Name}</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }



  render() {
    // console.log("Allorder home",this.state.Allorder)
    const { currentUser, result } = this.state
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 5 }}>
          <Text style={styles.text}>Delivery to: </Text>
          <Text style={[styles.text, { color: 'red' }]}>{result == '' ? ' ' : 'Current Location'}</Text>
          <TouchableOpacity onPress={() => this.getLocation()}>
            <Icon type='MaterialIcons' name='my-location' style={styles.locateIcon} />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={this.state.items}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{ padding: 10 }}
          />
        </View>
        {/* <Text>Hi {currentUser && currentUser.email}!</Text> */}
        <Button title='LogOut' onPress={() => this.logout()} />
        {/* <Button title='Page2' onPress={()=>Actions.page2()}/> */}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: 'white'
  },
  locateIcon: {
    fontSize: 48,
    color: 'black',
    marginLeft: 5,
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
  }

})

const mapStateToProps = state => ({})
export default connect(mapStateToProps)(HomeScreen)
