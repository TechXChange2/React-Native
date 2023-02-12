import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
//React Context
import {ContextProvider, Context} from './globals/context.js';
//Screens
import AuthPage from './navScreens/AuthPage.js';
import AppPage from './navScreens/AppPage.js';

export default function App() {
  return (
    <ContextProvider>
      <Root />
    </ContextProvider>
  );
}

function Root() {
  const {userToken} = React.useContext(Context);
  return (
    <>
      {userToken === 'null' ? <AuthPage /> : <AppPage />}
    </>
  )
}

// {/* <StatusBar style="auto" /> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
