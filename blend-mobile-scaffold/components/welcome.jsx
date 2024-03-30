import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Vibration,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Colors } from './colors';
import { baseURL } from './constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useData } from './datacontext';

const Welcome = ({navigation}) => {

    const {wallet, setWallet, userData, setUserData, tokenIds, setTokenIds} = useData()
    const [loading, setLoading] = useState(false);

    const fetchWallet = async () => {
        const wallet = await AsyncStorage.getItem('WalletAddress');
        if(wallet){
            setWallet(wallet)
        }
    }

    useEffect(()=>{
        fetchWallet();
    },[])

    const check = async () => {
        setLoading(true);
        try {
            const login = await axios.post(`${baseURL}login`, {
                walletAddress: wallet
            });
            console.log('LOGIN DATA', login.data);
            setUserData(login.data.user);
            if(login.data.user){
                setLoading(false)
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Login failed, signing up...');
                await signup();
            } else {
                console.error("Error:", error.message);
            }
        }
    };
    
    const signup = async () => {
        setLoading(true)
        try {
            const signupResponse = await axios.post(`${baseURL}signup`, {
                walletAddress: wallet
            });
            console.log('SIGNUP DATA', signupResponse.data);
            setUserData(signupResponse.data.user);
            if(signupResponse.data.user){
                setLoading(false);
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };
    

    useEffect(()=>{
        check();
    },[wallet])

    useEffect(()=>{
        const fetchToken = async() => {
            try {
                const login = await axios.post(`${baseURL}getToken`);
                if (login.data) {
                    setTokenIds(login.data.tokenIds);
                }
            } catch (error) {
                console.error("Error:", error.message);
            }
       }
       fetchToken();
    },[])

    const handleClick = () => {
        if(userData?.nickname){
            navigation.navigate('Profile')
        } else {
            navigation.navigate('CreateProfile')
        }
    }
  return (
    <View style={styles.container}>
        <View style={{backgroundColor : Colors.yellow, width : 70, height : 70, alignItems : "center", justifyContent : "center", borderRadius : 5}}>
            <Text style={{fontWeight : "500", fontSize : 40, color : "#000000"}}>B</Text>
        </View>
        <Text style={{fontWeight : "500", fontSize : 30, color : "#000000", marginTop : 50}}>Welcome to Blend!</Text>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
            {loading ? (
                <ActivityIndicator color={'black'} size={'large'}/>
            ) : (
                <Text style={{fontWeight : "500", fontSize : 12, color : "#000000"}}>Connect to Spiderchain Testnet</Text>
            )}
            
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Welcome;
