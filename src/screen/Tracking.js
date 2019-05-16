import React, { Component } from 'react'
import { View, Text, InteractionManager, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Card, CardItem, Body, Icon, Left, Right } from 'native-base'
import firebaseService from '../environment/Firebase'
import { Actions } from 'react-native-router-flux'


export class Tracking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracking: []
        }
        this.ref = firebaseService.database().ref('order/')
        this.unsubscribe = null
        _isMounted = false
    }


    componentDidMount() {
        this._isMounted = true
        InteractionManager.runAfterInteractions(() => {
            Actions.refresh({ onBack: () => this._back() })
        })

        this.unsubscribe = this.ref.on('value', this.getTracking)
    }

    componentWillUnmount() {
        this.unsubscribe
        this._isMounted = false
    }

    getTracking = async (snapshot) => {
        const { uid } = firebaseService.auth().currentUser
        var tracking = []
        await snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.child(uid).forEach(function (childchildSnapshot) {
                tracking.push(childchildSnapshot.val())
                if (this._isMounted) {
                    this.setState({ tracking: tracking })
                }
            }.bind(this));
        }.bind(this));
    }


    _back = () => {
        Actions.replace('drawer')
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => Actions.trackdetail({ item: item })}>
                <Card>
                    <CardItem >
                        <Left style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <Text>{item.restaurantname}</Text>
                            <Text>Receiver: {item.name}</Text>
                            <Text>Time: 30 Min</Text>
                        </Left>
                        <Right style={{}}>
                            <Icon name="arrow-forward" />
                        </Right>

                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.tracking}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Tracking)
