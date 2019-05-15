import React, { Component } from 'react'
import { View, Text, InteractionManager,FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Card, CardItem, Body ,Icon,Left,Right} from 'native-base'
import firebaseService from '../environment/Firebase'
import { Actions } from 'react-native-router-flux'


export class Tracking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracking:[]
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            Actions.refresh({ onBack: () => this._back() })
        })

        const { uid } = firebaseService.auth().currentUser
        var tracking = []
        firebaseService.database().ref('order/').once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.child(uid).forEach(function(childchildSnapshot){
                // console.log('data'+ JSON.stringify (childchildSnapshot.val()));
                tracking.push(childchildSnapshot.val())
                this.setState({tracking:tracking})
              }.bind(this));
            }.bind(this));
          }.bind(this));

          
    }

    _back = () => {
        Actions.replace('drawer')
    }

    renderItem = ({item}) =>{
        return(
            <Card>
                <CardItem >
                    <Left style={{flexDirection:'column',justifyContent:'flex-start'}}>
                        <Text>{item.restaurantname}</Text>
                        <Text>Receiver: {item.name}</Text>
                        <Text>Time: 30 Min</Text>
                    </Left>
                    <Right style={{}}>
                        <Icon name="arrow-forward" />
                    </Right>
                    
                </CardItem>
            </Card>
        )
    }

    render() {
        
        return (
            <View style={{flex:1}}>
                <FlatList
                    data={this.state.tracking}
                    renderItem={this.renderItem}
                    keyExtractor={(item,index)=>index.toString()}
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
