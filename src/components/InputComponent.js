import React from 'react';
import {View, StyleSheet, TextInput, Dimensions} from 'react-native';
import globalStyles from '../constants/globalStyles';
import Colors from '../constants/colors';
import {FontSize} from '../constants/fonts';

export class InputComponent extends React.Component {
  render() {
    return (
      <View style={{...styles.inputView, ...this.props.style}}>
        <TextInput
          placeholder={this.props.title}
          placeholderTextColor={Colors.Black}
          // style={[globalStyles.textInputFont ,{width: '100%'} ]}
          style={{width: '100%', fontSize: FontSize.FONT_16}}
          value={this.props.value}
          onChangeText={this.props.onChange}
          {...this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputView: {
    borderBottomColor: Colors.Black,
    borderBottomWidth: 1,
    width: '100%',
    marginHorizontal: '10%',
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height / 35,
  },
});
