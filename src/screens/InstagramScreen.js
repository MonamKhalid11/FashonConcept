import React from 'react';
import {Text} from 'react-native';
import {WebView} from 'react-native-webview';

export default class InstagramScreen extends React.Component {
  render() {
    return (
      // <Text>Instagram</Text>
      <WebView source={{uri: 'https://www.instagram.com/fc_modelsagency/'}} />
    );
  }
}
