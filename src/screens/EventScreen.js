import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Separator} from '../components/Separator';
import {URL} from '../constants/URL';
import LoaderComponent from '../components/LoaderComponent';

const DATA = [
  {
    // id: 1,
    title: 'abc',
    subtitle: 'xyz',
    description: 'jkl',
    path:
      'https://png.pngtree.com/element_pic/17/02/13/461688a715ebabe5865873a9f8845468.jpg',
    statusOne: 'closed',
    statusTwo: 'Subscribed',
  },
  {
    title: 'abc',
    subtitle: 'xyz',
    description: 'jkl',
    path:
      'https://png.pngtree.com/element_pic/17/02/13/461688a715ebabe5865873a9f8845468.jpg',
    statusOne: 'closed',
    statusTwo: 'Subscribed',
  },
  {
    title: 'abc',
    subtitle: 'xyz',
    description: 'jkl',
    path:
      'https://png.pngtree.com/element_pic/17/02/13/461688a715ebabe5865873a9f8845468.jpg',
    statusOne: 'open',
    statusTwo: 'Subscribed',
  },
];

function CastingList({
  source,
  Title,
  Subtitle,
  Description,
  props,
  is_model,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
}) {
  const regex = /(<([^>]+)>)/gi;
  const result = Description.replace(regex, '');
  return (
    <View style={{marginVertical: 10, width: '100%'}}>
      <TouchableOpacity
        onPress={() =>
          switchPage(
            props,
            source,
            Title,
            Description,
            is_model,
            'event',
            img1,
            img2,
            img3,
            img4,
            img5,
            img6,
          )
        }>
        <View
          style={{
            flexDirection: 'row',
            height: Dimensions.get('window').height / 7,
            maxHeight: Dimensions.get('window').height / 7,
          }}>
          <Image
            source={source}
            style={{
              width: Dimensions.get('window').width / 5,
              height: Dimensions.get('window').height / 10,
            }}
          />
          {/* </View> */}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingLeft: 20,
              width: '77%',
            }}>
            {is_model == 'yes' ? (
              <Text numberOfLines={1} style={{fontWeight: 'bold'}}>
                {Title}
              </Text>
            ) : (
              <Text style={{fontWeight: 'bold'}}>{Title}</Text>
            )}
            <Text numberOfLines={3}>{result}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

switchPage = (
  props,
  path,
  Title,
  Description,
  is_model,
  reqType,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
) => {
  var navPath = '';
  const myImage = [img1, img2, img3, img4, img5, img6];
  const newImage = myImage.filter((item) => item != '');
  var param = {
    path: path,
    Title: Title,
    Description: Description,
    Image: newImage,
  };
  if (reqType == 'event') {
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
  if (reqType == 'No') {
    {
      is_model == 'yes'
        ? (navPath = 'CastingDetailScreen')
        : (navPath = 'CastingScreens');
    }
    {
      is_model == 'yes' ? navParam : (navParam = null);
    }
    props.navigation.navigate(navPath, navParam);
  }
};

export default class EventScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EventData: [],
      loading: true,
      fetching_from_server: false,
      is_model: '',
    };
    this.offset = 1;
    this.onEndReachedCalledDuringMomentum = true;
  }
  // componentDidMount() {
  //     this.getEventList();
  // }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      AsyncStorage.getItem('loginResponse').then((response) => {
        let ParsedResponse = JSON.parse(response);
        // this.setState({model_id : ParsedResponse.data.id });
        this.setState({is_model: ParsedResponse.data.is_model}, () => {
          // this.getData();
          this.offset = 1;
          this.getEventList();
        });
      });
    });
  }

  loadMorePhotos = () => {
    <Modal
      animationType={'slide'}
      transparent={false}
      visible={true}>
      <View>
        <Text>kaedhkanb</Text>
      </View>
    </Modal>;
  };

  getEventList = async () => {
    const formData = new FormData();
    formData.append('method', 'getEvents');
    formData.append('page_number', this.offset);
    if (!this.state.fetching_from_server) {
      this.setState({fetching_from_server: true}, () => {
        this.setState({loading: true});
        fetch(URL, {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.data.length > 0) {
              this.offset = this.offset + 1;
              this.setState({
                EventData: [...this.state.EventData, ...responseJson.data],
              });
            }
            this.setState({loading: false});
            this.setState({fetching_from_server: false});
          })
          .catch((error) => {
            Alert.alert(error);
            this.setState({loading: false});
            this.setState({fetching_from_server: false});
          });
      });
    }
  };
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.innerView}>
          {this.state.loading && this.offset <= 1 && <LoaderComponent />}
          <FlatList
            data={this.state.EventData}
            renderItem={({item}) => (
              <CastingList
                source={{uri: item.img1_eventi}}
                Title={item.titolo_eventi_eng}
                Subtitle={item.Subtitle}
                Description={item.descrizione_eventi_eng}
                props={this.props}
                is_model={this.state.is_model}
                img1={item.img1_eventi}
                img2={item.img2_eventi}
                img3={item.img3_eventi}
                img4={item.img4_eventi}
                img5={item.img5_eventi}
                img6={item.img6_eventi}
                // onPress={() => switchPage(this.props, item.img1_eventi, item.titolo_eventi_eng, item.descrizione_eventi_eng, this.state.is_model)}
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
      this.getEventList();
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.state.fetching_from_server ? (
          //   <ActivityIndicator color="black" style={{ margin: 15 }} />
          <LoaderComponent />
        ) : null}
      </View>
    );
  }
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
});
