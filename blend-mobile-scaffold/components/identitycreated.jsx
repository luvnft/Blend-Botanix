import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useData } from './datacontext';
import { baseURL } from './constants';
import { Colors } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

const IdentityCreated = ({ navigation }) => {
    const {userData, s3URL} = useData();
    
    const mintToken = async () => {
        navigation.navigate('PassportMinting')
    }
    const handleOpenURL = () => {
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

            <Text style={{ fontSize : 20, padding : 30, alignSelf : "center", marginTop : 130, color : "#000000", paddingBottom : 20}}>{userData?.walletAddress}'s Digital Identity PASSPORT</Text>
            <Image source={require("../assets/Images/DigitalImage.png")}></Image>
            
            <TouchableOpacity onPress={handleOpenURL}>
            <View
            style={{
              marginTop : 30,
              padding : 5,
              paddingHorizontal : 40,
              borderRadius : 5,
              borderColor : '#B2B2B2',
              borderWidth : 1,
              width : "80%",
              justifyContent : "space-between",
              alignItems : "center",
              flexDirection : "row"
          }}>
            <TextInput
            placeholder='Your digital identity 3D Files'
            readOnly
            ></TextInput>
            <Image source={require("../assets/Images/fileUpload.png")}></Image>
          </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={mintToken}>
                <View style={styles.buttoncontainerinside}>
                    <Text style={
                      styles.createtext
                      }
                     
                      >Mint into ERC-721 Passport</Text>
                      <Image source={require("../assets/Images/Arrow.png")}></Image>
                  
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
    justifyContent : "space-between",
    paddingHorizontal : 20,
    zIndex : 99999999999,
    position : "absolute",
    marginTop : 50, 
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

export default IdentityCreated;
