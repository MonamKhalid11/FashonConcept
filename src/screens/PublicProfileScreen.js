import React from 'react';
import {View, Text, ScrollView, Dimensions, StyleSheet} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../constants/colors';
import {FontSize} from '../constants/fonts';
import {PublicProfileScreenName} from '../constants/text';
import {TitleValueContainer} from '../components/TitleValueContainer';
import {URL} from '../constants/URL';
import LoaderComponent from '../components/LoaderComponent';

export default class PublicProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '',
      surname: '',
      email: '',
      fcid: '',
      height: '',
      cutIt: '',
      otherwise: '',
      life: '',
      hips: '',
      shoes: '',
      hair: '',
      hairValue: '',
      hairList: '',
      eyes: '',
      eyesValue: '',
      eyesList: '',
      motherTongue: '',
      motherTongueValue: '',
      motherTongueList: '',
      language: [],
      hairLook: '',
      hairLookValue: '',
      hairLookList: '',
      ethnicity: '',
      ethnicityValue: '',
      ethnicityList: '',
      images: [
        // "https://source.unsplash.com/1024x768/?nature",
        // "https://source.unsplash.com/1024x768/?water",
        // "https://source.unsplash.com/1024x768/?girl",
        // "https://source.unsplash.com/1024x768/?tree",
      ],
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
          this.getHairList();
          //   this.GetuserDetail();
        },
      );
    });
  }

  GetuserDetail = async () => {
    const formData = new FormData();
    formData.append('method', 'GetuserDetail');
    formData.append('email', this.state.email);

    // this.setState({ loading: true });
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          name: responseJson.data.nome,
          surname: responseJson.data.cognome,
          height: responseJson.data.altezza,
          cutIt: responseJson.data.taglia,
          otherwise: responseJson.data.seno,
          life: responseJson.data.vita,
          hips: responseJson.data.fianchi,
          shoes: responseJson.data.scarpe,
          hair: responseJson.data.id_capelli,
          eyes: responseJson.data.id_occhi,
          motherTongue: responseJson.data.id_lingua_madrelingua,
          // ethnicity: responseJson.data.id_etnia,
          language: responseJson.data.dsc_lingue,
          hairLook: responseJson.data.id_capelli_look,
          ethnicity: responseJson.data.id_etnia,
          loading: false,
        });
        this.state.hairList.forEach((value) => {
          if (value.value == this.state.hair) {
            this.setState({hairValue: value.label});
          }
        });
        this.state.eyesList.forEach((value) => {
          if (value.value == this.state.eyes) {
            this.setState({eyesValue: value.label});
          }
        });
        this.state.motherTongueList.forEach((value) => {
          if (value.value == this.state.motherTongue) {
            this.setState({motherTongueValue: value.label});
          }
        });
        this.state.hairLookList.forEach((value) => {
          if (value.value == this.state.hairLook) {
            this.setState({hairLookValue: value.label});
          }
        });
        this.state.ethnicityList.forEach((value) => {
          if (value.value == this.state.ethnicity) {
            this.setState({ethnicityValue: value.label});
          }
        });
        const cat = responseJson.galleryimg;
        // var cat = ["Piemonte", "Lombardia", "zmsvhj", "jasdg"];
        const category = [];
        for (let i = 0; i < cat.length; i++) {
          category.push(cat[i].img);
        }
        this.setState({images: category});
      });
  };

  getHairList = async () => {
    const formData = new FormData();
    formData.append('method', 'getHairList');

    // this.setState({ loading: true });
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const cat = responseJson.data;
        const category = [];
        for (let i = 0; i < cat.length; i++) {
          category.push({
            label: cat[i].dsc_capelli,
            value: cat[i].id_capelli,
          });
        }
        this.setState({hairList: category}, () => {
          this.getEyesList();
        });
      })
      .catch((error) => {});
  };

  getEyesList = async () => {
    const formData = new FormData();
    formData.append('method', 'getEyesList');

    // this.setState({ loading: true });
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const cat = responseJson.data;
        const category = [];
        for (let i = 0; i < cat.length; i++) {
          category.push({
            label: cat[i].dsc_occhi,
            value: cat[i].id_occhi,
          });
        }
        this.setState({eyesList: category}, () => {
          this.getMotherTongueList();
          // this.GetuserDetail();
        });
      })
      .catch((error) => {});
  };

  getMotherTongueList = async () => {
    const formData = new FormData();
    formData.append('method', 'getMotherTongueList');

    // this.setState({ loading: true });
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const cat = responseJson.data;
        const category = [];
        for (let i = 0; i < cat.length; i++) {
          category.push({
            label: cat[i].dsc_lingue_modelle,
            value: cat[i].id_lingue_modelle,
          });
        }
        this.setState({motherTongueList: category}, () => {
          // this.GetuserDetail();
          this.getHairLookList();
        });
      })
      .catch((error) => {});
  };

  getHairLookList = async () => {
    const formData = new FormData();
    formData.append('method', 'getHairLookList');

    // this.setState({ loading: true });
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const cat = responseJson.data;
        const category = [];
        for (let i = 0; i < cat.length; i++) {
          category.push({
            label: cat[i].dsc_capelli_look,
            value: cat[i].id_capelli_look,
          });
        }
        this.setState({hairLookList: category}, () => {
          // this.GetuserDetail();
          this.getEthnicityList();
        });
      })
      .catch((error) => {});
  };

  getEthnicityList = async () => {
    const formData = new FormData();
    formData.append('method', 'getEthnicityList');

    // this.setState({ loading: true });
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const cat = responseJson.data;
        const category = [];
        for (let i = 0; i < cat.length; i++) {
          category.push({
            label: cat[i].dsc_etnia,
            value: cat[i].id_etnia,
          });
        }
        this.setState({ethnicityList: category}, () => {
          this.GetuserDetail();
        });
      })
      .catch((error) => {});
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
            <View style={styles.lowerCont}>
              <View style={{width: '50%'}}>
                <Text style={styles.lowerContText}>
                  {this.state.name} {this.state.surname}
                </Text>
              </View>
            </View>
            <View
              style={{
                padding: 10,
                width: '80%',
                alignSelf: 'center',
                borderRadius: 5,
                borderColor: Colors.Grey,
                borderWidth: 1,
              }}>
              <TitleValueContainer
                title={PublicProfileScreenName.AGE}
                value="20 / 25"
              />
              <TitleValueContainer
                title={PublicProfileScreenName.HEIGHT}
                value={this.state.height}
              />
              <TitleValueContainer
                title={PublicProfileScreenName.CUT_IT}
                value={this.state.cutIt}
              />
              <TitleValueContainer
                title={PublicProfileScreenName.OTHERWISE}
                value={this.state.otherwise}
              />
              <TitleValueContainer
                title={PublicProfileScreenName.LIFE}
                value={this.state.life}
              />
              <TitleValueContainer
                title={PublicProfileScreenName.HIPS}
                value={this.state.hips}
              />
              <TitleValueContainer
                title={PublicProfileScreenName.SHOES}
                value={this.state.shoes}
              />
            </View>
            <View
              style={{
                padding: 10,
                width: '80%',
                alignSelf: 'center',
                borderRadius: 5,
                borderColor: Colors.Grey,
                borderWidth: 1,
                marginTop: 20,
              }}>
              <TitleValueContainer
                title={PublicProfileScreenName.HAIR}
                value={this.state.hairValue}
                // value="jsbck"
              />
              <TitleValueContainer
                title={PublicProfileScreenName.EYES}
                value={this.state.eyesValue}
                // value="Marroni"
              />
              <TitleValueContainer
                title={PublicProfileScreenName.MOTHER_TONGUE}
                value={this.state.motherTongueValue}
                // value="Italiano"
              />
              <TitleValueContainer
                title={PublicProfileScreenName.LANGUAGES}
                value={this.state.language}
              />
              <TitleValueContainer
                title={PublicProfileScreenName.LOOK}
                // value="Lunghi"
                value={this.state.hairLookValue}
              />
              <TitleValueContainer
                title={PublicProfileScreenName.ETHNICITY}
                value={this.state.ethnicityValue}
                // value="Sudamericana"
              />
              {/* <TitleValueContainer
                            title={PublicProfileScreenName.CITY}
                            value="San Giuliano Terme"
                        /> */}
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
    marginVertical: 20,
  },
  lowerCont: {
    marginVertical: 50,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    // justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    // flexDirection : 'row'
  },
  lowerContText: {
    fontSize: FontSize.FONT_16,
    fontWeight: 'bold',
  },
});
