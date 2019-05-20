import React, { Component } from 'react';
import { Text, View, BackHandler } from 'react-native';
import { Icon } from 'native-base';
import { Scene, Router, Stack, Actions, Drawer, Modal, ActionConst } from 'react-native-router-flux';
import Loading from '../screen/auth/Loading';
import SignUp from '../screen/auth/SignUp';
import Login from '../screen/auth/Login';
import HomeScreen from '../screen/HomeScreen';
import Restaurant from '../screen/Restaurant';
import MenuScreen from '../screen/MenuScreen';
import DrawerMenu from '../component/DrawerMenu';
import Cart from '../component/Cart';
import CheckOut from '../screen/CheckOut'
import Tracking from '../screen/Tracking'
import TrackDetail from '../screen/TrackDetail'
import HistoryScreen from '../screen/HistoryScreen';
import HistoryDetail from '../screen/HistoryDetail';

import { Provider } from 'react-redux';
import configureStore from '../store/store';
import { RouterRedux } from './RouterRedux'

const _backAndroidHandler = () => {
  const scene = Actions.currentScene
  // console.log(scene)
  if (scene === '_home' || scene === 'signup') {
    BackHandler.exitApp()
    return true
  }
  Actions.pop()
  return true
}

const menuIcon = () => {
  return <Icon type='FontAwesome' name='bars' style={{ fontSize: 20, color: 'black' }} />
}

const shopIcon = () => {
  return <Icon type='Feather' name='shopping-bag' style={{ fontSize: 24, color: 'black', paddingHorizontal: 5 }} onPress={() => Actions.cart()} />
}


const store = configureStore();
export class AppNavigator extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouterRedux backAndroidHandler={_backAndroidHandler}>
          <Modal >
            <Scene key='root' hideNavBar={true}>
              <Scene key='loading' component={Loading} hideNavBar initial />
              <Scene key='signup' component={SignUp} hideNavBar />
              <Scene key='login' component={Login} hideNavBar />

              <Drawer hideNavBar
                key="drawer"
                contentComponent={DrawerMenu}
                drawerIcon={menuIcon}
                drawerWidth={300}
                type={ActionConst.RESET}

              >
                <Scene key='home' component={HomeScreen} title="Home" />
              </Drawer>
            </Scene>
            <Scene key='restaurant' component={Restaurant} hideNavBar />
            <Scene key='menu' component={MenuScreen} hideNavBar />
            <Scene key='cart' component={Cart} title="Cart" back={true} />
            <Scene key='checkout' component={CheckOut} title="CheckOut" back={true} />
            <Scene key='tracking' component={Tracking} title="Tracking" back={true} />
            <Scene key='trackdetail' component={TrackDetail} title="TrackDetail" back={true} />
            <Scene key='history' component={HistoryScreen} title="History" back={true} />
            <Scene key='historydetail' component={HistoryDetail} title="HistoryDetail" back={true} />
          </Modal>
        </RouterRedux>
      </Provider>
    )
  }
}

