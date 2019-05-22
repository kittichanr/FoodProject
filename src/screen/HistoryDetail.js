import React, { Component } from 'react'
import { View, Text, ScrollView ,Image} from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Icon, Left, Right } from 'native-base'
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

    render() {
        const { item, imgtrack } = this.props
        return (
            <View>
                <ScrollView>
                    <Card style={{}}>
                        <CardItem style={{ justifyContent: 'center', alignItems: 'center', }} header>
                            {this._image(item.item.restaurantname)}
                        </CardItem>
                    </Card>
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
