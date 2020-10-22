import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import AsyncStorage from '@react-native-community/async-storage';
import {ButtonComponent} from '../components/ButtonComponent';
import Colors from '../constants/colors';
import {FontSize} from '../constants/fonts';
import {GenderData} from '../constants/dropdownData';
import {YourDataScreenName} from '../constants/text';
import {BorderInputContainer} from '../components/BorderInputContainer';
import {MyDropDown} from '../components/MyDropDown';
import LoaderComponent from '../components/LoaderComponent';
import {URL} from '../constants/URL';

export default class YourDataScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fcid: '',
      email: '',
      loading: true,
      // nome: "",
      // cognome: "",
      // cellulare: "",
      // regione: "",
      // provincia: "",
      // data_nascita: "",
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      birthPlace: '',
      nationality: '',
      fiscalCode: '',
      vatNumber: '',
      address: '',
      location: '',
      province: '',
      postalCode: '',
      phone: '',
      fax: '',
      mobilePhone: '',
      website: '',
      professionalCategory: [],
      professionalCategoryList: [],
      workExperience: '',
      cutIt: '',
      height: '',
      otherwise: '',
      life: '',
      hips: '',
      shoes: '',
      hair: '',
      hairList: [],
      hairLook: '',
      hairLookList: [],
      eyes: '',
      eyesList: [],
      ethnicity: '',
      ethnicityList: [],
      complexion: '',
      complexionList: [],
      regionOfResidence: '',
      regionOfResidenceList: [],
      motherTongue: '',
      motherTongueList: [],
      availabilityInOtherRegionsList: [],
      availabilityInOtherRegions: [],
      otherLanguagesSpokenList: [],
      otherLanguagesSpoken: [],
      // selectedItems : []
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
    const formData = new FormData();
    formData.append('method', 'GetuserDetail');
    formData.append('email', this.state.email);

    this.setState({loading: true});
    fetch(URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const reg_cat = responseJson.modelle_availability;
        const reg_category = [];
        for (var i = 0; i < reg_cat.length; i++) {
          reg_category.push(reg_cat[i]);
        }
        this.setState({availabilityInOtherRegions: reg_category}, () => {});

        const lan_cat = responseJson.modelle_language;
        const lan_category = [];
        for (var i = 0; i < lan_cat.length; i++) {
          lan_category.push(lan_cat[i]);
        }
        this.setState({otherLanguagesSpoken: lan_category}, () => {});

        const prof_cat = responseJson.modelle_categorie;
        const prof_category = [];
        for (var i = 0; i < prof_cat.length; i++) {
          prof_category.push(prof_cat[i]);
        }
        this.setState({professionalCategory: prof_category}, () => {});

        this.setState(
          {
            firstName: responseJson.data.nome,
            lastName: responseJson.data.cognome,
            gender: responseJson.data.sesso,
            dob: responseJson.data.data_nascita,
            birthPlace: responseJson.data.luogo_nascita,
            nationality: responseJson.data.nazionalita,
            fiscalCode: responseJson.data.c_fiscale,
            vatNumber: responseJson.data.p_iva,
            address: responseJson.data.indirizzo,
            location: responseJson.data.localita,
            province: responseJson.data.provincia,
            postalCode: responseJson.data.cap,
            phone: responseJson.data.telefono,
            fax: responseJson.data.fax,
            mobilePhone: responseJson.data.cellulare,
            website: responseJson.data.sito_web,
            // professionalCategory : responseJson.data.dsc_categorie
            workExperience: responseJson.data.esperienze_lavorative,
            cutIt: responseJson.data.taglia,
            height: responseJson.data.altezza,
            otherwise: responseJson.data.seno,
            life: responseJson.data.vita,
            hips: responseJson.data.fianchi,
            shoes: responseJson.data.scarpe,
            hair: responseJson.data.id_capelli,
            hairLook: responseJson.data.id_capelli_look,
            eyes: responseJson.data.id_occhi,
            ethnicity: responseJson.data.id_etnia,
            complexion: responseJson.data.id_carnagione,
            regionOfResidence: responseJson.data.id_regione_residenza,
            motherTongue: responseJson.data.id_lingua_madrelingua,
            // availabilityInOtherRegions : responseJson.data.modelle_availability
            // availabilityInOtherRegions : category
          },
          () => {
            this.getProfessionalCategoryList();
            this.getHairList();
            this.getHairLookList();
            this.getEyesList();
            this.getEthnicityList();
            this.getComplexionList();
            this.getRegionOfResidenceList();
            this.getMotherTongueList();
            this.getOtherRegionOfResidenceList();
            this.getOtherMotherTongueList();
          },
        );
      })
      .catch((error) => {});
  };

  getProfessionalCategoryList = async () => {
    const formData = new FormData();
    formData.append('method', 'getProfessionalCategoryList');

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
            id: cat[i].id_categorie_modelle,
            name: cat[i].descrizione_categorie_modelle,
          });
        }
        this.setState({professionalCategoryList: category});
      })
      .catch((error) => {});
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
        this.setState({hairList: category});
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
        this.setState({hairLookList: category});
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
        this.setState({eyesList: category});
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
        this.setState({ethnicityList: category});
      })
      .catch((error) => {});
  };

  getComplexionList = async () => {
    const formData = new FormData();
    formData.append('method', 'getComplexionList');

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
            label: cat[i].dsc_carnagione,
            value: cat[i].id_carnagione,
          });
        }
        this.setState({complexionList: category});
      })
      .catch((error) => {});
  };

  getRegionOfResidenceList = async () => {
    const formData = new FormData();
    formData.append('method', 'getRegionOfResidenceList');

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
            label: cat[i].dsc_regioni,
            value: cat[i].id_regioni,
          });
        }
        this.setState({regionOfResidenceList: category});
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
        this.setState({motherTongueList: category});
      })
      .catch((error) => {});
  };

  getOtherRegionOfResidenceList = async () => {
    const formData = new FormData();
    formData.append('method', 'getRegionOfResidenceList');

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
            id: cat[i].id_regioni,
            name: cat[i].dsc_regioni,
          });
        }
        this.setState({availabilityInOtherRegionsList: category});
      })
      .catch((error) => {});
  };

  getOtherMotherTongueList = async () => {
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
            id: cat[i].id_lingue_modelle,
            name: cat[i].dsc_lingue_modelle,
          });
        }
        this.setState({otherLanguagesSpokenList: category});
        this.setState({loading: false});
      })
      .catch((error) => {});
  };

  onSelectedProfessionalCategory = (selectedItems) => {
    this.setState({professionalCategory: selectedItems}, () => {});
  };

  onSelectedOtherRegions = (selectedItems) => {
    this.setState({availabilityInOtherRegions: selectedItems}, () => {});
  };

  onSelectedOtherLanguageSpoken = (selectedItems) => {
    this.setState({otherLanguagesSpoken: selectedItems});
  };

  toSaveData = async () => {
    const formData = new FormData();
    formData.append('method', 'updateModelUserProfile');
    formData.append('fcid', this.state.fcid);
    formData.append('sesso', this.state.gender);
    formData.append('data_nascita', this.state.dob);
    formData.append('luogo_nascita', this.state.birthPlace);
    formData.append('nazionalita', this.state.nationality);
    formData.append('c_fiscale', this.state.fiscalCode);
    formData.append('p_iva', this.state.vatNumber);
    formData.append('indirizzo', this.state.address);

    formData.append('localita', this.state.location);
    formData.append('provincia', this.state.province);
    formData.append('cap', this.state.postalCode);
    formData.append('telefono', this.state.phone);
    formData.append('fax', this.state.fax);
    formData.append('cellulare', this.state.mobilePhone);
    formData.append('sito_web', this.state.website);
    // formData.append("categorie[0]", "9");
    formData.append(
      'categorie',
      JSON.stringify(this.state.professionalCategory),
    );

    formData.append('esperienze_lavorative', this.state.workExperience);
    formData.append('taglia', this.state.cutIt);
    formData.append('altezza', this.state.height);
    formData.append('seno', this.state.otherwise);
    formData.append('vita', this.state.life);
    formData.append('fianchi', this.state.hips);
    formData.append('scarpe', this.state.shoes);
    formData.append('id_capelli', this.state.hair);

    formData.append('id_capelli_look', this.state.hairLook);
    formData.append('id_occhi', this.state.eyes);
    formData.append('id_etnia', this.state.ethnicity);
    formData.append('id_carnagione', this.state.complexion);
    formData.append('id_residenza', this.state.regionOfResidence);
    formData.append('id_madrelingua', this.state.motherTongue);
    //         formData.append("lingue[0]", "1");
    // formData.append("disponibilita[0]", "1");
    // formData.append("disponibilita[1]", "4");
    formData.append('lingue', JSON.stringify(this.state.otherLanguagesSpoken));
    formData.append(
      'disponibilita',
      JSON.stringify(this.state.availabilityInOtherRegions),
    );

    const requestOptions = {
      method: 'POST',
      // headers: myHeaders,
      body: formData,
      redirect: 'follow',
    };

    fetch(URL, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.success === '1') {
          Alert.alert('dati salvati');
          this.props.navigation.goBack();
        } else {
          Alert.alert(result.msg);
        }
      });
  };

  render() {
    return (
      <ScrollView style={styles.scrollCont} persistentScrollbar={true}>
        {this.state.loading == false ? (
          <View style={styles.mainCont}>
            <BorderInputContainer
              Title={YourDataScreenName.FIRST_NAME}
              value={this.state.firstName}
            />
            <BorderInputContainer
              Title={YourDataScreenName.SURNAME}
              value={this.state.lastName}
            />
            <MyDropDown
              label=""
              Heading={YourDataScreenName.GENDER}
              data={GenderData}
              value={this.state.gender}
              onChangeText={(value) => {
                this.setState({gender: value});
              }}
            />
            <BorderInputContainer
              Title={YourDataScreenName.DATE_OF_BIRTH}
              value={this.state.dob}
              onChangeText={(value) => this.setState({dob: value})}
              keyboard="numeric"
            />
            <BorderInputContainer
              Title={YourDataScreenName.BIRTH_PLACE}
              value={this.state.birthPlace}
              onChangeText={(value) => this.setState({birthPlace: value})}
            />
            <BorderInputContainer
              Title={YourDataScreenName.NATIONALITY}
              value={this.state.nationality}
              onChangeText={(value) => this.setState({nationality: value})}
            />
            <BorderInputContainer
              Title={YourDataScreenName.FISCAL_CODE}
              value={this.state.fiscalCode}
              onChangeText={(value) => this.setState({fiscalCode: value})}
              keyboard="numeric"
            />
            <BorderInputContainer
              Title={YourDataScreenName.VAT_NUMBER}
              value={this.state.vatNumber}
              onChangeText={(value) => this.setState({vatNumber: value})}
              keyboard="numeric"
            />
            <BorderInputContainer
              Title={YourDataScreenName.ADDRESS}
              value={this.state.address}
              onChangeText={(value) => this.setState({address: value})}
            />
            <BorderInputContainer
              Title={YourDataScreenName.LOCATION}
              value={this.state.location}
              onChangeText={(value) => this.setState({location: value})}
            />
            <BorderInputContainer
              Title={YourDataScreenName.PROVINCE}
              value={this.state.province}
              onChangeText={(value) => this.setState({province: value})}
            />
            <BorderInputContainer
              Title={YourDataScreenName.POSTAL_CODE}
              value={this.state.postalCode}
              onChangeText={(value) => this.setState({postalCode: value})}
              keyboard="numeric"
            />
            <BorderInputContainer
              Title={YourDataScreenName.PHONE}
              value={this.state.phone}
              onChangeText={(value) => this.setState({phone: value})}
              keyboard="numeric"
            />
            <BorderInputContainer
              Title={YourDataScreenName.FAX}
              value={this.state.fax}
              onChangeText={(value) => this.setState({fax: value})}
              keyboard="numeric"
            />
            <BorderInputContainer
              Title={YourDataScreenName.MOBILE_PHONE}
              value={this.state.mobilePhone}
              onChangeText={(value) => this.setState({mobilePhone: value})}
              keyboard="numeric"
            />
            <BorderInputContainer
              Title={YourDataScreenName.WEBSITE}
              value={this.state.website}
              onChangeText={(value) => this.setState({website: value})}
            />
            {/* <MyDropDown
                        label=""
                        Heading={YourDataScreenName.PROFESSIONAL_CATEGORY}
                        data={this.state.professionalCategoryList}
                        onChangeText={(value) => this.setState({ professionalCategory: value })}
                    /> */}

            <View style={styles.dropdownHeadingTextCont}>
              <Text style={styles.dropdownHeadingText}>
                {YourDataScreenName.PROFESSIONAL_CATEGORY}:
              </Text>
              <MultiSelect
                // hideTags
                items={this.state.professionalCategoryList}
                uniqueKey="id"
                ref={(component) => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.onSelectedProfessionalCategory}
                selectedItems={this.state.professionalCategory}
                selectText=""
                searchInputPlaceholderText="Search Items..."
                searchIcon={null}
                tagRemoveIconColor={Colors.Black}
                tagBorderColor={Colors.Black}
                tagTextColor={Colors.Black}
                selectedItemTextColor="#CCC"
                selectedItemIconColor={Colors.Black}
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{color: '#CCC'}}
                styleDropdownMenuSubsection={{
                  backgroundColor: Colors.White,
                  borderBottomColor: Colors.Black,
                  borderBottomWidth: 1,
                  height: 40,
                }}
                submitButtonColor={Colors.Grey}
                submitButtonText="Submit"
                styleInputGroup={{
                  // backgroundColor: Colors.Black,
                  display: 'none',
                  keyboard: 'none',
                }}
                textInputProps={{
                  editable: false,
                }}
              />
            </View>

            <View style={styles.dropdownHeadingTextCont}>
              <Text style={styles.dropdownHeadingText}>
                {YourDataScreenName.WORK_EXPERIENCES}:
              </Text>
              <TextInput
                style={styles.bigTextInput}
                value={this.state.workExperience}
                multiline={true}
                onChangeText={(value) => this.setState({workExperience: value})}
              />
            </View>
            <View style={styles.dropdownHeadingTextCont}>
              <Text style={styles.mainHeadingText}>
                {YourDataScreenName.PHYSICAL_CHARACTERISTICS}:
              </Text>
            </View>
            <BorderInputContainer
              Title={YourDataScreenName.CUT_IT}
              value={this.state.cutIt}
              onChangeText={(value) => this.setState({cutIt: value})}
              keyboard="numeric"
            />
            <BorderInputContainer
              Title={YourDataScreenName.HEIGHT}
              value={this.state.height}
              onChangeText={(value) => this.setState({height: value})}
              keyboard="numeric"
            />
            <BorderInputContainer
              Title={YourDataScreenName.OTHERWISE}
              value={this.state.otherwise}
              onChangeText={(value) => this.setState({otherwise: value})}
            />
            <BorderInputContainer
              Title={YourDataScreenName.LIFE}
              value={this.state.life}
              onChangeText={(value) => this.setState({life: value})}
              keyboard="numeric"
            />
            <BorderInputContainer
              Title={YourDataScreenName.HIPS}
              value={this.state.hips}
              onChangeText={(value) => this.setState({hips: value})}
              keyboard="numeric"
            />
            <BorderInputContainer
              Title={YourDataScreenName.SHOES}
              value={this.state.shoes}
              onChangeText={(value) => this.setState({shoes: value})}
              keyboard="numeric"
            />
            <MyDropDown
              label=""
              Heading={YourDataScreenName.HAIR}
              data={this.state.hairList}
              onChangeText={(value) => this.setState({hair: value})}
              value={this.state.hair}
            />
            <MyDropDown
              label=""
              Heading={YourDataScreenName.HAIR_LOOK}
              data={this.state.hairLookList}
              value={this.state.hairLook}
              onChangeText={(value) => this.setState({hairLook: value})}
            />
            <MyDropDown
              label=""
              Heading={YourDataScreenName.EYES}
              data={this.state.eyesList}
              value={this.state.eyes}
              onChangeText={(value) => this.setState({eyes: value})}
            />
            <MyDropDown
              label=""
              Heading={YourDataScreenName.ETHNICITY}
              data={this.state.ethnicityList}
              value={this.state.ethnicity}
              onChangeText={(value) => this.setState({ethnicity: value})}
            />
            <MyDropDown
              label=""
              Heading={YourDataScreenName.COMPLEXION}
              data={this.state.complexionList}
              value={this.state.complexion}
              onChangeText={(value) => this.setState({complexion: value})}
            />
            <View style={styles.dropdownHeadingTextCont}>
              <Text style={styles.mainHeadingText}>
                {YourDataScreenName.OTHER_DATA}
              </Text>
            </View>
            <MyDropDown
              label=""
              Heading={YourDataScreenName.REGION_OF_RESIDENCE}
              data={this.state.regionOfResidenceList}
              value={this.state.regionOfResidence}
              onChangeText={(value) =>
                this.setState({regionOfResidence: value})
              }
            />
            <MyDropDown
              label=""
              Heading={YourDataScreenName.MOTHER_TONGUE}
              data={this.state.motherTongueList}
              value={this.state.motherTongue}
              onChangeText={(value) => this.setState({motherTongue: value})}
            />
            <View style={styles.dropdownHeadingTextCont}>
              <Text style={styles.dropdownHeadingText}>
                {YourDataScreenName.AVAILABILITY_IN_OTHER_REGIONS}:
              </Text>
              <MultiSelect
                // hideTags
                items={this.state.availabilityInOtherRegionsList}
                uniqueKey="id"
                ref={(component) => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.onSelectedOtherRegions}
                selectedItems={this.state.availabilityInOtherRegions}
                selectText=""
                searchInputPlaceholderText="Search Items..."
                searchIcon={null}
                tagRemoveIconColor={Colors.Black}
                tagBorderColor={Colors.Black}
                tagTextColor={Colors.Black}
                selectedItemTextColor="#CCC"
                selectedItemIconColor={Colors.Black}
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{color: '#CCC'}}
                styleDropdownMenuSubsection={{
                  backgroundColor: Colors.White,
                  borderBottomColor: Colors.Black,
                  borderBottomWidth: 1,
                  height: 40,
                }}
                submitButtonColor={Colors.Grey}
                submitButtonText="Submit"
                styleInputGroup={{
                  // backgroundColor: Colors.Black,
                  display: 'none',
                  keyboard: 'none',
                }}
                textInputProps={{
                  editable: false,
                }}
              />
            </View>
            <View style={styles.dropdownHeadingTextCont}>
              <Text style={styles.dropdownHeadingText}>
                {YourDataScreenName.OTHER_LANGUAGES_SPOKEN}:
              </Text>
              <MultiSelect
                // hideTags
                items={this.state.otherLanguagesSpokenList}
                uniqueKey="id"
                ref={(component) => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={(value) =>
                  this.onSelectedOtherLanguageSpoken(value)
                }
                selectedItems={this.state.otherLanguagesSpoken}
                selectText=""
                searchInputPlaceholderText="Search Items..."
                searchIcon={null}
                tagRemoveIconColor={Colors.Black}
                tagBorderColor={Colors.Black}
                tagTextColor={Colors.Black}
                selectedItemTextColor="#CCC"
                selectedItemIconColor={Colors.Black}
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{color: '#CCC'}}
                styleDropdownMenuSubsection={{
                  backgroundColor: Colors.White,
                  borderBottomColor: Colors.Black,
                  borderBottomWidth: 1,
                  height: 40,
                }}
                submitButtonColor={Colors.Grey}
                submitButtonText="Submit"
                styleInputGroup={{
                  // backgroundColor: Colors.Black,
                  display: 'none',
                  keyboard: 'none',
                }}
                textInputProps={{
                  editable: false,
                }}
              />
            </View>
            <View style={styles.buttonCont}>
              <ButtonComponent
                title={YourDataScreenName.SAVE_YOUR_DATA}
                onPress={() => this.toSaveData()}
              />
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
    width: '90%',
    alignSelf: 'center',
  },
  dropdownHeadingTextCont: {
    marginBottom: 10,
  },
  dropdownHeadingText: {
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  mainHeadingText: {
    paddingVertical: 10,
    fontWeight: 'bold',
    fontSize: FontSize.FONT_20,
  },
  bigTextInput: {
    borderColor: Colors.Black,
    borderWidth: 1,
    height: 150,
  },
  buttonCont: {
    width: '50%',
    alignSelf: 'center',
  },
});
