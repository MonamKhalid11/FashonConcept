import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import InitialScreen from '../screens/InitialScreen';
// import SignIn from '../screens/SignIn';
import ConfirmedRegistration from '../screens/ConfirmedRegistration';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
// import New from '../screens/New';
import CastingScreen from '../screens/CastingScreen';
import ContactScreen from '../screens/ContactScreen';
import YoutubeScreen from '../screens/YoutubeScreen';
import InstagramScreen from '../screens/InstagramScreen';
import EventScreen from '../screens/EventScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UploadPhotoScreen from '../screens/UploadPhotoScreen';
import YourDataScreen from '../screens/YourDataScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import SignIn from '../screens/SignIn';
import CastingDetailScreen from '../screens/CastingDetailScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import {
  TabScreensName,
  CastingDetailScreens,
  ProfileTabScreenOptionName,
} from '../constants/text';
import Colors from '../constants/colors';

const AuthStack = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
    },
    ConfirmedRegistration: {
      screen: ConfirmedRegistration,
    },

    ForgotPassword: {
      screen: ForgotPassword,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    headerMode: 'none',
  },
);

// const switchNavigator = createSwitchNavigator({
//     Auth: {
//         screen: AuthStack
//     }
// }, {
//     initialRouteName: 'Auth'
// });

const TabScreensOne = createStackNavigator({
  CastingScreen: {
    screen: CastingScreen,
    navigationOptions: {
      headerTitle: 'Lista Casting',
      headerTitleStyle: { alignSelf: 'center' },
      // headerRight: () => (
      //   <TouchableOpacity activeOpacity={0.1}>
      //     <Image
      //       source={require('../assets/images/notification.png')}
      //       style={{height: 30, width: 30, marginRight: 10}}
      //     />
      //   </TouchableOpacity>
      // ),
      // headerLeft: () => <Text></Text>,
    },
  },

  CastingDetailScreen: {
    screen: CastingDetailScreen,
    navigationOptions: {
      headerTitle: CastingDetailScreens.HEADER_TITLE,
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: () => <Text />,
    },
  },
});

const ContactTabScreen = createMaterialTopTabNavigator(
  {
    Youtube: {
      screen: YoutubeScreen,
    },
    Instagram: {
      screen: InstagramScreen,
    },
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: Colors.Black,
        height: 5,
      },
      style: {
        backgroundColor: Colors.White,
        marginTop: 50,
      },
      activeTintColor: Colors.Black,
      inactiveTintColor: Colors.Grey,
    },
  },
);

const EventTabScreen = createStackNavigator({
  EventsScreen: {
    screen: EventScreen,
    navigationOptions: {
      headerTitle: 'Eventi',
      headerTitleStyle: { alignSelf: 'center' },
    },
  },
  EventDetailScreen: {
    screen: EventDetailScreen,
    navigationOptions: {
      headerTitle: 'Event Detail',
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: () => <Text />,
    },
  },
});

const ProfileTabScreen = createStackNavigator({
  ProfilessScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      headerTitle: TabScreensName.PROFILE_SCREEN_NAME,
      headerTitleStyle: { alignSelf: 'center' },
    },
  },
  UploadPhotoScreen: {
    screen: UploadPhotoScreen,
    navigationOptions: {
      headerTitle: ProfileTabScreenOptionName.UPLOAD_PHOTO,
      //      headerTitle: null,
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: () => <Text />,
    },
  },
  YourDataScreen: {
    screen: YourDataScreen,
    navigationOptions: {
      headerTitle: ProfileTabScreenOptionName.YOUR_DATA,
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: () => <Text />,
    },
  },
  PublicProfileScreen: {
    screen: PublicProfileScreen,
    navigationOptions: {
      headerTitle: ProfileTabScreenOptionName.PUBLIC_PROFILE,
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: () => <Text />,
    },
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      headerTitle: ProfileTabScreenOptionName.SETTING,
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: () => <Text />,
    },
  },
  ContactUsScreen: {
    screen: ContactUsScreen,
    navigationOptions: {
      headerTitle: ProfileTabScreenOptionName.CONTACT_US,
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: () => <Text />,
    },
  },
});

