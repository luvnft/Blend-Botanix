import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, PERMISSIONS, request } from 'react-native-permissions';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { useData } from './datacontext';
import { baseURL } from './constants';
import { Colors } from './colors';
import { PermissionsAndroid } from 'react-native';
import Permissions, { openSettings} from 'react-native-permissions';

const CreateNew = ({ navigation, route }) => {
const [image, setImage] = useState(null)
const [selectedFile, setSelectedFile] = useState(null);
const {imageuri, setImageuri} = useData()

  // const withPermission = async () => {
  //   try {
  //     let permission;
  //     if (Platform.OS === 'ios') {
  //       permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
  //     } else {
  //       permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  //     }

  //     const permissionStatus = await check(permission);

  //     if (permissionStatus === 'denied') {
  //       const newPermissionStatus = await request(permission);

  //       if (newPermissionStatus === 'granted') {
  //         handleChooseFile()
  //       } else {
  //         console.log('Permission not granted');
  //         return;
  //       }
  //     } else if (permissionStatus === 'granted') {
  //       handleChooseFile();
  //     }
  //   } catch (error) {
  //     console.log('Error selecting image:', error);
  //   }
  // };

  // const withPermission = async () => {
  //   try {
  //     if (Platform.OS === 'android') {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //         {
  //           title: 'Storage Permission',
  //           message: 'Blend needs access to your storage to choose a file.',
  //           buttonPositive: 'OK',
  //         }
  //       );
        
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         handleChooseFile();
  //       } else {
  //         console.log('Permission denied');
  //       }
  //     } else {
  //       // iOS logic for permissions
  //       handleChooseFile();
  //     }
  //   } catch (error) {
  //     console.error('Error selecting image:', error);
  //   }
  // };


let deniedPermissionArray = [
  Permissions.RESULTS.BLOCKED,
  Permissions.RESULTS.LIMITED,
];
const withPermission = async () => {
  const storagePermission =
    Platform.Version >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  const mediaPermission = Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: storagePermission,
  });

  const hasPermissionToStorage = await Permissions.check(mediaPermission);
  if (hasPermissionToStorage == Permissions.RESULTS.GRANTED) {
    handleChooseFile()
    return true;
  }
  if (hasPermissionToStorage == Permissions.RESULTS.LIMITED) {
    return true;
  }
  if (hasPermissionToStorage == Permissions.RESULTS.DENIED) {
    const permissionRequest = await Permissions.request(mediaPermission);

    if (permissionRequest == Permissions.RESULTS.BLOCKED) {
      return Alert.alert(
        "You've previously disable Media permission on Blend. \n\nTo enable this, click App Settings below and activate Media under the permission menu.",
      );
    }
    if (permissionRequest == Permissions.RESULTS.DENIED) {
      return false;
    }
    return permissionRequest === Permissions.RESULTS.GRANTED;
  }
  if (deniedPermissionArray.includes(hasPermissionToStorage)) {
    return Alert.alert(
      "You've previously disable Media permission on Blend. \n\nTo enable this, click App Settings below and activate Media under the permission menu.",
    );
  }
};
  const handleChooseFile = async () => {
    const options = {
      mediaType: 'mixed',
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        const uri = response.assets?.[0]?.uri;
        const type = response.assets?.[0]?.type;
        const fileName = response.assets?.[0]?.fileName;

        setSelectedFile({
          uri: uri,
          type: type,
          fileName: fileName
        });
        setImage({
          uri: uri,
        })

        setImageuri({
          name : fileName,
          uri : uri
        });
      }
    });
  };

  const nextStep =  () => {
    if(image?.uri === null){
        Alert.alert('Select an image first')
        return
    } else {
        navigation.navigate('PayBitcoin')
    }
  }

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


            <Text style={{ fontSize : 25, alignSelf : "center", marginTop : 100, color : "#000000", borderBottomColor : "#D8D8D8", borderBottomWidth : 1, paddingBottom : 20}}>Create New Digital Identity</Text>
            
            <Image source={require("../assets/Images/SampleImage.png")} style={{alignSelf  : "center", marginTop : 10}}/>
                <Text style={{paddingHorizontal : 60, textAlign : "center", marginTop : 10}}>
                Upload a high detail image of your front face with clean background and following the correct face ratio and resolution. 
                </Text>

             <TouchableOpacity onPress={withPermission}>
              <View style={[styles.choosefileview, image ? {borderColor : "#ffffff"} : {borderColor : "#000000"}]}>
              <Image source={image ? {uri: image.uri} : require("../assets/Images/Upload.png")} style={{alignSelf: "center", width: image ? 180 : 50, height: image ? 190 : 50}}/>
            </View>
            </TouchableOpacity>

           

                <TouchableOpacity onPress={nextStep}>
                <View style={styles.buttoncontainerinside}>
                    <Text style={
                      styles.createtext
                      }
                     
                      >Next Step</Text>
                  
                </View>
                </TouchableOpacity>
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
    zIndex : 99999999999,
    position : "absolute",
    marginTop : 50
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

export default CreateNew;
