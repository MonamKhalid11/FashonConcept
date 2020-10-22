import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import {Separator} from '../components/Separator';
import LoaderComponent from '../components/LoaderComponent';
import {URL} from '../constants/URL';
import {CastingDetailScreens} from '../constants/text';
import Colors from '../constants/colors';
import {FontSize} from '../constants/fonts';
import HTML from 'react-native-render-html';

export default class CastingDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: this.props.navigation.getParam('path'),
      Title: this.props.navigation.getParam('Title'),
      Description: this.props.navigation.getParam('Description'),
      casting_id: this.props.navigation.getParam('casting_id'),
      model_id: '',
      isSubscribed: this.props.navigation.getParam('isSubscribe'),
      casting_close: this.props.navigation.getParam('casting_close'),
      loading: false,
      is_model: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('loginResponse').then((response) => {
      let ParsedResponse = JSON.parse(response);
      this.setState({model_id: ParsedResponse.data.id_anagrafica_modelle});
      this.setState({is_model: ParsedResponse.data.is_model});
    });
  }

  getSubscribe = async () => {
    const formData = new FormData();
    formData.append('method', 'addSubscription');
    formData.append('casting_id', this.state.casting_id);
    formData.append('model_id', this.state.model_id);
    this.setState({loading: true});
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == 1) {
          Alert.alert('Hai confermato la partecipazione a questo casting', '', [
            {text: 'Ok', onPress: () => this.props.navigation.goBack()},
          ]);
          // this.props.navigation.goBack();
          this.setState({isSubscribed: 'Yes'});
          this.setState({loading: false});
          // this.props.navigation.goBack();
        } else {
          Alert.alert('Something went wrong. Try again');
          this.setState({loading: false});
        }
      })
      .catch((err) => {
        Alert.alert(err);
      });
  };

  getUnsubscribe = async () => {
    const formData = new FormData();
    formData.append('method', 'removeSubscription');
    formData.append('casting_id', this.state.casting_id);
    formData.append('model_id', this.state.model_id);

    this.setState({loading: true});
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == 1) {
          Alert.alert('Non partecipi più a questo casting', '', [
            {
              text: 'Ok',
              onPress: () => this.props.navigation.navigate('CastingScreens'),
            },
          ]);
          this.setState({isSubscribed: 'No'});
          this.setState({loading: false});
        } else {
          Alert.alert('Something went wrong. Try again');
          this.setState({loading: false});
        }
      })
      .catch((err) => {
        Alert.alert(err);
      });
  };

  render() {
    const regex = /(<([^>]+)>)/gi;
    const result = this.state.Description.replace(regex, '');
    return (
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.main}>
          <View style={styles.innerView}>
            <Image
              source={{uri: this.state.path}}
              style={{
                alignSelf: 'center',
                height: 364,
                width: Dimensions.get('window').width,
              }}
            />
            <Separator />
            {this.state.Title != '' ? (
              <Text
                style={{
                  alignSelf: 'center',
                  marginVertical: Dimensions.get('window').height / 100,
                  fontSize: FontSize.FONT_22,
                }}>
                {this.state.Title}
              </Text>
            ) : null}

            {result != '' ? (
              <View style={styles.description}>
                <ScrollView nestedScrollEnabled={true}>
                  <HTML
                    html={result}
                    style={{fontSize: FontSize.FONT_16, paddingHorizontal: 5}}
                  />
                </ScrollView>
              </View>
            ) : null}

            {this.state.is_model == 'yes' && this.state.casting_close == 'n' ? (
              <TouchableOpacity
                onPress={() => {
                  this.state.isSubscribed == 'No'
                    ? this.getSubscribe()
                    : this.getUnsubscribe();
                }}
                style={styles.gradientContainer}>
                <LinearGradient
                  start={{x: 0.1, y: 0.1}}
                  end={{x: 1.0, y: 1.0}}
                  colors={[
                    Colors.GradientFirst,
                    Colors.GradientSecond,
                    Colors.GradientThird,
                    Colors.GradientFourth,
                    Colors.GradientFifth,
                  ]}
                  style={{borderRadius: 30}}>
                  {this.state.isSubscribed == 'No' ? (
                    <View style={[styles.subscribeContainer, {margin: 2}]}>
                      <Text style={[styles.SubsButtonText]}>
                        {CastingDetailScreens.SUBSCRIBE_TEXT}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.subscribeContainer,
                        {backgroundColor: Colors.lightGrey},
                      ]}>
                      <Text
                        style={[styles.SubsButtonText, {color: Colors.Grey}]}>
                        {CastingDetailScreens.UNSUBSCRIBE_TEXT}
                      </Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ) : null}
            {this.state.loading == true ? <LoaderComponent /> : null}
          </View>
        </View>
      </ScrollView>
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  gradientContainer: {
    width: Dimensions.get('window').width / 2,
    alignSelf: 'center',
    marginTop: '5%',
  },
  subscribeContainer: {
    backgroundColor: Colors.White,
    borderRadius: 30,
    height:
      Dimensions.get('window').height >= 728
        ? Dimensions.get('window').height / 15
        : Dimensions.get('window').height / 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubsButtonText: {
    textAlign: 'center',
    fontSize: FontSize.FONT_18,
  },
  innerView: {
    width: '100%',
    marginTop: Dimensions.get('window').height / 50,
  },
  main: {
    flex: 1,
    marginHorizontal: Dimensions.get('window').width / 30,
    marginTop: '1%',
  },
  description: {
    maxHeight: '20%',
    borderRadius: 0.01,
    elevation: 1,
    shadowColor: Colors.lightGrey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    padding: '2%',
  },
});