const TabNavigator = createBottomTabNavigator({
  CastingScreens: {
    screen: TabScreensOne,
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: Colors.Black,
      },
      tabBarLabel: TabScreensName.CASTING_SCREEN_NAME,
      tabBarIcon: ({ tintColor, focused }) => (
        <Image
          source={
            focused
              ? require('../assets/images/hollywood-star(1).png')
              : require('../assets/images/hollywood-star.png')
          }
          style={{ height: 25, width: 25, color: tintColor }}
        //   style={{ color: tintColor }}
        />
      ),
    },
  },
  ContactScreen: {
    screen: ContactTabScreen,
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: Colors.Black,
      },
      tabBarLabel: TabScreensName.SOCIAL_SCREEN_NAME,
      // tabBarIcon: (tabInfo) => {
      //     return <Image source={require('../assets/images/instagram.png')} style={{ height: 25, width: 25, marginTop: 10 }} />;
      //   },
      tabBarIcon: ({ tintColor, focused }) => (
        <Image
          source={
            focused
              ? require('../assets/images/instagram(1).png')
              : require('../assets/images/instagram.png')
          }
          style={{ height: 25, width: 25, color: tintColor }}
        //   style={{ color: tintColor }}
        />
      ),
    },
  },
  EventScreen: {
    screen: EventTabScreen,
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: Colors.Black,
      },
      tabBarLabel: TabScreensName.EVENT_SCREEN_NAME,
      // tabBarIcon: (tabInfo) => {
      //     return <Image source={require('../assets/images/calendar.png')} style={{ height: 25, width: 25, marginTop: 10 }} />;
      //   },
      tabBarIcon: ({ tintColor, focused }) => (
        <Image
          source={
            focused
              ? require('../assets/images/calendar(1).png')
              : require('../assets/images/calendar.png')
          }
          style={{ height: 25, width: 25, color: tintColor }}
        //   style={{ color: tintColor }}
        />
      ),
    },
  },
  ProfileScreen: {
    screen: ProfileTabScreen,
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: Colors.Black,
      },
      tabBarLabel: TabScreensName.PROFILE_SCREEN_NAME,
      // tabBarIcon: (tabInfo) => {
      //     return <Image source={require('../assets/images/user.png')} style={{ height: 25, width: 25, marginTop: 10 }} />;
      //   },
      tabBarIcon: ({ tintColor, focused }) => (
        <Image
          source={
            focused
              ? require('../assets/images/user(1).png')
              : require('../assets/images/user.png')
          }
          style={{ height: 25, width: 25, color: tintColor }}
        //   style={{ color: tintColor }}
        />
      ),
    },
  },
});

const MainStack = createSwitchNavigator(
  {
    Initial: {
      screen: InitialScreen,
    },
    AuthStack: {
      screen: AuthStack,
    },
    TabNavigator: {
      screen: TabNavigator,
    },
  },
  {
    headerMode: 'none',
  },
);

export default MainStack;

// const CastingDetail = createStackNavigator({

//     CastingScreen: {
//         screen : CastingScreen, navigationOptions: {
//             tabBarLabel: "Casting",
//             tabBarIcon: (tabInfo) => {
//                 return <Image source={require('../assets/images/star.png')} style={{ height: 25, width: 25, marginTop: 10 }} />;
//               },
//         }
//     },
//     CastingDetailScreen : {
//         screen : CastingDetailScreen
//     },
//  }, {
//         headerMode : 'none'
// });

{
  /* <View style={styles.textContainer}>
<Text style={[styles.text, globalStyles.textFont ]}>{confirmedregistrationScreen.textLineOne}</Text>
<Text style={[styles.text, globalStyles.textFont ]}>{confirmedregistrationScreen.textLineTwo}</Text>
<Text style={[styles.text, globalStyles.textFont ]}>{confirmedregistrationScreen.textlineThree}</Text>
<Text style={[styles.text, globalStyles.textFont ]}>{confirmedregistrationScreen.textlineFour}</Text>
</View> */
}

// export const ConfirmedRegistrationScreen = {
//     CONFIRMED_REGISTRATION_TEXT : "Registrazione avvenuta con successo! Segui il link che troverai nella tua mail con cui ti sei registrato per effettuare la verifica dell'account ed entra nel mondo di Fashion Concept"
//     }
