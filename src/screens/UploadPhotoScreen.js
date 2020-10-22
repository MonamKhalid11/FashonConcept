import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator, Dimensions,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../constants/colors';
import {FontSize} from '../constants/fonts';
import {UploadPhotoScreenName} from '../constants/text';
import {URL} from '../constants/URL';
import LoaderComponent from '../components/LoaderComponent';

export default class UploadPhotoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      fcid: '',
      sliderIndex: 0,
      images: [],
      imagesArr: [],
      selectedImage: [],
      loading: true,
      deleting: false,
      base64Image: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('loginResponse').then((response) => {
      let ParsedResponse = JSON.parse(response);
      this.setState(
        {
          email: ParsedResponse.data.email,
          fcid: ParsedResponse.data.id_anagrafica_modelle,
        },
        () => {
          this.GetuserDetail();
        },
      );
    });
  }

  GetuserDetail = async () => {
    this.setState({loading: true});
    const formData = new FormData();
    formData.append('method', 'GetuserDetail');
    formData.append('all', true);
    formData.append('email', this.state.email);

    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var cat = responseJson.galleryimg;
        // var cat = ["Piemonte", "Lombardia", "zmsvhj", "jasdg"];
        var category = [];
        for (var i = 0; i < cat.length; i++) {
          category.push(cat[i].img);
        }
        this.setState({images: category});
        this.setState({imagesArr: cat});
        this.setState({loading: false});
      });
  };

  confirmDelete = () => {
    Alert.alert('', 'Vuoi eliminare la foto selezionata?', [
      {
        text: 'Annulla',
      },
      {text: 'Ok', onPress: () => this.toDeletePhoto()},
    ]);
  };

  toDeletePhoto = async () => {
    const formData = new FormData();
    formData.append('method', 'deleteModelImage');
    formData.append(
      'id_img_modelle',
      parseInt(this.state.imagesArr[this.state.sliderIndex].id_img_modelle),
    );

    this.setState({deleting: true});
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == 1) {
          this.setState({deleting: false});
          this.GetuserDetail();
          Alert.alert('Immagine eliminata con successo');
        } else {
          this.setState({deleting: false});
          Alert.alert('Immagine non eliminata');
        }

        // var cat = responseJson.galleryimg;
        // // var cat = ["Piemonte", "Lombardia", "zmsvhj", "jasdg"];
        // var category = [];
        // for (var i = 0; i < cat.length; i++) {
        //   category.push(cat[i].img)
        // }
        // this.setState({images: category});
        // this.setState({loading : false});
      });
  };

  chooseFile = () => {
    Alert.alert(
      '',
      'Please Select Image',
      [
        {text: 'Camera', onPress: () => this._doOpenCamera()},
        {text: 'Gallery', onPress: () => this._doOpenGallery()},
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  _doOpenCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      this.newPhotoUpload(`data:${image.mime};base64,${image.data}`);
    });
  };

  _doOpenGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      this.newPhotoUpload(`data:${image.mime};base64,${image.data}`);
    });
  };

  newPhotoUpload = (data) => {
    this.setState({deleting: true});
    var formdata = new FormData();
    formdata.append('method', 'modelImageUpload');
    formdata.append('fcid', this.state.fcid);
    formdata.append('file', data);

    var requestOptions = {
      method: 'POST',
      body: formdata,
    };

    fetch(URL, requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({deleting: false});
        this.GetuserDetail();
        Alert.alert('Congratulazioni!', 'Immagine caricata con successo.');
      })
      .catch((error) => {
        this.setState({deleting: false});
      });
  };

  render() {
    return (
      <ScrollView style={styles.scrollCont}>
        {this.state.loading == false ? (
          <View style={styles.mainCont}>
            <View>
              <SliderBox
                images={this.state.images}
                sliderBoxHeight={525}
                dotColor="#000000"
                inactiveDotColor="#90A4AE"
                ImageComponent={FastImage}
                resizeMode={'cover'}
                dotStyle={{
                  marginHorizontal: -15,
                }}
                currentImageEmitter={(id) => {
                  this.setState({sliderIndex: id});
                }}
              />
            </View>
            {this.state.deleting == true ? (
              <View
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <ActivityIndicator
                  animating={true}
                  size="large"
                  color={Colors.Black}
                />
              </View>
            ) : null}
            <View
              style={{
                alignSelf: 'flex-end',
                paddingTop: 20,
                paddingRight: 20,
              }}>
              <TouchableOpacity onPress={() => this.confirmDelete()}>
                <Image
                  source={require('../assets/images/BinImage.png')}
                  style={{height: 20, width: 20}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.lowerCont}>
              <TouchableOpacity onPress={() => this.chooseFile()}>
                <Image source={require('../assets/images/AddIcon.png')} />
              </TouchableOpacity>

              <View>
                <Text style={styles.lowerContText}>
                  {UploadPhotoScreenName.UPLOAD_PHOTO}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <LoaderComponent />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollCont: {
    backgroundColor: Colors.White,
  },
  mainCont: {
    flex: 1,
    marginTop: 20,
  },
  lowerCont: {
    marginVertical: 20,
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
