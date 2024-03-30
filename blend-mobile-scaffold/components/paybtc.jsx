import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useData } from './datacontext';
import { baseURL } from './constants';
import { Colors } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PayBtc = ({ navigation, route }) => {
    const [privateKey, setPrivateKey] = useState();
    const [loading, setLoading] = useState(false)
    const {userData, balance} = useData();
    useEffect(()=>{
        const fetchKey = async () => {
            const key = await AsyncStorage.getItem('PrivateKey')
            if(key) {
                setPrivateKey(key)
            }
        }
        fetchKey();
    },[])
    const nextStep = async () => {
      if(parseFloat(balance) < 0.00002){
        Alert.alert("You need minimum 0.00002 BTC to Proceed")
        return
      } else {
        setLoading(true);
    const payment = await axios.post(`${baseURL}sendBTC`, {
        senderAddress : userData.walletAddress, 
        receiverAddress : '0xD9ba52fC3366Dded194c3c77c9c9955E8FE6059a', 
        privateKey : privateKey, 
        amount : '0.00002'
    })
    if(payment.data){
      setLoading(false)
        Alert.alert('Thanks for the payment')
        navigation.navigate('LoadingImage')

    } else {
      setLoading(false)
        Alert.alert('Error in making payment')
    }
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


            <Text style={{ fontSize : 20, padding : 30, alignSelf : "center", marginTop : 130, color : "#000000", borderBottomWidth : 1, paddingBottom : 20}}>Creation of your digital identity PASSPORT requires a one-time cost of 0.00002 BTC due to the heavy computing resources required.</Text>

            <Text style={{fontSize : 14, color : "rgba(0,0,0,0.5)", margin : 45}}>
            Note: This DAPP is just a demo to showcase the Blend toolkit. The payment of 0.00002 BTC is a fix amount calculated at the time of development and is use to covered the on-cloud computation resources which is utilizing currently to power this demo
            </Text>
                <TouchableOpacity onPress={nextStep}>
                <View style={styles.buttoncontainerinside}>
                  {loading ? (
                    <ActivityIndicator size={'large'} color={'black'}/>
                  ) : (
                    <>
                    <Text style={
                      styles.createtext
                      }
                     
                      >Pay 0.00002 BTC now</Text>
                      <Image source={require("../assets/Images/Arrow.png")}></Image>
                      </>
                  )}
                   
                  
                </View>
                </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex : 1,
    height : "100%"
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

export default PayBtc;
