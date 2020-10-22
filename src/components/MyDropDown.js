import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown-v2';

import Colors from '../constants/colors';

export class MyDropDown extends React.Component {
  render() {
    return (
      <View style={styles.dropdownHeadingTextCont}>
        <Text style={styles.dropdownHeadingText}>{this.props.Heading}:</Text>
        <Dropdown
          containerStyle={{
            width: '100%',
            justifyContent: 'center',
            alignSelf: 'center',
            borderBottomColor: Colors.Black,
            borderBottomWidth: 1,
            height: 40,
          }}
          dropdownPosition={0}
          baseColor={Colors.Black}
          lineWidth={0}
          label={this.props.label}
          // value={this.state.provisionPickerValue}
          onChangeText={this.props.onChangeText}
          data={this.props.data}
          value={this.props.value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropdownHeadingTextCont: {
    marginBottom: 10,
  },
  dropdownHeadingText: {
    paddingBottom: 10,
    fontWeight: 'bold',
  },
});
