import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { Colors } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from './constants';

const ImportWallet = ({ navigation }) => {
  const [wordInputs, setWordInputs] = useState(['', '', '', '', '', '', '', '', '', '', '', '']);
  const properphrase = wordInputs.join(' ')
  const handleWordInputChange = (text, index) => {
    const newWordInputs = [...wordInputs];
    newWordInputs[index] = text;
    setWordInputs(newWordInputs);
  };

  const createWallet = async () => {
    if (properphrase !== null) {
      const arrayString = JSON.stringify(properphrase);
      if (arrayString) {
        await AsyncStorage.setItem('recover', arrayString);
      }
      const trimmedMnemonic = properphrase.toString();
      if (trimmedMnemonic !== null) {
        const createWalletResponse = await axios.post(
          `${baseURL}/createWallet`,
          {
            recoveryPhrase: trimmedMnemonic,
          },
        );
        const data = createWalletResponse.data;
        await AsyncStorage.setItem('WalletAddress', data.walletAddress);
        await AsyncStorage.setItem('PrivateKey', data.privateKey);
      }
    }
  };
  const handleClick = async() => {
    const hasEmptyFields = wordInputs.some((word) => word === '');
    if (!hasEmptyFields) {
      await  createWallet();
      navigation.navigate('Welcome');
    } else {
      Alert.alert('Incomplete Input', 'Please enter all twelve words.');
    }
  };

  const handleTextPaste = (text) => {
    const words = text.split(' ');

    if (words.length === 12) {
      setWordInputs([...words]);
    }
  };

  const renderWordInputFields = () => {
    return wordInputs.map((word, index) => (
      <TextInput
        key={index}
        style={styles.wordInput}
        placeholder={`Word ${index + 1}`}
        value={word}
        onChangeText={(text) => handleWordInputChange(text, index)}
        placeholderTextColor="#1d1d1f"
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbarcontainer}>
        <TouchableOpacity onPress={() => { navigation.navigate('Splash'); }}>
          <View style={styles.backcontainer}>
            <Image source={require('../assets/Images/BackButton.png')} style={styles.backimage} />
            <Text style={styles.back}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.letsbring}>
        Please add your already saved Phrase. 
      </Text>

      <TextInput
        style={styles.pasteTextInput}
        placeholder="Paste your 12 words here"
        onChangeText={handleTextPaste}
        placeholderTextColor="#1d1d1f"
      />

      <View style={styles.recoveryphrase}>{renderWordInputFields()}</View>

      <View style={styles.buttoncontainerinside}>
        <Text
          style={styles.createtext}
          onPress={handleClick}
        >
          Continue
        </Text>
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
  wordInput: {
    width: '30%',
    height: 35,
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    fontFamily: 'ComicNeue-Regular',
    borderColor: Colors.yellow,
    color : "#1d1d1f"
  },
  back: {
    marginLeft: 10,
    marginTop: 2.5,
    color : "#000"
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
  restore: {
    marginTop: 2.5,
    fontSize: 20,
    fontFamily: 'ComicNeue-Bold',
    color: 'black',
    fontWeight: '600',
  },
  letsbring: {
    top: '7%',
    left: '4%',
    fontSize: 12,
    fontFamily: 'ComicNeue-Regular',
    color: 'black',
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
  pasteTextInput: {
    width: '90%',
    height: 35,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    top : "10%",
    fontFamily: 'ComicNeue-Regular',
    borderColor: Colors.yellow,
    alignSelf: 'center',
    color : "1d1d1f"
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
  buttoncontainerinside: {
    position: 'absolute',
    width: 350,
    backgroundColor: Colors.yellow,
    borderRadius: 30,
    height: 50,
    alignSelf: 'center',
    justifyContent : "center",
    top: '90%',
    color : "#000"
  },
  createtext: {
    color: '#000',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'ComicNeue-Regular',
  },
  createtextcompleted: {
    color: 'white',
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
    fontSize: 10,
    color: '#9C0404',
    fontWeight: '500',
    fontFamily: 'ComicNeue-Bold',
    marginLeft: 10,
    marginRight: 20,
  },
});

export default ImportWallet;
