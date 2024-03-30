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
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from './constants';
import { Colors } from './colors';
import { useData } from './datacontext';
import Clipboard from '@react-native-clipboard/clipboard';
import { useFocusEffect } from '@react-navigation/native';

const Profile = ({ navigation }) => {
    const {wallet, setUserData, userData, setClickedItem, balance, setBalance} = useData();

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

    const copyToClipboard = () => {
      Clipboard.setString(wallet);
      Alert.alert(wallet,'Copied')
    };

    const check = async () => {
      try {
          const login = await axios.post(`${baseURL}login`, {
              walletAddress: wallet
          });
          if (login.data) {
              setUserData(login.data.user);
          } else {
             
          } 
      } catch (error) {
          console.error("Error:", error.message);
      }
  };

  const fetchBalance = async () => {
    const balance = await axios.post(`${baseURL}getBalance`, {
      walletAddress : wallet
    })
    if(balance){
      setBalance(balance.data.balance);
    }
  }
  useFocusEffect(
    React.useCallback(() => { 
      check();
      fetchBalance()
       }, [])
    );
  useEffect(()=>{
    check()
  },[])
  
  useEffect(()=>{
    fetchBalance();
  },[wallet])

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={()=>{navigation.navigate('Welcome')}}>
            <View style={{flexDirection : "row", alignItems : "center", margin : 15, marginTop : 25}}>
                <Image source={require("../assets/Images/DisconnectWallet.png")}></Image>
                <Text style={{textDecorationLine : 'underline', marginLeft : 5}}>Disconnect Wallet</Text>
            </View>
            </TouchableOpacity>
          
            <View style={{justifyContent : "center", alignItems : "center", borderBottomColor : "#D8D8D8", borderBottomWidth : 1, marginTop : 20}}>
                <Image source={require("../assets/Images/DefaultImage.png")}></Image>
                <Text style={{fontWeight : "500", fontSize : 16, color : "#000000", margin : 10}}>Hey, {userData?.nickname}</Text>

                <TouchableOpacity onPress={copyToClipboard}>
                <View style={{flexDirection : 'row', alignItems : "center"}}>
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 10}}>{formatWalletAddress(userData?.walletAddress)}</Text>
                <Image source={require("../assets/Images/copy.png")} style={{width : 20, height : 20}}></Image>
                </View>
                </TouchableOpacity>

                <View style={{flexDirection : 'row', alignItems : "center"}}>
                <Text style={{fontWeight : "400", fontSize : 14, color : "#000000", margin : 10}}>Balance : {balance ? `${balance} BTC` : 'Loading Balance ...'}</Text>
                </View>

            </View>
            
            <View style={{margin : 15, flexDirection : "row"}}>
            <Text style={{fontWeight : "400", fontSize : 14, color : "#000000"}} >Your Digital Identity(s)</Text>
            <View style={{backgroundColor : "#000", borderRadius : 30, width :25, height : 25, marginLeft : 10, justifyContent : "center", alignItems : "center"}}>
                <Text style={{color : "#fff"}}>{userData.digitalIdentity && userData.digitalIdentity.length > 0 ? userData?.digitalIdentity.length : '0'}</Text>
            </View>
            </View>

            <View>
                    {userData?.digitalIdentity && userData.digitalIdentity.length === 0 && (
                          <>
                              <View style={{justifyContent : "center", alignItems:"center", marginTop : 50}}>
                                  <Image source={require("../assets/Images/Emoji.png")} style={{margin : 20}} />
                                  <Text style={{marginHorizontal : 50, textAlign : "center"}}>
                                      Oops! No face meshes are generated.
                                      Click the ‘+’ button to create one.
                                  </Text>
                              </View>
                          </>
                      )}

                      {userData?.digitalIdentity && userData.digitalIdentity.length > 0 && userData.digitalIdentity.map((item, index)=>(
                        <TouchableOpacity onPress={()=>{setClickedItem(item); navigation.navigate('IndividualIdentity')}}>
                      <View style={{justifyContent : "space-between", alignItems:"center", marginTop : 5, borderRadius : 10, borderWidth : 1, borderColor : "rgba(0,0,0,0.2)", marginHorizontal : 10, flexDirection : "row", padding : 10}} key={index}>
                      <View style={{flexDirection : "column"}}>
                        <Text style={{fontSize : 16, color : "black"}}>
                          {item?.name}
                        </Text>
                        <Text>
                        Created on {item?.createdAt}
                        </Text>
                        </View>

                        <Image source={require("../assets/Images/RoundArrow.png")}></Image>
                    </View>
                    </TouchableOpacity>
                      ))}
            </View>
           

            <View style={{backgroundColor : "rgba(0,0,0,0)", width : "100%", height : "10%", bottom : 0, position : "absolute", justifyContent : "center", alignItems : "center"}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('CreateNew')}}>
            <View style={{backgroundColor : Colors.yellow, width : 60, height : 60, alignItems : "center", justifyContent : "center", borderRadius : 15}}>
            <Text style={{fontWeight : "500", fontSize : 24, color : "#000000"}}>+</Text>
            </View>
            </TouchableOpacity>
            </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      button : {
        color : "#000",
        backgroundColor : Colors.yellow,
        width : 300,
        height : 50,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : "center",
        margin : 30
      }
    });
    
    export default Profile;
    