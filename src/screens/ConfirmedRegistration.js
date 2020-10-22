import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {ImageComponent} from '../components/ImageComponent';
import {ConfirmedRegistrationScreen} from '../constants/text';
import {MainContainer} from '../components/MainContainer';
import Colors from '../constants/colors';
import {FontSize} from '../constants/fonts';

export default class ConfirmedRegistration extends Component {
  render() {
    return (
      <MainContainer>
        <ImageComponent />
        <View style={styles.innerView}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {ConfirmedRegistrationScreen.CONFIRMED_REGISTRATION_TEXT}
            </Text>
          </View>
          <Image
            source={require('../assets/images/done_image.png')}
            style={styles.doneImagefield}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text
              style={{
                color: Colors.Blue,
                marginTop: '5%',
                fontSize: FontSize.FONT_16,
              }}>
              {ConfirmedRegistrationScreen.BACK_TO_LOGIN_TEXT}
            </Text>
          </TouchableOpacity>
        </View>
      </MainContainer>
    );
  }
}

const styles = StyleSheet.create({
  innerView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    marginTop: '10%',
  },
  doneImagefield: {
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').height / 5,
    alignSelf: 'center',
  },
  text: {
    color: Colors.Black,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: FontSize.FONT_16,
  },
  textContainer: {
    // marginTop: Dimensions.get('window').height/15, //'15%',
    marginBottom: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    // textAlign: 'center',
    width: '100%',
  },
});
