import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
// import axios from 'axios';
import { Dropdown } from 'react-native-material-dropdown-v2';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import { date } from '../constants/date';
import { month } from '../constants/date';
import { year } from '../constants/date';
import { ButtonComponent } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';
import { SignUpScreen } from '../constants/text';
import { ImageComponent } from '../components/ImageComponent';
import { MainContainer } from '../components/MainContainer';
import Colors from '../constants/colors';
import { FontSize } from '../constants/fonts';
import { URL } from '../constants/URL';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppEventsLogger } from "react-native-fbsdk";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastname: '',
      regionPickerValue: '',
      provisionPickerValue: '',
      datePickerValue: '',
      monthPickerValue: '',
      yearPickerValue: '',
      email: '',
      cellulare: '',
      password: '',
      confirmedPassword: '',
      updatedProvincia: '',
      regione: [],
      provincia: [],
      id_residenza: '',
      isAuthorize: false,
    };
  }

  componentDidMount() {
    this.checkRegione();

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

  checkRegione = () => {
    AsyncStorage.getItem('regioneResponse').then((response) => {
      if (response == null) {
        this.getRegione();
      } else {
        let ParsedResponse = JSON.parse(response);
        this.setState({ regione: ParsedResponse });
      }
    });
  };

  getRegione = async () => {
    const formData = new FormData();
    formData.append('method', 'getRegione');

    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const regione = responseJson.data;
        const selectedRegione = [];
        for (let i = 0; i < regione.length; i++) {
          selectedRegione.push({
            label: regione[i].dsc_regioni,
            value: regione[i].id_regioni,
          });
        }
        this.setState({
          regione: selectedRegione,
          provisionPickerValue: '',
        });
        AsyncStorage.setItem(
          'regioneResponse',
          JSON.stringify(selectedRegione),
        );
      });
  };

  getProvince = async (id) => {
    this.setState({ id_residenza: id });
    const formData = new FormData();
    formData.append('method', 'getProvincia');
    formData.append('regione_id', id);
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const province = responseJson.data;
        const selectedProvincia = [];
        for (let i = 0; i < province.length; i++) {
          selectedProvincia.push({
            label: province[i].pronvincia_name,
            value: province[i].id,
          });
        }
        this.setState({ provincia: selectedProvincia });
      });
  };

  checkRegioneId = () => {
    AsyncStorage.getItem('regioneResponse').then((response) => {
      let ParsedResponse = JSON.parse(response);
      const ResponseArray = ParsedResponse.data;

      const regione = this.state.regionPickerValue;
      for (let i = 0; i < ResponseArray.length; i++) {
        if (ResponseArray[i].dsc_regioni == regione) {
          const id = ResponseArray[i].id_regioni;
          this.getProvince(id);
        }
      }
    });
  };

  validate = () => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.firstName != '') {
      if (this.state.lastname != '') {
        if (reg.test(this.state.email) === true) {
          if (this.state.cellulare != '') {
            if (this.state.regionPickerValue != '') {
              if (this.state.provisionPickerValue != '') {
                if (this.state.datePickerValue != '') {
                  if (this.state.monthPickerValue != '') {
                    if (this.state.yearPickerValue != '') {
                      if (this.state.password != '') {
                        if (this.state.confirmedPassword != '') {
                          if (
                            this.state.password === this.state.confirmedPassword
                          ) {
                            if (this.state.isAuthorize) {
                              this.registration();
                            } else {
                              Alert.alert('Please accept terms');
                            }
                          } else {
                            Alert.alert(
                              'password not match. Please re- enter.',
                            );
                          }
                        } else {
                          Alert.alert('please re-enter password');
                        }
                      } else {
                        Alert.alert('please enter password');
                      }
                    } else {
                      Alert.alert('please select a year');
                    }
                  } else {
                    Alert.alert('please select a month');
                  }
                } else {
                  Alert.alert('please select a date');
                }
              } else {
                Alert.alert('please choose a provision');
              }
            } else {
              Alert.alert('please choose a region');
            }
          } else {
            Alert.alert('please enter cellular number');
          }
        } else {
          Alert.alert('enter valid email');
        }
      } else {
        Alert.alert('please enter last name');
      }
    } else {
      Alert.alert(' please enter first name');
    }
  };

  registration = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Cookie', 'PHPSESSID=cc41668337a5e3f0a90a14eebad75b7d');

    const formdata = new FormData();

    formdata.append('method', 'registration');
    formdata.append('email', this.state.email);
    formdata.append('pass', this.state.password);
    formdata.append(
      'data_nascita',
      this.state.yearPickerValue +
      '-' +
      this.state.monthPickerValue +
      '-' +
      this.state.datePickerValue,
    );
    formdata.append('id_residenza', this.state.id_residenza);
    formdata.append('provincia', this.state.provisionPickerValue);
    formdata.append('nome', this.state.firstName);
    formdata.append('cognome', this.state.lastname);
    formdata.append('cellulare', this.state.cellulare);
    formdata.append('device_type', Platform.OS);
    const token = await this.getDeviceToken();
    formdata.append('device_token', token || '');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(URL, requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == 1) {
          // Alert.alert(responseJson.msg);
          AppEventsLogger.logEvent('New SignUp Form Submitted')


          this.props.navigation.navigate('ConfirmedRegistration');
        } else {
          Alert.alert(responseJson.msg);
        }
      })
  };

  render() {
    const { regione, provincia } = this.state;

    return (
      <MainContainer>
        <ImageComponent />
        <View style={styles.innerView}>
          {/* {this.props.children} */}

          <View style={styles.textcontainer}>
            <Text style={styles.textColor}>
              {SignUpScreen.REGISTRATION_HEADING_TEXT}
            </Text>
            <Text style={styles.textColors}>
              {SignUpScreen.REGISTRATION_TEXT}
            </Text>
          </View>

          <InputComponent
            title={SignUpScreen.FIRST_NAME_PLACEHOLDER_TEXT}
            value={this.state.firstName}
            onChange={(value) => this.setState({ firstName: value })}
          />

          <InputComponent
            title={SignUpScreen.LAST_NAME_PLACEHOLDER_TEXT}
            value={this.state.lastName}
            onChange={(value) => this.setState({ lastname: value })}
          />

          <InputComponent
            title={SignUpScreen.EMAIL_PLACEHOLDER_TEXT}
            value={this.state.email}
            onChange={(value) => this.setState({ email: value })}
          />

          <InputComponent
            title={SignUpScreen.CELLULARE_PLACEHOLDER_TEXT}
            value={this.state.cellulare}
            onChange={(value) => this.setState({ cellulare: value })}
            keyboardType="numeric"
          />

          <Dropdown
            containerStyle={{
              width: '100%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            dropdownPosition={-5}
            baseColor={Colors.Black}
            label={SignUpScreen.REGIONE_PLACEHOLDER_TEXT}
            value={this.state.regionPickerValue}
            data={regione}
            onChangeText={(value) => {
              this.setState({
                regionPickerValue: value,
                provisionPickerValue: '',
                provincia: [],
              });
              this.getProvince(value);
            }}
          />

          <Dropdown
            containerStyle={{
              width: '100%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            dropdownPosition={-5}
            baseColor={Colors.Black}
            label={SignUpScreen.PROVINCE_PLACEHOLDER_TEXT}
            value={this.state.provisionPickerValue}
            data={provincia}
            onChangeText={(value) => {
              this.setState({ provisionPickerValue: `${value}` });
            }}
          />

          <Text
            style={{
              marginTop: '6%',
              alignSelf: 'flex-start',
              marginBottom: '2%',
              fontSize: FontSize.FONT_16,
            }}>
            {SignUpScreen.DATE_PLACEHOLDER_TEXT}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignSelf: 'center',
            }}>
            <Dropdown
              containerStyle={{
                width: Dimensions.get('window').width / 4,
              }}
              dropdownPosition={-5}
              baseColor={Colors.Black}
              label="GG"
              data={date}
              onChangeText={(value) => {
                this.setState({ datePickerValue: value });
              }}
            />

            <Dropdown
              containerStyle={{
                width: Dimensions.get('window').width / 4,
              }}
              dropdownPosition={-5}
              baseColor={Colors.Black}
              label="MM"
              data={month}
              onChangeText={(value) => {
                if (value == 'Jan') {
                  this.setState({ monthPickerValue: '01' });
                }
                if (value == 'Feb') {
                  this.setState({ monthPickerValue: '02' });
                }
                if (value == 'Mar') {
                  this.setState({ monthPickerValue: '03' });
                }
                if (value == 'Apr') {
                  this.setState({ monthPickerValue: '04' });
                }
                if (value == 'May') {
                  this.setState({ monthPickerValue: '05' });
                }
                if (value == 'Jun') {
                  this.setState({ monthPickerValue: '06' });
                }
                if (value == 'Jul') {
                  this.setState({ monthPickerValue: '07' });
                }
                if (value == 'Aug') {
                  this.setState({ monthPickerValue: '08' });
                }
                if (value == 'Sep') {
                  this.setState({ monthPickerValue: '09' });
                }
                if (value == 'Oct') {
                  this.setState({ monthPickerValue: '10' });
                }
                if (value == 'Nov') {
                  this.setState({ monthPickerValue: '11' });
                }
                if (value == 'Dec') {
                  this.setState({ monthPickerValue: '12' });
                }
              }}
            />

            <Dropdown
              containerStyle={{
                width: Dimensions.get('window').width / 4,
              }}
              dropdownPosition={-5}
              baseColor={Colors.Black}
              label="AAAA"
              data={year}
              onChangeText={(value) => {
                this.setState({ yearPickerValue: value });
              }}
            />
          </View>

          <InputComponent
            title={SignUpScreen.PASSWORD_PLACEHOLDER_TEXT}
            value={this.state.password}
            onChange={(value) => this.setState({ password: value })}
          />

          <InputComponent
            title={SignUpScreen.CONFIRM_PASSWORD_PLACEHOLDER_TEXT}
            value={this.state.confirmedPassword}
            onChange={(value) => this.setState({ confirmedPassword: value })}
          />

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <TouchableOpacity
              onPress={() =>
                this.setState({ isAuthorize: !this.state.isAuthorize })
              }
              style={{ marginHorizontal: 10 }}>
              <Icon
                name={
                  this.state.isAuthorize
                    ? 'checkbox-marked-outline'
                    : 'checkbox-blank-outline'
                }
                style={{ fontSize: 30 }}
              />
            </TouchableOpacity>
            <Text>
              Autorizzo il trattamento dei miei dati personali presenti nel cv
              ai sensi dell’art. 13 del Decreto Legislativo 30 giugno 2003, n.
              196 “Codice in materia di protezione dei dati personali” e
              dell’art. 13 del GDPR (Regolamento UE 2016/679).
            </Text>
          </View>
          <View style={styles.touchable}>
            <ButtonComponent
              title={SignUpScreen.REGISTRATION_BUTTON_TEXT}
              onPress={() => this.validate()}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '5%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: FontSize.FONT_16 }}>
              {SignUpScreen.ALLREADY_HAVE_AN_ACCOUNT_TEXT}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text
                style={{
                  color: Colors.Blue,
                  fontSize: FontSize.FONT_16,
                }}>
                {' '}
                {SignUpScreen.LOGIN_TEXT}
              </Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
    marginVertical: '10%',
  },
  imagefield: {
    alignSelf: 'center',
  },
  textColor: {
    color: Colors.Black,
    fontSize: FontSize.FONT_20,
  },
  textColors: {
    color: Colors.Black,
    alignSelf: 'center',
    fontSize: FontSize.FONT_16,
  },
  textcontainer: {
    marginTop: '10%',
    marginHorizontal: '10%',
    width: '100%',
  },
  inputView: {
    borderBottomColor: Colors.Black,
    borderBottomWidth: 1,
    width: '100%',
    marginHorizontal: '10%',
    alignSelf: 'center',
  },
  dateInputView: {
    width: '37%',
  },
  touchable: {
    width: '100%',
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height / 20,
  },
});
