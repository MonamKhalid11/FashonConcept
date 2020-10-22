import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import {Separator} from '../components/Separator';
import Colors from '../constants/colors';
import {FontSize} from '../constants/fonts';

export default class EventDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: this.props.navigation.getParam('path'),
      Title: this.props.navigation.getParam('Title'),
      Description: this.props.navigation.getParam('Description'),
      Image: this.props.navigation.getParam('Image'),
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree',
      ],
      loading: false,
      is_model: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('loginResponse').then((response) => {
      let ParsedResponse = JSON.parse(response);
      // this.setState({model_id : ParsedResponse.data.id });
      this.setState({is_model: ParsedResponse.data.is_model});
    });
  }

  render() {
    const regex = /(<([^>]+)>)/gi;
    const result = this.state.Description.replace(regex, '');
    return (
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.main}>
          <View style={styles.innerView}>
            <SliderBox
              images={this.state.Image}
              sliderBoxHeight={300}
              dotColor="#000000"
              inactiveDotColor="#90A4AE"
              ImageComponent={FastImage}
              dotStyle={{
                marginHorizontal: -15,
              }}
              currentImageEmitter={(id) => {
                this.setState({sliderIndex: id});
              }}
            />
            <Separator />

            <Text
              style={{
                alignSelf: 'center',
                marginVertical: Dimensions.get('window').height / 100,
                fontSize: FontSize.FONT_22,
              }}>
              {this.state.Title}
            </Text>

            <View style={styles.description}>
              <ScrollView nestedScrollEnabled={true}>
                <Text
                  style={{fontSize: FontSize.FONT_16, paddingHorizontal: 5}}>
                  {result}
                </Text>
              </ScrollView>
            </View>
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
