import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Colors from '../constants/colors';

export class BorderInputContainer extends React.Component {
  render() {
    return (
      <View style={{marginBottom: 10}}>
        <Text style={{paddingBottom: 10, fontWeight: 'bold'}}>
          {this.props.Title}:
        </Text>
        <TextInput
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          keyboardType={this.props.keyboard}
          style={{
            ...this.props.otherStyle,
            ...{
              borderBottomColor: Colors.Black,
              borderBottomWidth: 1,
              height: 40,
            },
          }}
        />
      </View>
    );
  }
}
