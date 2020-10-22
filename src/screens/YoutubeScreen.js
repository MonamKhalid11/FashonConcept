import React from 'react';
import {WebView} from 'react-native-webview';

export default class YoutubeScreen extends React.Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://www.youtube.com/channel/UCPZskovvUE_lYm9Rn4FiyzQ',
        }}
      />
    );
  }
}
