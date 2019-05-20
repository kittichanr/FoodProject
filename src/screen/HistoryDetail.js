import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { connect } from 'react-redux'


export class HistoryDetail extends Component {


    render() {
        console.log(this.props.item)
        return (
            <View>
                <Text> prop </Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetail)
