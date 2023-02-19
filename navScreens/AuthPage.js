import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Context} from '../globals/context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import LoginScreen from './modals/LoginScreen.js';
import RegisterScreen from './modals/RegisterScreen.js';
import ImagePick from './modals/ImagePick.js';

const Stack = createNativeStackNavigator();

export default function AuthPage({route}) {
  const {login, userToken} = React.useContext(Context);


  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='LoginScreen'
      screenOptions={{
        headerStyle: {
          // backgroundColor: 'grey'
        }
      }}
      >
        <Stack.Screen name='LoginScreen' options={{title: 'Login'}} component={LoginScreen}/>
        <Stack.Screen name='RegisterScreen' options={{title: 'Register'}}component={RegisterScreen}/>
        <Stack.Screen name='ImagePick' options={{title: 'Pick an Image', gestureEnabled: false, headerBackVisible: false}}
 component={ImagePick}/>
      </Stack.Navigator>
    </NavigationContainer>
  )



  return (
    <View style={styles.container}>
      <Text>Login / Register</Text>
      <Button
      title='LOGIN'
      onPress={login}
      />
      <Text>User Token: {userToken}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
