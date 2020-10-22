import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../constants/colors';
import {FontSize} from '../constants/fonts';
import {SettingScreenName} from '../constants/text';
import {URL} from '../constants/URL';
import LoaderComponent from '../components/LoaderComponent';

export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      NEW_CASTING: true,
      NEW_EVENTS: true,
      NEW_POST_FROM_FASHION_CONCEPT: true,
      email: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('loginResponse').then((response) => {
      let ParsedResponse = JSON.parse(response);
      this.setState(
        {
          email: ParsedResponse.data.email,
          // fcid : ParsedResponse.data.id_anagrafica_modelle
        },
        () => {
          this.GetuserDetail();
        },
      );
    });
  }

  GetuserDetail = async () => {
    const formData = new FormData();
    formData.append('method', 'GetuserDetail');
    formData.append('email', this.state.email);

    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          NEW_CASTING:
            responseJson.data.notification_nuovi_casting == 1 ? true : false,
          NEW_EVENTS:
            responseJson.data.notification_nuovi_eventi == 1 ? true : false,
          NEW_POST_FROM_FASHION_CONCEPT:
            responseJson.data.notification_nuovi_post == 1 ? true : false,
          loading: false,
        });
      })
      .catch((e) => {
        this.setState({loading: false});
      });
  };

  getNotificationValue = async () => {
    const formData = new FormData();

    var casting = this.state.NEW_CASTING;
    var event = this.state.NEW_EVENTS;
    var newPost = this.state.NEW_POST_FROM_FASHION_CONCEPT;

    {
      casting == true ? (casting = 1) : (casting = 0);
    }
    {
      event == true ? (event = 1) : (event = 0);
    }
    {
      newPost == true ? (newPost = 1) : (newPost = 0);
    }
    formData.append('method', 'notificationSetting');
    formData.append('notification_nuovi_casting', casting);
    formData.append('notification_nuovi_eventi', event);
    formData.append('notification_nuovi_post', newPost);
    formData.append('email', this.state.email);

    // this.setState({ loading: true });
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == 1) {
        } else {
          Alert.alert('Something went wrong');
        }
        // this.setState({ loading: false });
      })
      .catch((err) => {
        // this.setState({ loading: false });
        Alert.alert(err);
      });
  };

  newCasting = () => {
    this.setState({NEW_CASTING: !this.state.NEW_CASTING}, () => {
      this.getNotificationValue();
    });
  };

  newEvent = () => {
    this.setState({NEW_EVENTS: !this.state.NEW_EVENTS}, () => {
      this.getNotificationValue();
    });
  };

  newPostFromFashionConcept = () => {
    this.setState(
      {
        NEW_POST_FROM_FASHION_CONCEPT: !this.state
          .NEW_POST_FROM_FASHION_CONCEPT,
      },
      () => {
        this.getNotificationValue();
      },
    );
  };

  render() {
    return (
      <View style={styles.mainCont}>
        {this.state.loading === false ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: FontSize.FONT_16}}>
                {SettingScreenName.NEW_CASTING}
              </Text>
              <Switch
                value={this.state.NEW_CASTING}
                onValueChange={() => this.newCasting()}
                style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: FontSize.FONT_16}}>
                {SettingScreenName.NEW_EVENTS}
              </Text>
              <Switch
                value={this.state.NEW_EVENTS}
                onValueChange={() => this.newEvent()}
                style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: FontSize.FONT_16}}>
                {SettingScreenName.NEW_POST_FROM_FASHION_CONCEPT}
              </Text>
              <Switch
                value={this.state.NEW_POST_FROM_FASHION_CONCEPT}
                onValueChange={() => this.newPostFromFashionConcept()}
                style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
              />
            </View>
          </>
        ) : (
          <LoaderComponent />
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
    marginTop: 30,
    marginHorizontal: 30,
  },
  lowerCont: {
    marginVertical: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerContText: {
    padding: 10,
    fontSize: FontSize.FONT_16,
    fontWeight: 'bold',
  },
});
