import React, { Component } from 'react'
import { View, Text, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import firebaseService from '../environment/Firebase'
import { Actions } from 'react-native-router-flux'

export class Tracking extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            Actions.refresh({ onBack: () => this._back() })
        })
    }

    _back = () => {
        Actions.replace('drawer')
    }

    render() {
        return (
            <View style={{}}>
            <Text>5555</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Tracking)
