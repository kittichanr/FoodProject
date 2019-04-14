import React, { Component } from 'react'
import { Text, View, BackHandler } from 'react-native'
import { Scene, Router, Stack, Actions } from 'react-native-router-flux'
import Loading from '../screen/auth/Loading'
import SignUp from '../screen/auth/SignUp'
import Login from '../screen/auth/Login'
import HomeScreen from '../screen/HomeScreen'

const _backAndroidHandler = () => {
  const scene = Actions.currentScene
  if (scene === 'home' || scene === 'signup') {
    BackHandler.exitApp()
    return true
  }
  Actions.pop()
  return true
}

const AppNavigator = () => (
  <Router backAndroidHandler={_backAndroidHandler}>
    <Scene key='root'>
      <Scene
        key='loading'
        component={Loading}
        hideNavBar
        initial
      />
      <Scene key='signup' component={SignUp} hideNavBar />
      <Scene key='login' component={Login} hideNavBar />
      <Scene
        key='home'
        component={HomeScreen}
        hideNavBar
        type='replace'
      />
    </Scene>
  </Router>
)
export default AppNavigator
