import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
//React Context
import {ContextProvider, Context} from './globals/context.js';
//Screens
import AuthPage from './navScreens/AuthPage.js';
import AppPage from './navScreens/AppPage.js';

//Amplify + S3 config for app
import { Amplify } from 'aws-amplify';
import awsconfig from "./src/aws-exports.js";
Amplify.configure(awsconfig);

export default function App() {
  return (
    <ContextProvider>
      <PaperProvider>
        <Root />
      </PaperProvider>
    </ContextProvider>
  );
}

function Root() { //renders Authentication stack or App stack, depending on global login state
  const {userData} = React.useContext(Context);
  return (
    <>
      {userData?.email ? <AppPage /> : <AuthPage />}
      {/* <AuthPage /> */}
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
