import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../constants/colors';
import {FontSize} from '../constants/fonts';
import {ProfileTabScreenOptionName} from '../constants/text';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_modal: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('loginResponse').then((response) => {
      let ParsedResponse = JSON.parse(response);
      this.setState({is_modal: ParsedResponse.data.is_model});
    });
  }

  confirmLogout = () => {
    Alert.alert('', 'Vuoi eseguire il logout?', [
      {
        text: 'Annulla',
      },
      {text: 'Ok', onPress: () => this._doLogout()},
    ]);
  };

  _doLogout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Initial');
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.mainCont}>
          {this.state.is_modal == 'yes' ? (
            <View>
              <TouchableOpacity
                style={styles.optionCont}
                onPress={() =>
                  this.props.navigation.navigate('UploadPhotoScreen')
                }>
                <Text style={styles.optionText}>
                  {ProfileTabScreenOptionName.UPLOAD_PHOTO}
                </Text>
                <Image
                  source={require('../assets/images/RightArrowIcon.png')}
                />
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.optionCont}
                onPress={() =>
                  this.props.navigation.navigate('YourDataScreen')
                }>
                <Text style={styles.optionText}>
                  {ProfileTabScreenOptionName.YOUR_DATA}
                </Text>
                <Image
                  source={require('../assets/images/RightArrowIcon.png')}
                />
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.optionCont}
                onPress={() =>
                  this.props.navigation.navigate('PublicProfileScreen')
                }>
                <Text style={styles.optionText}>
                  {ProfileTabScreenOptionName.PUBLIC_PROFILE}
                </Text>
                <Image
                  source={require('../assets/images/RightArrowIcon.png')}
                />
              </TouchableOpacity>
              <View style={styles.separator} />
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.optionCont}
            onPress={() => this.props.navigation.navigate('SettingScreen')}>
            <Text style={styles.optionText}>
              {ProfileTabScreenOptionName.SETTING}
            </Text>
            <Image source={require('../assets/images/RightArrowIcon.png')} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.optionCont}
            onPress={() => this.props.navigation.navigate('ContactUsScreen')}>
            <Text style={styles.optionText}>
              {ProfileTabScreenOptionName.CONTACT_US}
            </Text>
            <Image source={require('../assets/images/RightArrowIcon.png')} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.optionCont}
            onPress={() => this.confirmLogout()}>
            <Text style={styles.optionText}>
              {ProfileTabScreenOptionName.LOGOUT}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainCont: {
    paddingHorizontal: 30,
    marginVertical: 20,
    backgroundColor: Colors.White,
  },
  optionCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    width: '100%',
  },
  optionText: {
    fontWeight: 'bold',
    fontSize: FontSize.FONT_16,
  },
  optionArrowStyle: {
    fontWeight: 'bold',
    fontSize: FontSize.FONT_20,
    color: Colors.lightGrey,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightGrey,
    width: '100%',
  },
});
