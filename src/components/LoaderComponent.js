import React from 'react';
import {Dimensions, View, ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../constants/colors';
// var HEIGHT = Dimensions.get('window').height;
// var WIDTH = Dimensions.get('window').width;

export default class LoaderComponent extends React.Component {
  render() {
    return (
      <View style={styles.loader}>
        <ActivityIndicator animating={true} size="large" color={Colors.Black} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // height: HEIGHT,
    // width: WIDTH,
    // top:0,
    // left:0,
  },
});
