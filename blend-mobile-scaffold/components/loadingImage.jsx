import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useData } from './datacontext';
import { baseURL, startserver, stopserver, checkserver, processimage } from './constants';
import { Colors } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingImage = ({ navigation, route }) => {
    const {imageuri, setImageuri} = useData();;
    const {userData, s3URL, setS3URL} = useData();

    const startServerFunction = async () => {
    try {
        const response = await axios.post(
            startserver,
            {},
            {
                headers: {
                    "authorizationToken": "blendAVAX2024",
                }
            }
        );

        console.log(response.data);
    } catch (error) {
        console.error("Error:", error);
        // Handle error
    }
};


    const stopServerFunction = async () => {
    try {
        const response = await axios.post(
            stopserver,
            {},
            {
                headers: {
                    "authorizationToken": "blendAVAX2024",
                }
            }
        );

        console.log(response.data);
    } catch (error) {
        console.error("Error:", error);
        // Handle error
    }
    };

    const processImageFunction = async () => {
      let success = false;
      while (!success) {
          try {
              const formData = new FormData();
              formData.append('image', {
                  uri: imageuri?.uri,
                  name: imageuri?.name,
                  type: 'image/jpeg',
              });
  
              const response = await axios.post(processimage, formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });
  
              if (response.data.message === 'Image processed') {
                for (let i = 0; i < 3; i++) {
                  const response = await axios.post(processimage, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if(response.data.message === 'Image processed') {
                  setS3URL(response.data.s3_url);
                  setImageuri(null);
                  await stopServerFunction();
                  navigation.navigate('CreateIdentity');
                  success = true;
                    }
                  }
                  
              } else {
                  // Image processing not complete, continue the loop
                  console.log('Image processing not complete. Retrying...');
              }
          } catch (error) {
              console.error('Error uploading image:', error);
              // Handle error if needed
          }
      }
  };
  

                const checkStatus = async () => {
                    const check = await axios.get(checkserver, 
                        {
                            headers: {
                              "authorizationToken": "blendAVAX2024",
                            },
                          }
                    )
                    if(check) {
                        console.log(check.data)
                    }  
                }

                useEffect(()=>{
                  startServerFunction();
                  setTimeout(() => {
                    processImageFunction();
                  }, 20000);
                },[])

                // useEffect(()=>{
                //   const move = () => {
                //     navigation.navigate('CreateIdentity')
                //   }
                //   setTimeout(() => {
                //   move();
                //   }, 3000);
                // },[])

                return (
                  <View style={styles.container}>
                        <Text style={{fontSize : 14, color : "#000000", margin : 50, textAlign : "center"}}>
                        Allocating dedicated computation resource
                          for {userData?.walletAddress}
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

export default LoadingImage;
