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
} from 'react-native';
import { Colors } from './colors';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={{backgroundColor : Colors.yellow, width : 70, height : 70, alignItems : "center", justifyContent : "center", borderRadius : 5}}>
            <Text style={{fontWeight : "500", fontSize : 40, color : "#000000"}}>B</Text>
        </View>
        <Text style={{fontWeight : "500", fontSize : 30, color : "#000000", marginTop : 50}}>Welcome to Blend!</Text>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('CreateWallet')}}>
            <Text style={{fontWeight : "500", fontSize : 20, color : "#000000"}}>Create Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('ImportWallet')}}>
            <Text style={{fontWeight : "500", fontSize : 20, color : "#000000"}}>Import Wallet</Text>
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
    width : 200,
    height : 50,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center",
    margin :10
  }
});

export default SplashScreen;
