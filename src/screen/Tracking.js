import React, { Component } from 'react'
import { View, Text, InteractionManager, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Card, CardItem, Body, Icon, Left, Right } from 'native-base'
import firebaseService from '../environment/Firebase'
import { Actions } from 'react-native-router-flux'




export class Tracking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracking: [],
            imgtrack: [],
            trackKey: [],
            loading: true
        }
        this.ref = firebaseService.database().ref('order/')
        this.ref2 = firebaseService.database().ref('ImgResTrack/')
        this.unsubscribe = null
        this.imgtrack = null
        _isMounted = false
        this.timer = null
    }


    componentDidMount() {
        this.timer = setTimeout(() => {this.setState({ loading: false })}, 3000)
        this._isMounted = true
        InteractionManager.runAfterInteractions(() => {
            Actions.refresh({ onBack: () => this._back() })
        })

        this.unsubscribe = this.ref.on('value', this.getTracking)
        this.imgtrack = this.ref2.on('value', this.getImageTrack)
    }
    componentWillMount() {

    }

    componentWillUnmount() {
        this.imgtrack
        this.unsubscribe
        this._isMounted = false
        clearTimeout(this.timer);
        this.timer = null
        this.setState({ loading: true })
    }

    getTracking = (snapshot) => {
        const { uid } = firebaseService.auth().currentUser
        var tracking = []
        var trackKey = []
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.child(uid).forEach(function (childchildSnapshot) {
                tracking.push(childchildSnapshot.val())
                trackKey.push(childchildSnapshot.key)
                if (this._isMounted) {
                    this.setState({ tracking: tracking })
                    this.setState({ trackKey: trackKey })
                }
            }.bind(this));
        }.bind(this));
    }

    getImageTrack = (snapshot) => {
        var imgtrack = []
        snapshot.forEach(function (childSnapshot) {
            imgtrack.push({ name: childSnapshot.key, url: childSnapshot.val() })
            if (this._isMounted) {
                this.setState({ imgtrack: imgtrack })
            }
        }.bind(this))

    }

    _image = (name) => {
        for (var i = 0; i < this.state.imgtrack.length; i++) {
            if (this.state.imgtrack[i].name == name.replace(/\s/g, '')) {
                return (<Image
                    source={{ uri: this.state.imgtrack[i].url }}
                    style={{ width: 50, height: 50 }}
                />
                )
            }
        }
    }

    loading = () => {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 3000)

    }

    _back = () => {
        Actions.replace('drawer')
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => Actions.trackdetail({ item: item, imgtrack: this.state.imgtrack, trackKey: this.state.trackKey[index] })}>
                <Card>
                    <CardItem >
                        <Left style={{}}>

                            {this._image(item.restaurantname)}
                        </Left>
                        <Body style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <Text>{item.restaurantname}</Text>
                            <Text>Receiver: {item.name}</Text>
                            <Text>Time: 30 Min</Text>
                        </Body>
                        <Right style={{}}>
                            <Icon name="arrow-forward" />
                        </Right>

                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }

    render() {
        return (<View style={{ flex: 1 }}>
            {
                this.state.loading == true ?
                    <View style={styles.container}>
                        <Text>Loading</Text>
                        <ActivityIndicator size="large" />
                    </View>
                    :
                    <FlatList
                        data={this.state.tracking}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
            }
        </View>

        )

    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Tracking)
