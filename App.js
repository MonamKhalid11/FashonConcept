import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import MainStack from './src/router/AppNavigators';
import messaging from '@react-native-firebase/messaging';
import { AppEventsLogger } from "react-native-fbsdk";


const App = createAppContainer(MainStack);
console.disableYellowBox = true;

export default class Navigator extends Component {
  constructor(props) {
    super(props)
    this.requestUserPermission()

  }
  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  componentDidMount() {
    AppEventsLogger.logEvent('Launced app')
    messaging()
      .getToken()
      .then((fcmToken) => {
        console.log("showing token", fcmToken)
      })
      .catch((error) => {
      });
  }
  render() {
    return (
      <App
        ref={(ref) => {
          this.navigator = ref;
        }}
      />
    );
  }
}
