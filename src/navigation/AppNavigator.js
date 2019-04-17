import React, { Component } from 'react'
import { Text, View, BackHandler } from 'react-native'
import { Icon } from 'native-base';
import { Scene, Router, Stack, Actions, Drawer,Modal, } from 'react-native-router-flux'
import Loading from '../screen/auth/Loading'
import SignUp from '../screen/auth/SignUp'
import Login from '../screen/auth/Login'
import HomeScreen from '../screen/HomeScreen'
import Restaurant from '../screen/Restaurant'
import MenuScreen from '../screen/MenuScreen'
import DrawerMenu from '../component/DrawerMenu'

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
  return <Icon type='FontAwesome' name='bars' style={{fontSize: 20,color:'black'}}/>
}

const shopIcon = () => {
  return <Icon type='Feather' name='shopping-bag' style={{fontSize: 24,color:'black',paddingHorizontal: 5}} onPress={()=>{alert('555')}}/>
}



const AppNavigator = () => (
  <Router backAndroidHandler={_backAndroidHandler}>
  <Modal >
    <Scene key='root' hideNavBar={true}>
      <Scene key='loading' component={Loading} hideNavBar initial/>
      <Scene key='signup' component={SignUp} hideNavBar />
      <Scene key='login' component={Login} hideNavBar />
      <Drawer hideNavBar
              key="drawer"
              contentComponent={DrawerMenu}
              drawerIcon={menuIcon}
              drawerWidth={300}
              
              >
        <Scene key='home' component={HomeScreen} title="Home" renderRightButton={shopIcon}/>
      </Drawer>  
    </Scene>
    <Scene key='restaurant' component={Restaurant} hideNavBar/>
    <Scene key='menu' component={MenuScreen} hideNavBar/>
   </Modal>
  </Router>
)
export default AppNavigator
