import React, {Component} from 'react';
import {StatusBar, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../constants/colors';

class InitialScreen extends Component {
  componentDidMount() {
    this._doRedirect();
  }

  //   componentDidUpdate(prevProps, prevState) {
  //     this._doRedirect();
  //   }

  _doRedirect = () => {
    AsyncStorage.getItem('loginResponse').then((user) => {
      if (user) {
        this.props.navigation.navigate('TabNavigator');
      } else {
        this.props.navigation.navigate('AuthStack');
      }
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={Colors.Black}
          />
        </View>
      </View>
    );
  }
}

export default InitialScreen;
