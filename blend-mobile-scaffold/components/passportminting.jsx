import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useData } from './datacontext';
import { baseURL, startserver, stopserver, checkserver, processimage } from './constants';
import { Colors } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PassportMinting = ({ navigation, route }) => {
    const {userData, s3URL, setS3URL, metaData, identityName, tokenIds} = useData();
    const [privateKey, setPrivateKey] = useState(null)
    const [txHash, setTxHash] = useState('');
    useEffect(()=>{
        const fetchKey = async () => {
            const key = await AsyncStorage.getItem('PrivateKey')
            if(key) {
                setPrivateKey(key)
            }
        }
        fetchKey();
    },[])
    console.log(privateKey)
    const newid = Number(tokenIds) + 1
    const mintNFT = async () => {
    try {
        const response = await axios.post(
            `${baseURL}mintToken`, {
                senderAddress: userData?.walletAddress,
                privateKey: privateKey,
                URI: metaData
            }
        );
        console.log('response data', response.data);
        if (response.data) {
            const hash = response?.data?.transactionHash; 
            console.log('hash:', hash); // Log hash to check if it's empty or not
            setTxHash(hash);
            console.log('txHash:', txHash); // Log txHash to check if it's properly set
            const updateResponse = await axios.post(
                `${baseURL}updateToken`
            );
            if (updateResponse.data) {
                const save = await axios.post(`${baseURL}saveDigitalIdentity`, {
                    walletAddress: userData?.walletAddress,
                    name: identityName,
                    tokenId: newid.toString(),
                    metadata: metaData,
                    s3URL: s3URL,
                    explorer: `https://blockscout.botanixlabs.dev/tx/${hash}`
                });
                if (save.data) {
                    navigation.navigate('MintedSuccess');
                }
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

    useEffect(()=>{
        mintNFT()
    },[privateKey])

                return (
                  <View style={styles.container}>
                        <Text style={{fontSize : 14, color : "#000000", margin : 50, textAlign : "center"}}>
                        Passport minting in progress
                        </Text>

                        <ActivityIndicator size={'large'} color={'black'}/>

                        <Text style={{fontSize : 14, color : "rgba(0,0,0,0.5)", margin : 50, textAlign : "center"}}>
                        Note: Please do not close the application while loading as this might affect the process
                        </Text>
                  </View>
                );
              };

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center"
  },
  topbarcontainer : {
    display : "flex",
    marginTop : "10%",
    justifyContent : "space-between",
    flexDirection : "row",
    marginLeft : "3%",
    position : "absolute",
    zIndex : 99999
  },
  backcontainer : {
    display : "flex",
    flexDirection : "row",
  },
  back :{ 
    marginLeft : 10,
    marginTop : 2.5,
    color : "#000"
  },
  backimage :{ 
    width : 24,
    height : 24,
  }, 
  buttoncontainerinside : {
    width: '90%',
    backgroundColor: Colors.yellow,
    borderRadius: 30,
    height : 50,
    alignSelf : "center",
    justifyContent : "space-between",
    paddingHorizontal : 20,
    zIndex : 99999999999,
    position : "absolute",
    marginTop : 220, 
    flexDirection : "row",
    alignItems : "center",
    
  },
  createtext: {
    color : "rgba(0,0,0,1)",
    textAlign : "center",
    justifyContent : "center",
    fontSize : 20,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.7
  },
  disclaimer : {
    width : "80%",
    justifyContent : "center",
    alignSelf : "center",
    textAlign : "center",
    top : "10%",
    padding : 15,
    borderRadius : 10
  },
  disclaimerHead : {
    fontSize: 18,
    color: "black",
    fontWeight: "500",
    fontFamily: "ComicNeue-Bold",
    textAlign : "center"
  },

  disclaimerdesc : {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
    fontFamily: "ComicNeue-Bold",
    textAlign : "center",
  },
  choosefileview : {
    width : "90%",
    height : 190,
    marginTop : "10%",
    borderRadius : 10,
    backgroundColor : "rgba(0,0,0,0)",
    justifyContent : "center",
    alignSelf : "center",
    alignItems : "center",
    zIndex : 999,
    borderColor : "#DCDCDC",
    borderWidth : 1
  },
})

export default PassportMinting;
