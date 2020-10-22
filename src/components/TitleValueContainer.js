import React from 'react';
import {View, Text} from 'react-native';
import {FontSize} from '../constants/fonts';

export class TitleValueContainer extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          flexWrap: 'wrap',
        }}>
        <View>
          <Text
            style={{
              color: Colors.Black,
              fontWeight: 'bold',
              fontSize: FontSize.FONT_18,
            }}>
            {this.props.title} :{' '}
          </Text>
        </View>
        <View>
          <Text style={{color: Colors.Grey, fontSize: FontSize.FONT_18}}>
            {this.props.value}
          </Text>
        </View>
      </View>
    );
  }
}
