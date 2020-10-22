import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {ImageComponent} from '../components/ImageComponent';
import {ButtonComponent} from '../components/ButtonComponent';
import {InputComponent} from '../components/InputComponent';
import {MainContainer} from '../components/MainContainer';
import LoaderComponent from '../components/LoaderComponent';
import {PasswordResetScreen} from '../constants/text';
import Colors from '../constants/colors';
import {FontSize} from '../constants/fonts';
import {URL} from '../constants/URL';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false,
    };
  }

  validateAPI = async () => {
    const formData = new FormData();
    formData.append('method', 'changePassword');
    formData.append('email', this.state.email);
    formData.append('password', '123');

    this.setState({loading: true});
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == 1) {
          Alert.alert(responseJson.msg);
        } else {
          Alert.alert('try again');
        }
        this.setState({loading: false});
      });
  };

  validate = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === true) {
      this.validateAPI();
    } else {
      Alert.alert('please enter valid mail');
    }
  };

  render() {
    return (
      <MainContainer>
        <ImageComponent />
        <View style={styles.innerView}>
          {/* {this.props.children} */}

          {/* <Image source={require('../assets/images/logo-fc.png')} style={styles.imagefield} /> */}
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {PasswordResetScreen.RESET_HEADING_TEXT}
            </Text>
            <Text style={styles.textReset}>
              {PasswordResetScreen.RESET_TEXT}
            </Text>
            <InputComponent
              title={PasswordResetScreen.EMAIL_PLACEHOLDER_TEXT}
              value={this.state.email}
              onChange={(Email) => this.setState({email: Email})}
            />
            <ButtonComponent
              title={PasswordResetScreen.RESET_BUTTON_TEXT}
              style={{marginTop: Dimensions.get('window').height / 15}}
              onPress={() => {
                this.validate();
              }}
            />
            {this.state.loading && <LoaderComponent />}
            <View style={styles.logCont}>
              <Text style={{fontSize: FontSize.FONT_16}}>
                {PasswordResetScreen.ALLREADY_HAVE_AN_ACCOUNT_TEXT}
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text style={{color: Colors.Blue, fontSize: FontSize.FONT_16}}>
                  {' '}
                  {PasswordResetScreen.LOGIN_TEXT}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '10%',
  },
  doneImagefield: {
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').height / 5,
    alignSelf: 'center',
  },
  text: {
    color: Colors.Black,
    fontSize: FontSize.FONT_20,
    marginVertical: '8%',
  },
  textReset: {
    color: Colors.Black,
    fontSize: FontSize.FONT_16,
  },
  textContainer: {
    width: '100%',
  },
  inputView: {
    borderBottomColor: Colors.Black,
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: '10%',
    marginTop: '8%',
  },
  touchable: {
    height: '16%',
    width: '100%',
    // backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.White,
    borderWidth: 1,
  },
  logCont: {
    flexDirection: 'row',
    marginTop: '7%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
