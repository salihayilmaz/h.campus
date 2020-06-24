/**
 * @format
 */

import React, {Component} from 'react'
import {AppRegistry} from 'react-native';
import App from './App';

import Login from './components/Login'
import Splash from './components/Splash'
import Register from './components/Register'
import Profile from './components/Profile'
import RewardSystem from './components/RewardSystem';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { currentScreen: 'Splash'};
    setTimeout(() => {
      this.setState({ currentScreen: 'Login'})
    }, 3000)
  }
  constructor(props) {
    super(props);
  
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    };

  render() {
    const { currentScreen } = this.state
    let mainScreen = currentScreen == 'Splash' ? <Splash /> : <Login />
    return mainScreen
  }
}

AppRegistry.registerComponent('healthycampus', () => RewardSystem)
