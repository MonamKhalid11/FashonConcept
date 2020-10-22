import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../constants/colors';
import {FontSize} from '../constants/fonts';

export class GradientButtonComponent extends React.Component {
  render() {
    return (
      <LinearGradient
        start={{x: 0.1, y: 0.1}}
        end={{x: 1.0, y: 1.0}}
        //   colors={['green', 'red']}
        // colors={['#285AEB', '#d6249f', '#fd5949', '#285AEB', '#285AEB']}

        colors={[
          Colors.GradientFirst,
          Colors.GradientSecond,
          Colors.GradientThird,
          Colors.GradientFourth,
          Colors.GradientFifth,
        ]}
        style={{borderRadius: 30}}>
        {/* {this.state.isSubscribed ?
                <View style={[styles.subscribeContainer,{backgroundColor : '#D3D3D3'}]}>
                    <Text style={[styles.SubsButtonText,{color : 'grey'}]}>Subscribed</Text>
                </View> : */}
        <View style={{...styles.Container, ...this.props.containerStyle}}>
          <Text style={{...styles.ButtonText, ...this.props.titleStyle}}>
            {this.props.title}
          </Text>
        </View>
        {/* // } */}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    margin: 2,
    // marginRight: 3,
    backgroundColor: Colors.White,
    borderRadius: 30,
    paddingVertical: 15,
    // height: Dimensions.get('window').height >= 728 ? Dimensions.get('window').height / 15 : Dimensions.get('window').height / 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText: {
    textAlign: 'center',
    // fontSize: 18,
    fontSize: FontSize.FONT_18,
  },
});
