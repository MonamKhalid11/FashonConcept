import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/colors';
export class CastingList extends React.Component {
  render() {
    return (
      <View style={{marginVertical: 10, width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            height: Dimensions.get('window').height / 7,
          }}>
          {/* <View style={styles.imageContainer}> */}
          {/* <Text>Image</Text> */}
          <Image
            source={this.props.path}
            style={{
              width: Dimensions.get('window').width / 3.5,
              height: Dimensions.get('window').height / 10,
            }}
          />
          {/* </View> */}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingLeft: 20,
            }}>
            <Text>{this.props.Title}</Text>
            <Text>{this.props.Subtitle}</Text>
            <Text>{this.props.Description}</Text>
            <TouchableOpacity onPress={this.props.onPress}>
              <Text>Read More</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: Colors.lightGrey,
            height: 1,
            marginTop: Dimensions.get('window').height / 35,
          }}
        />
      </View>
    );
  }
}
