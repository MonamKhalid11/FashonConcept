import React from 'react';
import {View, Dimensions, StyleSheet, FlatList, Alert} from 'react-native';
import LoaderComponent from '../components/LoaderComponent';
import {URL} from '../constants/URL';
import messaging from '@react-native-firebase/messaging';
var PushNotification = require('react-native-push-notification');
import AsyncStorage from '@react-native-community/async-storage';

import {Separator} from '../components/Separator';
import List from '../components/List';

export default class CastingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fetching_from_server: false,
      modelData: [],
      is_model: '',
      model_id: '',
    };
    this.offset = 1;
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount() {
    messaging().onMessage(async (remoteMessage) => {
      console.log('Immagine non eliminata');
      PushNotification.localNotification({
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    });

    this.props.navigation.addListener('willFocus', () => {
      AsyncStorage.getItem('loginResponse').then((response) => {
        let ParsedResponse = JSON.parse(response);
        this.offset = 1;
        // this.setState({model_id : ParsedResponse.data.id });
        this.setState(
          {
            is_model: ParsedResponse.data.is_model,
            loading: true,
            modelData: [],
            model_id: ParsedResponse.data.id_anagrafica_modelle,
          },
          () => {
            // this.getData();
            this.getData();
          },
        );
      });
    });
  }

  switchPage = (
    props,
    Title,
    Description,
    path,
    casting_id,
    isSubscribe,
    casting_close,
    is_model,
    reqtype,
    model_id,
  ) => {
    var navPath = '';
    var navParam = {
      path: path,
      Title: Title,
      Description: Description,
      casting_id: casting_id,
      isSubscribe: isSubscribe,
      casting_close: casting_close,
      model_id: model_id,
    };
    if (reqtype == 'casting') {
      {
        is_model == 'yes'
          ? (navPath = 'CastingDetailScreen')
          : (navPath = 'CastingScreens');
      }
      {
        is_model == 'yes' ? navParam : (navParam = null);
      }
      props.navigation.navigate(navPath, navParam);
    } else {
      {
        is_model == 'yes'
          ? (navPath = 'EventDetailScreen')
          : (navPath = 'EventScreen');
      }
      {
        is_model == 'yes' ? param : (param = null);
      }
      props.navigation.navigate(navPath, param);
    }
  };

  getData = async () => {
    const formData = new FormData();
    formData.append('method', 'getCastingList');
    formData.append('page_number', this.offset);
    formData.append('model_id', this.state.model_id);

    if (!this.state.fetching_from_server) {
      this.setState({fetching_from_server: true}, () => {
        // this.setState({loading: true});
        fetch(URL, {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.data.length > 0) {
              this.offset = this.offset + 1;
              this.setState({
                modelData: [...this.state.modelData, ...responseJson.data],
                loading: false,
                fetching_from_server: false,
              });
            } else {
              this.setState({
                fetching_from_server: false,
                isListEnd: false,
              });
            }
          })
          .catch((error) => {
            Alert.alert(error);
            this.setState({
              fetching_from_server: false,
              isListEnd: false,
            });
          });
      });
    }
  };

  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.state.fetching_from_server ? (
          <LoaderComponent />
        ) : null}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.innerView}>
          {this.state.loading && <LoaderComponent />}
          <FlatList
            data={this.state.modelData}
            renderItem={({item}) => (
              <List
                // Status={item.statusOne}
                // StatusTwo={item.statusTwo}
                source={{uri: item.img_casting}}
                is_model={this.state.is_model}
                Title={item.titolo_casting}
                Description={item.descrizione_casting}
                Subtitle={item.subtitolo_casting}
                Casting_Status={item.casting_close}
                Subscription_Status={item.is_subscription}
                onPress={() =>
                  this.switchPage(
                    this.props,
                    item.titolo_casting,
                    item.descrizione_casting,
                    item.img_casting,
                    item.id_casting,
                    item.is_subscription,
                    item.casting_close,
                    this.state.is_model,
                    'casting',
                    this.state.model_id,
                  )
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            ListFooterComponent={
              this.offset > 1 && this.renderFooter.bind(this)
            }
            ItemSeparatorComponent={() => <Separator />}
          />
        </View>
      </View>
    );
  }
  onEndReached = ({distanceFromEnd}) => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.getData();
      this.onEndReachedCalledDuringMomentum = true;
    }
  };
}

const styles = StyleSheet.create({
  innerView: {
    width: '100%',
    marginTop: Dimensions.get('window').height / 50,
  },
  main: {
    flex: 1,
    marginHorizontal: Dimensions.get('window').width / 30,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
