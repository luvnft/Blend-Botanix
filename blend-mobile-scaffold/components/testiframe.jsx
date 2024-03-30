import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import { useData } from './datacontext';

export default function TestIframe({navigation}) {

const {clickedItem} = useData()
  const webViewRef = useRef(null);
  const tattviewer = clickedItem?.metadata;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 3.5, marginBottom: 60, margin : 10}}>
        <WebView 
        ref={webViewRef}
        source={{ uri: tattviewer }}
        javaScriptEnabled={true}
        />
        {/* <WebView
          originWhitelist={['*']}
          source={{html: widgetHTML, baseUrl: 'https://google.com'}}
          injectedJavaScript={widgetScript}
        /> */}
      </View>
    </View>
  );
}

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
      },
})