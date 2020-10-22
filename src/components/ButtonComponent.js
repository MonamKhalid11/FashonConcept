import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {GradientButtonComponent} from '../components/GradientButtonComponent';
import Colors from '../constants/colors';
import {FontSize} from '../constants/fonts';

export class ButtonComponent extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{...styles.touchable, ...this.props.style}}
        disabled={this.props.disabled}
        onPress={this.props.onPress}>
        <GradientButtonComponent title={this.props.title} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    borderRadius: 30,
  },
  buttonText: {
    color: Colors.Black,
  },

  subscribeContainer: {
    margin: 2,
    backgroundColor: Colors.White,
    borderRadius: 30,
    height:
      Dimensions.get('window').height >= 728
        ? Dimensions.get('window').height / 15
        : Dimensions.get('window').height / 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubsButtonText: {
    textAlign: 'center',
    fontSize: FontSize.FONT_18,
  },
});
