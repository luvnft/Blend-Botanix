import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useData } from './datacontext';
import { baseURL } from './constants';
import { Colors } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

const CreateIdentity = ({ navigation }) => {
  const {userData, identityName, setIdentityName, s3URL, setMetaData, tokenIds, metaData} = useData();
  const [loading, setLoading] = useState(false);
  const newid = Number(tokenIds) + 1;
  
        const uploadIPFS = async () => {
          if(identityName === '' || identityName === null){
            Alert.alert('Name is require')
            return
          } else {
            setLoading(true)
            try {
                const response = await axios.post(`${baseURL}saveMetadata`,{
                  name : identityName,
                  id : newid.toString(),
                  s3URL : s3URL
                });
                      if(response.data) {
                        setLoading(false);
                        setMetaData(response.data.url);
                        navigation.navigate('IdentityCreated')
                      } else {
                        setLoading(false);
                        console.error('Failed to upload image to NFT.storage');
                        Alert.alert('Failed to upload image to NFT.storage')
                      }
                    } catch (error) {
                      setLoading(false);
                    console.error('Error uploading image to server:', error);
                    Alert.alert('Failed to upload image to server')
                    }
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

            <Text style={{ fontSize : 20, padding : 30, alignSelf : "center", marginTop : 130, color : "#000000", paddingBottom : 20}}>Provide a name for your digital identity PASSPORT.</Text>
            
            <TextInput
            value={identityName}
            onChangeText={(text)=>{setIdentityName(text)}}
            placeholder='Example : John Doe'
            style={{
                margin : 10,
                padding : 10,
                paddingHorizontal : 40,
                borderRadius : 5,
                borderColor : '#B2B2B2',
                borderWidth : 1,
                width : "80%",
                justifyContent : "center",
                alignItems : "center"
            }}
            />
             

            <Text style={{fontSize : 14, color : "rgba(0,0,0,0.5)", margin : 45}}>
            Note: The name provided above will be the name of your NFT digital identity PASSPORT. Hence, once it is minted, the name for the PASSPORT can’t be change. You can choose to put your real name or a nickname, but please note that this will be public to everyone
            </Text>

            <TouchableOpacity onPress={uploadIPFS}>
                <View style={styles.buttoncontainerinside}>
                    <Text style={
                      styles.createtext
                      }
                     
                      >Create your identity</Text>
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
    marginTop : 130, 
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

export default CreateIdentity;
