import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
var PushNotification = require('react-native-push-notification');
import { ImageComponent } from '../components/ImageComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';
import { MainContainer } from '../components/MainContainer';
import LoaderComponent from '../components/LoaderComponent';
import { SignInScreen } from '../constants/text';
import Colors from '../constants/colors';
import { FontSize } from '../constants/fonts';
import { URL } from '../constants/URL';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      loading: false,
      model_id: '',
    };
  }

  getDeviceToken = async () => {
    return await messaging()
      .hasPermission()
      .then(async (enabled) => {
        if (enabled) {
          return await messaging()
            .getToken()
            .then((fcmToken) => {
              return fcmToken;
            })
            .catch((error) => {
              return null;
            });
        } else {
          return null;
        }
      })
      .catch((error) => {
        return null;
      });
  };

  componentDidMount() {
    // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //   PushNotification.localNotification({
    //     title: remoteMessage.notification.title,
    //     message: remoteMessage.notification.body,
    //   });
    // });
    // messaging().onMessage(async (remoteMessage) => {
    //   PushNotification.localNotification({
    //     title: remoteMessage.notification.title,
    //     message: remoteMessage.notification.body,
    //   });
    // });
  }

  loginAPI = async () => {
    this.setState({ loading: true });

    const formData = new FormData();
    formData.append('method', 'login');
    formData.append('email', this.state.Email);
    formData.append('password', this.state.Password);
    formData.append('device_type', Platform.OS);
    const token = await this.getDeviceToken();
    formData.append('device_token', token || '');
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == 1) {
          AsyncStorage.setItem('loginResponse', JSON.stringify(responseJson));
          this.props.navigation.navigate('Initial');
        } else {
          Alert.alert(SignInScreen.INVALID_CREDENTIALS);
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        Alert.alert(err);
      });
  };

  validate = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.Email) === false || this.state.Password === '') {
      Alert.alert(SignInScreen.INVALID_CREDENTIALS);
    } else {
      this.loginAPI();
    }
  };

  render() {
    return (
      <MainContainer>
        <ImageComponent />
        <View style={styles.innerView}>
          <InputComponent
            title={SignInScreen.EMAIL_PLACEHOLDER_TEXT}
            value={this.state.email}
            onChange={(email) => this.setState({ Email: email })}
          />
          <InputComponent
            secureTextEntry={true}
            title={SignInScreen.PASSWORD_PLACEHOLDER_TEXT}
            value={this.state.Password}
            onChange={(pass) => this.setState({ Password: pass })}
          />
          <View style={styles.touchable}>
            <ButtonComponent
              title={SignInScreen.LOGIN_BUTTON_TEXT}
              onPress={() => this.validate()}
            />
          </View>
          <View style={styles.noAccountCont}>
            <Text style={styles.noAccountText}>
              {SignInScreen.DONT_HAVE_AN_ACCOUNT_TEXT}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={styles.blueText}>
                {SignInScreen.REGISTRATION_TEXT}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.blueText}>
                {SignInScreen.FORGOT_PASSWORD_TEXT}
              </Text>
            </TouchableOpacity>
          </View>

          {this.state.loading && <LoaderComponent />}
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
  touchable: {
    width: '100%',
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height / 15,
  },
  noAccountCont: {
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: FontSize.FONT_16,
  },
  blueText: {
    color: Colors.Blue,
    fontSize: FontSize.FONT_16,
  },
});
