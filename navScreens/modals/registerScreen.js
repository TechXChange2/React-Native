import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { auth } from '../../globals/firebase.js';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { TextInput } from 'react-native-paper';


export default function RegisterScreen() {

  const [email, setEmail] = React.useState();
  const [pass, setPass] = React.useState();

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, pass)
    .then(userCredentials => {
      // console.log('Success Reg (for json): ', JSON.stringify(userCredentials));
      console.log('Success Reg (email): ', userCredentials.user.email);
    })
    .catch(err => {
      // console.log('Error', JSON.stringify(err));
      // console.log('Err', err.code);
      if(err.code === 'auth/email-already-in-use') {
        //handle email in use
      }
    })
  }




  return (
    <KeyboardAvoidingView style={styles.container}>

      <View style={styles.inputContainer}>
        <TextInput
        style={styles.input}
        placeholder='email'
        onChangeText={(text) => setEmail(text)}
        defaultValue=''
        />
        <TextInput
        style={styles.input}
        placeholder='password'
        onChangeText={(text) => setPass(text)}
        secureTextEntry={true}
        defaultValue=''
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={handleRegister}
        style={styles.button}
        >
          <Text>Register</Text>
        </TouchableOpacity>
      </View>

    {/* <StatusBar style="auto" /> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  hide: {
    display: 'none'
  },
  container: {
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    // backgroundColor: 'lightblue',
    width: '80%'
  },
  input: {
    // backgroundColor: 'grey',
    marginTop: 10
  },
  buttonContainer: {
    backgroundColor: 'lightblue',
    marginTop: 20,
    width: '60%'

  },
  button: {
    paddingVertical: 25,
    alignItems: 'center'
  },
  buttonOutline: {

  }
});
