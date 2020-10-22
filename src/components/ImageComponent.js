import React from 'react';
import {View, Image} from 'react-native';

export class ImageComponent extends React.Component {
  render() {
    return (
      <View>
        <Image
          source={require('../assets/images/logo-fc-new.png')}
          style={{alignSelf: 'center'}}
        />
      </View>
    );
  }
}
