import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, Animated, Easing } from 'react-native';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check } from 'react-native-permissions';
import { Colors } from './colors';

const Landing = ({ navigation }) => {
  const [blinkAnimation] = useState(new Animated.Value(0));
  const [checkWallet, setCheckWallet] = useState(false)
  useEffect(()=>{
    const check = async () => {
      const check = await AsyncStorage.getItem('WalletAddress');
      if(check !== null) {
        setCheckWallet(true);
      } else {
        setCheckWallet(false);
      }
    }
   check();
  },[])
  useEffect(() => {
    Animated.sequence([
      Animated.timing(blinkAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(blinkAnimation, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        if(checkWallet){
          navigation.dispatch(StackActions.replace('Welcome')); 
        } else {
        navigation.dispatch(StackActions.replace('Splash')); 
        }
      }
    });
    return () => {
      blinkAnimation.removeAllListeners(); 
    };
  }, [blinkAnimation, navigation, checkWallet]);
  const loadImage = () => {
    try {
      return <View style={{backgroundColor : Colors.yellow, width : 70, height : 70, alignItems : "center", justifyContent : "center", borderRadius : 5}}>
      <Text style={{fontWeight : "500", fontSize : 40, color : "#000000"}}>B</Text>
  </View>;
    } catch (error) {
      console.error('Error loading image:', error);
    }
  };

  return (
    <View style={styles.container}>
        {loadImage()}
      <Animated.View
        style={[
          styles.blinkingDot,
          {
            opacity: blinkAnimation,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blinkingDot: {
    width: 16,
    height: 16,
    backgroundColor: '#FBECD7', 
    borderRadius: 8,
    marginTop: 20,
  },
});

export default Landing;
