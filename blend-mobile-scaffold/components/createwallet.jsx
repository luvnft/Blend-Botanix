import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  Alert,
  Touchable,
  Vibration,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from './constants';
import { Colors } from './colors';

const CreateWallet = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recoveryPhrases, setRecoveryPhrases] = useState('');
  const [secure, setSecure] = useState(false);
  const handleClick = () => {
    navigation.navigate('Welcome');
  };

  const createPhrase = async () => {
    try {
      const response = await axios.post(`${baseURL}/createPhrase`);
      if (response.data && response.data.recoveryPhrase) {
        setRecoveryPhrases(response.data.recoveryPhrase);
      }
    } catch (error) {
      console.error('Error creating phrase:', error);
      Alert.alert('Error', 'Failed to create recovery phrase. Please try again later.');
    }
  };

  const createWallet = async () => {
    try {
      if (!recoveryPhrases) return;

      setLoading(true);

      const arrayString = JSON.stringify(recoveryPhrases);
      await AsyncStorage.setItem('recover', arrayString);

      const createWalletResponse = await axios.post(`${baseURL}/createWallet`, {
        recoveryPhrase: recoveryPhrases.toString(),
      });

      const data = createWalletResponse.data;
      await AsyncStorage.setItem('WalletAddress', data.walletAddress);
      await AsyncStorage.setItem('PrivateKey', data.privateKey);

      setLoading(false);
    } catch (error) {
      console.error('Error creating wallet:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to create wallet. Please try again later.');
    }
  };

  useEffect(() => {
    createPhrase();
  }, []);

  useEffect(() => {
    createWallet();
  }, [recoveryPhrases]);

  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [confirmRecoveryPhrase, setConfirmRecoveryPhrase] = useState([]);
  const closeModal = () => {
    setModalVisible(false);
  };
  const copyToClipboard = () => {
    // Clipboard.setString(recoveryPhrases);
    Alert.alert(recoveryPhrases, 'Copied');
  };

  const renderRecoveryPhraseBoxes = () => {
    const phraseArray = recoveryPhrases.split(' ');
    return phraseArray.map((text, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.recoveryphrasebox,
          clickedBoxes.includes(text) && styles.clickedBox,
        ]}>
        <Text style={{fontSize: 12, color: 'black'}}>
          {!secure ? text : '*****'}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbarcontainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Splash');
          }}>
          <View style={styles.backcontainer}>
            <Image
              source={require('../assets/Images/BackButton.png')}
              style={styles.backimage}></Image>
            <Text style={styles.back}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.restorecontainer}>
          <Text style={styles.restore}>Write down Your Seed Phrase</Text>
        </View>
      </View>

      <Text style={styles.letsbring}>Save these words</Text>
      {loading ? (
        <ActivityIndicator color={'black'} size={'large'}/>
      ) : (
        <View style={styles.recoveryphrase}>{renderRecoveryPhraseBoxes()}</View>
      )}
      <View style={styles.commandcontainer}>
        <View styles={styles.smallcontainer}>
          <TouchableOpacity onPress={copyToClipboard}>
            <Image
              source={require('../assets/Images/copy.png')}
              style={styles.smallimage}></Image>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color: 'black'}}>Copy</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setSecure(!secure);
          }}>
          <View styles={styles.smallcontainer}>
            <Image
              source={require('../assets/Images/hide.png')}
              style={styles.smallimage}></Image>
            <Text style={{fontSize: 10, color: 'black'}}>
              {secure ? 'Show' : 'Hide'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.buttoncontainerinside}>
        {loading ? (
          <ActivityIndicator size={'large'} color={'black'}/>
        ) : (
          <Text style={[styles.createtext]} onPress={loading ? '' : handleClick}>
          I've written it down
        </Text>
        )}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  backcontainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  back: {
    marginLeft: 10,
    marginTop: 2.5,
    color: '#000',
  },
  backimage: {
    width: 24,
    height: 24,
  },

  restorecontainer: {
    top: '10%',
    left: '60%',
    flexDirection: 'row',
  },

  restorefromcloudcontainer: {
    top: 160,
    left: -45,
    display: 'flex',
    flexDirection: 'column',
  },

  restorefromseedcontainer: {
    top: 200,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
  },

  restoremaincontainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  restore: {
    marginTop: 2.5,
    fontSize: 20,
    fontFamily: 'ComicNeue-Bold',
    color: 'black',
    fontWeight: '600',
  },
  cloud: {
    marginTop: 2.5,
    fontSize: 20,
    fontFamily: 'ComicNeue-Bold',
    color: 'black',
    fontWeight: '600',
    marginBottom: 10,
  },
  cloudimage: {
    marginLeft: 10,
    marginBottom: 15,
  },

  nextimage: {
    width: 14,
    height: 14,
    top: 260,
    left: 10,
  },

  nextcloudimage: {
    width: 14,
    height: 14,
    top: 220,
    left: 50,
  },

  letsbring: {
    top: '7%',
    left: '4%',
    fontSize: 12,
    fontFamily: 'ComicNeue-Regular',
    color: 'black',
    fontWeight: '200',
    padding: 10,
  },

  restorefromcloudtext: {
    fontSize: 12,
    fontFamily: 'ComicNeue-Regular',
    color: 'grey',
    fontWeight: '200',
  },

  topbarcontainer: {
    display: 'flex',
    marginTop: '10%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    marginLeft: '3%',
  },
  info: {
    color: 'white',
  },
  infocontainer: {
    width: 24,
    backgroundColor: 'black',
    borderRadius: 100,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: '5%',
  },

  modalContainer: {
    position: 'relative',
    top: '65%',
    alignItems: 'center',
    borderRadius: 20,
    width: '100%',
    height: '40%',
    backgroundColor: 'white',
    flexDirection: 'column',
    zIndex: 9,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
  },

  emailcontainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    paddingBottom: 10,
    left: '-20%',
  },

  logo: {
    marginRight: 15,
  },
  add: {
    marginRight: 15,
    marginLeft: 10,
    height: 20,
    width: 20,
  },
  recoveryphrase: {
    top: '25%',
    left: '1.5%',
    right: '5%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '95%',
  },
  commandcontainer: {
    top: '30%',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '40%',
    height: 30,
    alignItems: 'center',
  },

  recoveryphrasebox: {
    color: 'black',
    borderRadius: 8,
    borderColor: 'rgba(0,0,0,0.07)',
    borderWidth: 1,
    height: 30,
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 7,
    paddingRight: 7,
    width: '30%',
    marginBottom: 10,
  },
  confirmrecoveryphrase: {
    top: '30%',
    left: '1.5%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '95%',
  },
  confirmrecoveryphrasebox: {
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0.07)',
    borderRadius: 7,
    height: 25,
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 7,
    paddingRight: 7,
    width: '30%',
    marginBottom: 10,
  },
  clickedBox: {
    borderColor: '#EEA889',
    borderWidth: 2,
    shadowColor: 'black',
    shadowOpacity: '50%',
    shadowRadius: 7,
  },
  buttoncontainerinside: {
    position: 'absolute',
    width: 350,
    backgroundColor: Colors.yellow,
    borderRadius: 0,
    height: 50,
    alignSelf: 'center',
    top: '91%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createtext: {
    color: 'rgba(0,0,0,1)',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontFamily: 'ComicNeue-Bold',
  },
  willdolater: {
    color: 'rgba(0,0,0,1)',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: '400',
    fontSize: 18,
    fontFamily: 'ComicNeue-Bold',
  },

  createtextcompleted: {
    color: 'white',
  },
  buttoncontainermodel: {
    width: 200,
    backgroundColor: '#EEA889',
    borderRadius: 30,
    height: 40,
    bottom: '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createtextmodel: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
  warning: {
    backgroundColor: '#FBD1CF',
    height: 40,
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
    top: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  red: {
    fontSize: 12,
    color: '#9C0404',
    fontWeight: '500',
    fontFamily: 'ComicNeue-Bold',
    marginLeft: 10,
    marginRight: 20,
  },
  smallimage: {
    width: 16,
    height: 16,
  },
  smallcontainer: {
    flexDirection: 'row',
    display: 'flex',
  },
  buttonmodal: {
    width: 350,
    backgroundColor: '#EEA889',
    borderRadius: 30,
    height: 30,
    alignSelf: 'center',
    marginTop: 15,
    justifyContent: 'center',
  },
  buttonmodalater: {
    width: 350,
    backgroundColor: '#DDDDDD',
    borderRadius: 30,
    height: 30,
    alignSelf: 'center',
    marginTop: 15,
    justifyContent: 'center',
  },
});

export default CreateWallet;
