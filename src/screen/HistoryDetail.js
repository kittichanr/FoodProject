import React, { Component } from 'react'
import { View, Text, ScrollView, Image, FlatList } from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Icon, Left, Right, List, ListItem } from 'native-base'
import { connect } from 'react-redux'


export class HistoryDetail extends Component {
    _image = (name) => {
        for (var i = 0; i < this.props.imgtrack.length; i++) {
            if (this.props.imgtrack[i].name == name.replace(/\s/g, '')) {
                return (<Image
                    source={{ uri: this.props.imgtrack[i].url }}
                    style={{ width: 100, height: 100 }}
                />
                )
            }
        }
    }

    renderItem = ({ item, index }) => {
        let amountItem = item.amount
        const amountPrice = amountItem * item.order.price
        return (
            <CardItem>
                <Left style={{ flexDirection: 'column', marginLeft: 20 }}>
                    <Text>{item.Menuname}</Text>
                    <Text style={{ textAlign: 'left' }}>({item.order.item})</Text>
                </Left>
                <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{amountItem}</Text>
                </Body>
                <Right style={{ marginRight: 20 }}>
                    <Text>{amountPrice} ฿</Text>
                </Right>
            </CardItem>
        )
    }

    render() {
        const { item, imgtrack } = this.props
        var sum = 0
        for (var i = 0; i < item.item.order.length; i++) {
            sum += item.item.order[i].amount * item.item.order[i].order.price
        }
        return (
            <View>
                <ScrollView>
                    <Card style={{}}>
                        <CardItem style={{ justifyContent: 'center', alignItems: 'center', }} header>
                            {this._image(item.item.restaurantname)}
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header bordered>
                            <Text>Info</Text>
                        </CardItem>
                        <CardItem bordered>
                            <View style={{ flexDirection: 'column' }}>
                                <Text>Date on {item.date}</Text>
                                <Text>Restaurant: {item.item.restaurantname}</Text>
                                <Text>Receiver: {item.item.name}</Text>
                                <Text>location: {item.item.location}</Text>
                                <Text>contact: {item.item.contact}</Text>
                            </View>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header bordered>
                            <Text>Ordered</Text>
                        </CardItem>
                        <CardItem style={{ fontWeight: 'bold' }} bordered>
                            <Left style={{ marginLeft: 20 }}>
                                <Text style={{ fontWeight: 'bold' }}>Menu</Text>
                            </Left>
                            <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>Amount</Text>
                            </Body>
                            <Right style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >Price </Text>
                            </Right>
                        </CardItem>
                        <FlatList
                            data={item.item.order}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            style={{ marginTop: 20 }}
                        />
                    </Card>
                    <CardItem style={{}} bordered>
                        <Left style={{ marginLeft: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>Total Price</Text>
                        </Left>
                        <Body />
                        <Right style={{ marginRight: 20 }}>
                            <Text>{sum} ฿</Text>
                        </Right>
                    </CardItem>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetail)
