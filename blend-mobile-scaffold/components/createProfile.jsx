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
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from './constants';
import { Colors } from './colors';
import { useData } from './datacontext';
import Clipboard from '@react-native-clipboard/clipboard';

const CreateProfile = ({ navigation }) => {
    const [nickname, setNickname] = useState('');
    const [loading, setLoading] = useState(false);
    const {wallet, setUserData, userData} = useData()
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


      const updatenickname = async () => {
        try {
            if (nickname === '') {
                Alert.alert("Nickname can't be empty");
                return;
            }
    
            setLoading(true);
            const response = await axios.post(`${baseURL}setNickname`, {
                walletAddress: userData?.walletAddress,
                nickname: nickname
            });
    
            if (response.data && response.data.user) {
                setUserData(response.data.user);
                setLoading(false);
                navigation.navigate('Profile');
            } else {
                setLoading(false);
                Alert.alert('Error', 'Failed to update nickname');
            }
        } catch (error) {
            console.error('Error updating nickname:', error);
            setLoading(false);
            Alert.alert('Error', 'Failed to update nickname. Please try again later.');
        }
    };
    
  
    return (
        <View style={styles.container}>
            <View style={{backgroundColor : Colors.yellow, width : 70, height : 70, alignItems : "center", justifyContent : "center", borderRadius : 5}}>
                <Text style={{fontWeight : "500", fontSize : 40, color : "#000000"}}>B</Text>
            </View>

            <Text style={{fontWeight : "500", fontSize : 16, color : "#000000", marginTop : 50, margin : 10}}>Hey, {formatWalletAddress(wallet)}</Text>
            <TextInput
            value={nickname}
            onChangeText={(text)=>{setNickname(text)}}
            placeholder='Provide a nickname for your profile'
            placeholderTextColor={'rgba(0,0,0,0.5)'}
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
            <TouchableOpacity style={styles.button} onPress={updatenickname}>
                {loading ? (
                    <ActivityIndicator size={'large'} color={'black'}/>
                ) : (
                    <Text style={{fontWeight : "500", fontSize : 20, color : "#000000"}} >Create Profile</Text>
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
    
    export default CreateProfile;
    