import React from 'react';
import {View} from 'react-native';
import Colors from '../constants/colors';

export class Separator extends React.Component {
  render() {
    return (
      <View
        style={{
          marginTop: 10,
          width: '100%',
          backgroundColor: Colors.lightGrey,
          height: 1,
        }}
      />
    );
  }
}
