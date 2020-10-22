import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from 'react-native';

import {FontSize} from '../constants/fonts';
import HTML from 'react-native-render-html';

export default class List extends React.Component {
  render() {
    const regex = /(<([^>]+)>)/gi;
    const result = this.props.Description.replace(regex, '');
    return (
      <View style={{marginVertical: 10, width: '100%'}}>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {this.props.is_model == 'yes' ? (
              <Image
                source={this.props.source}
                style={{
                  height:
                    Dimensions.get('window').height >= 728 ? '100%' : '110%',
                  width: Dimensions.get('window').width <= 360 ? '27%' : '15%',
                }}
              />
            ) : (
              <Image
                source={this.props.source}
                style={{
                  height: 100,
                  width: 100,
                }}
              />
            )}
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingLeft: 20,
                width: '73%',
              }}>
              {this.props.is_model == 'yes' ? (
                <Text numberOfLines={2} style={{fontWeight: 'bold'}}>
                  {this.props.Title}
                </Text>
              ) : (
                <Text style={{fontWeight: 'bold'}}>{this.props.Subtitle}</Text>
              )}
              {this.props.Subtitle == '' ||
              null ||
              this.props.is_model == 'no' ? null : (
                <Text>{this.props.Subtitle}</Text>
              )}
              <HTML
                html={`<p>${result}</p>`}
                renderers={{
                  p: (_, children) => <Text numberOfLines={3}>{children}</Text>,
                }}
              />
              {/* {Status === 'y' &&  */}
              {this.props.is_model == 'yes' ? (
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  {this.props.Casting_Status == 'y' && (
                    <View
                      style={{
                        backgroundColor: Colors.White,
                        borderColor: Colors.Red,
                        borderWidth: 1,
                        width: 60,
                        height: 16,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: FontSize.FONT_10,
                          color: Colors.Red,
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}>
                        chiuso
                      </Text>
                    </View>
                  )}
                  {this.props.Subscription_Status == 'yes' && (
                    <View
                      style={{
                        marginLeft: 10,
                        backgroundColor: Colors.White,
                        borderColor: Colors.Green,
                        borderWidth: 1,
                        width: 60,
                        height: 16,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: FontSize.FONT_10,
                          color: Colors.Green,
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}>
                        Partecipo
                      </Text>
                    </View>
                  )}
                </View>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
