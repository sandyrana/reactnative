import 'react-native-gesture-handler';
import * as React from 'react';
import { View,Text,TouchableOpacity, Image,StyleSheet ,SafeAreaView,StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screen/SplashScreen';
import WelcomeScreen from './src/screen/WelcomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';

import HomeScreen from './src/screen/HomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';


import CustomSidebarMenu from './src/navigation/CustomSidebarMenu';
import Capture from './src/screen/Capture';

const MainStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
      animationEnabled: false,
    }}>
    <MainStack.Screen name="SplashScreen" component={SplashScreen} />
    <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
  </MainStack.Navigator>
);

const CreateDrawer = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    contentOptions={(activeTintColor = 'red')}
    drawerContent={props => <CustomSidebarMenu {...props} />}
    >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    
  </Drawer.Navigator>
);

RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
      animationEnabled: false,
    }}>
    <RootStack.Screen name="Main" component={MainStackScreen} />    
    <RootStack.Screen name="Login" component={LoginScreen} />
    <RootStack.Screen name="Register" component={RegisterScreen} />   
    <RootStack.Screen name="Capture" component={Capture} /> 
    <RootStack.Screen name="HomeScreen" component={CreateDrawer} /> 
  </RootStack.Navigator>
);

export default function App(){
  return <NavigationContainer>{RootStackScreen()}</NavigationContainer>;
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
})
