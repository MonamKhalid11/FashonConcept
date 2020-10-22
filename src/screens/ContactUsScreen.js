import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  Linking,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SliderBox} from 'react-native-image-slider-box';
import AsyncStorage from '@react-native-community/async-storage';
import {ImageComponent} from '../components/ImageComponent';
import {ButtonComponent} from '../components/ButtonComponent';
import {MainContainer} from '../components/MainContainer';
import Colors from '../constants/colors';
import {FontSize} from '../constants/fonts';
import globalStyles from '../constants/globalStyles';
import {URL} from '../constants/URL';
import {Separator} from '../components/Separator';

export default class ContactUsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_no: '',
      email: '',
      is_model: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('loginResponse').then((response) => {
      let ParsedResponse = JSON.parse(response);
      this.setState(
        {
          email: ParsedResponse.data.email,
          is_model: ParsedResponse.data.is_model,
        },
        () => {
          {
            this.state.is_model == 'yes' ? this.GetuserDetail() : null;
          }
        },
      );
    });
  }

  GetuserDetail = async () => {
    const formData = new FormData();
    formData.append('method', 'GetuserDetail');
    formData.append('email', this.state.email);

    this.setState({loading: true});
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            mobile_no: responseJson.data.cellulare,
          },
          () => {},
        );
      });
  };

  gotoWhatsApp = (number) => {
    let URL = 'whatsapp://send?phone=' + number;
    Linking.openURL(URL)
      .then((data) => {})
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  };

  goToWebApp = () => {
    let URL = 'https://www.fashionconcept.it/join-us-fashion-concept';
    Linking.openURL(URL);
  };

  render() {
    return (
      <View style={styles.mainCont}>
        <Text style={styles.lowerContText}>Stay Tuned</Text>
        {this.state.is_model == 'yes' ? (
          <View
            style={{
              width: '70%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <ButtonComponent
              style={{marginTop: 5}}
              title="Contact by Whats App (Firenze)"
              onPress={() => this.gotoWhatsApp('+393355412020')}
            />
            <Separator />
            <ButtonComponent
              style={{marginTop: 5}}
              title="Contact by Whats App (Roma)"
              onPress={() => this.gotoWhatsApp('+393938792774')}
            />
          </View>
        ) : (
          <View
            style={{
              width: '70%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text style={styles.lowerContText}>
              Vieni a trovarci e vivi un'esperienza unica. Entra nel mondo di
              Fashion Concept.
            </Text>
            <ButtonComponent
              style={{marginTop: 5}}
              title="Join US"
              onPress={() => this.goToWebApp()}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollCont: {
    backgroundColor: Colors.White,
  },
  mainCont: {
    flex: 1,
    // paddingTop: 20,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  lowerCont: {
    marginVertical: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerContText: {
    padding: 15,
    fontSize: FontSize.FONT_18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
