import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useData } from './datacontext';
import { baseURL } from './constants';
import { Colors } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

const MintedSuccess = ({ navigation }) => {
    const {userData, s3URL, identityName, metaData, date, tokenIds} = useData();
    const formatWalletAddress = (walletAddress) => {
      if (walletAddress.length < 20) {
        return walletAddress; 
      }
    
      const first7 = walletAddress.slice(0, 7);
      const last7 = walletAddress.slice(-7);
      const dots = '...';
      const formattedAddress = `${first7}${dots}${last7}`;
    
      return formattedAddress;
    };
    
    const mintToken = async () => {
        navigation.navigate('Profile')
    }
    const handleOpenURL = () => {
      if (metaData) {
        Linking.canOpenURL(metaData)
          .then(supported => {
            if (!supported) {
              // If the URL is not supported, attempt to open it anyway
              return Linking.openURL(metaData);
            } else {
              return Linking.openURL(metaData);
            }
          })
          .catch(error => {
            console.error('Error occurred while checking URL support:', error);
          });
          }
        };

        const handleOpenS3URL = () => {
          if (s3URL) {
            Linking.canOpenURL(s3URL)
              .then(supported => {
                if (!supported) {
                  // If the URL is not supported, attempt to open it anyway
                  return Linking.openURL(s3URL);
                } else {
                  return Linking.openURL(s3URL);
                }
              })
              .catch(error => {
                console.error('Error occurred while checking URL support:', error);
              });
              }
            };

  return (
    <View style={styles.container}>
            <View style={styles.topbarcontainer}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
            <View style ={styles.backcontainer}>
          <Image source={require('../assets/Images/BackButton.png')} style={styles.backimage}></Image>
            <Text style={styles.back}>Back To Profile</Text>
            </View>
            </TouchableOpacity>
            </View>
            <View style={{alignItems : "center"}}>
            <View style={{backgroundColor : "#D3FBB4", width : 200, height : 30, alignItems : "center", justifyContent : "center", borderRadius : 20, marginTop : 100}}>
                <Text style={{fontSize : 14, color : "#397A07"}}>Minted Successfully</Text>
            </View>
            <Text style={{ fontSize : 20, padding : 30, alignSelf : "center", marginTop : 10, color : "#000000", paddingBottom : 20}}>{userData?.walletAddress}'s Digital Identity PASSPORT</Text>
            <Image source={require("../assets/Images/DigitalImage.png")}></Image>
            <Text style={{fontSize : 20, color : "black", margin : 10}}>{identityName}</Text>
            <Text>Created by : {formatWalletAddress(userData?.walletAddress)}</Text>
            <Text>Created on : {Date.now()}</Text>
            {/* userData?.totalIds */}
            <Text style={{textDecorationLine : 'underline'}}>Token ID : { tokenIds + 1}</Text>
            <TouchableOpacity onPress={handleOpenURL}>
            <Text style={{textDecorationLine : "underline"}}>NFT Passport Metadata</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleOpenS3URL}>
            <TextInput
            placeholder='Your digital identity 3D Files'
            style={{
                marginTop : 30,
                padding : 10,
                paddingHorizontal : 40,
                borderRadius : 5,
                borderColor : '#B2B2B2',
                borderWidth : 1,
                width : "80%",
                justifyContent : "center",
                alignItems : "center"
            }}
            readOnly
            />
            </TouchableOpacity>

            <TouchableOpacity onPress={mintToken}>
                <View style={styles.buttoncontainerinside}>
                    <Text style={
                      styles.createtext
                      }
                     
                      >Return to profile</Text>
                  
                </View>
                </TouchableOpacity>
                </View>
               
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex : 1,
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
    justifyContent : "center",
    paddingHorizontal : 20,
    zIndex : 99999999999,
    position : "absolute",
    marginTop : 20, 
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

export default MintedSuccess;
