import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ImageComponent } from '../components/ImageComponent';

export class MainContainer extends React.Component {
    render() {
        return (
            // <LinearGradient colors={['#0095F6', '#B2FEEC']} style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.main}>
                        {/* <ImageComponent />
                        <View style= {styles.innerView}>
                        {this.props.children}
                        </View> */}
                        {this.props.children}
                    </View>
                </ScrollView>
            // {/* </LinearGradient> */}
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Dimensions.get('window').height / 15, //'10%',
    },
    innerView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '85%',
      marginTop: '10%',

    //   borderRadius : 0.1,
    //   elevation : 3,
    //   shadowColor : 'black',
    //   shadowOffset : {
    //       width: 0,
    //       height : 2
    //   },
    //   shadowOpacity : 0.26,
    //   shadowRadius: 10,
    //   padding : 15
    },
})