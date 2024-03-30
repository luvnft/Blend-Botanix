import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import SplashScreen from './components/splashscreen';
import CreateWallet from './components/createwallet';
import ImportWallet from './components/importwallet';
import Welcome from './components/welcome';
import Landing from './components/Landing';
import CreateProfile from './components/createProfile';
import Profile from './components/profile';
import CreateNew from './components/createnew';
import PayBtc from './components/paybtc';
import CreateIdentity from './components/createidentity';
import IdentityCreated from './components/identitycreated';
import PassportMinting from './components/passportminting';
import MintedSuccess from './components/mintedsuccess';
import LoadingImage from './components/loadingImage';
import IndividualIdentity from './components/myidentityindividual';
import ThreedView from './components/threedview';
import TestIframe from './components/testiframe';
import { DataProvider } from './components/datacontext';

const Stack = createStackNavigator();
const App = () => {

  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false, 
        }}
        >
          <Stack.Screen name="Landing" component={Landing}/>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerTitle: '' }}/>
          <Stack.Screen name="CreateWallet" component={CreateWallet}/>
          <Stack.Screen name="ImportWallet" component={ImportWallet}/>
          <Stack.Screen name="Welcome" component={Welcome}/>
          <Stack.Screen name="CreateProfile" component={CreateProfile}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="CreateNew" component={CreateNew}/>
          <Stack.Screen name="PayBitcoin" component={PayBtc}/>
          <Stack.Screen name="CreateIdentity" component={CreateIdentity}/>
          <Stack.Screen name="LoadingImage" component={LoadingImage}/>
          <Stack.Screen name="PassportMinting" component={PassportMinting}/>
          <Stack.Screen name="IdentityCreated" component={IdentityCreated}/>
          <Stack.Screen name="MintedSuccess" component={MintedSuccess}/>
          <Stack.Screen name="IndividualIdentity" component={IndividualIdentity}/>
          <Stack.Screen name="ThreedView" component={ThreedView}/>
          <Stack.Screen name="TestIframe" component={TestIframe}/>
        </Stack.Navigator>
      </NavigationContainer>
      </DataProvider>
     
  );
};

export default App;
