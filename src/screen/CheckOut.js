import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Header, Content, Card, CardItem, Body, Item, Left, Right, Input, Footer } from 'native-base';
import { connect } from 'react-redux'
import firebaseService from '../environment/Firebase'
import { Actions } from 'react-native-router-flux'
import { removeCart } from '../actions/Menu';


export class CheckOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: null,
            reciever: '',
            contact: '',
            location: this.props.location[0].name + ' ' + this.props.location[0].street + ' ' + this.props.location[0].postalCode

        }
    }
    componentDidMount() {
        const { currentUser } = firebaseService.auth()
        this.setState({ currentUser })
    }
    confirm = () => {
        const restaurantname = this.props.restaurantname
        const uid = this.state.currentUser.uid
        const order = this.props.orderCheckOut
        if (this.state.contact != '' && this.state.reciever != '') {
            if (this.state.contact.match(/\d/g).length === 10) {
                firebaseService.database().ref('order/' + restaurantname + '/' + uid).push({
                    name: this.state.reciever,
                    contact: this.state.contact,
                    location: this.state.location,
                    order: order,
                    restaurantname: restaurantname,
                })
                Actions.tracking()
                this.props.removeCart()
            } else {
                alert('Invalid Phone Number or Receiever name')
            }
        } else {
            alert('Require Phone Number')
        }

    }

    renderItem = ({ item }) => {
        return (
            <CardItem>
                <Left>
                    <Text>
                        {item.Menuname} ({item.order.item})
                    </Text>
                </Left>
                <Body />
                <Body>
                    <Text>
                        {item.amount}
                    </Text>
                </Body>
                <Right>
                    <Text>
                        {item.order.price * item.amount} ฿
                    </Text>
                </Right>
                <Right />
            </CardItem>
        )
    }

    render() {
        const order = this.props.orderCheckOut
        var sum = 0
        for (var i = 0; i < order.length; i++) {
            sum += order[i].amount * order[i].order.price
        }

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <Card>
                            <CardItem header>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Order</Text>
                            </CardItem>
                            <CardItem style={{ fontWeight: 'bold' }} bordered>
                                <Left>
                                    <Text>Menu</Text>
                                </Left>
                                <Body />
                                <Body>
                                    <Text>Amount</Text>
                                </Body>
                                <Right>
                                    <Text>Price </Text>
                                </Right>
                                <Right />
                            </CardItem>
                            <FlatList
                                data={this.props.orderCheckOut}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            <CardItem style={{ fontWeight: 'bold' }} bordered>
                                <Left>
                                    <Text style={{ fontWeight: 'bold' }}>Total Price</Text>
                                </Left>
                                <Body />
                                <Body />
                                <Right>
                                    <Text>{sum} ฿</Text>
                                </Right>
                                <Right />
                            </CardItem>
                        </Card>
                        <Card style={{ height: 350 }}>
                            <CardItem header style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Reciever</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.reciever}
                                    onChangeText={reciever => this.setState({ reciever })} />
                            </CardItem>
                            <CardItem header style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Contact</Text>
                                <TextInput
                                autoFocus
                                    style={styles.textInput}
                                    value={this.state.contact}
                                    keyboardType='number-pad'
                                    maxLength={10}
                                    onChangeText={contact => this.setState({ contact })} />
                            </CardItem>
                            <CardItem header style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Location</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={this.state.location}
                                    onChangeText={location => this.setState({ location })}
                                />
                            </CardItem>
                        </Card>
                    </View>
                </ScrollView>
                <View style={styles.footer}>

                    <TouchableOpacity
                        style={styles.checkOut}
                        activeOpacity={0.5}
                        onPress={() => {
                            this.confirm()
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>
                            Confirm
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewCheckOut: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        height: 60,
        justifyContent: 'space-around',
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        flexDirection: 'row'
    },
    checkOut: {
        height: 35,
        width: 150,
        backgroundColor: 'green',
        borderRadius: 10,
        borderWidth: 1,
        textAlign: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        marginLeft: 5
    },
    textInput: {
        height: 30,
        width: '90%',
        borderWidth: 1,
        marginTop: 8
    },
    footer: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: -10,
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    }

})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    removeCart: () => {
        dispatch(removeCart())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)
