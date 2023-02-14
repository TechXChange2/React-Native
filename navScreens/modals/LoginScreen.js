import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {Context} from '../../globals/context.js';
import { TextInput } from 'react-native-paper';
import { auth } from '../../globals/firebase.js';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";


export default function LoginScreen({navigation}) {
  const [email, setEmail] = React.useState();
  const [pass, setPass] = React.useState();
  const [emailError, setEmailError] = React.useState(false);
  const [passError, setPassError] = React.useState(false);
  const [tooManyRequests, setTooManyRequests] = React.useState(false);

  const {handleSignOut} = React.useContext(Context);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, pass)
    .then(userCredentials => {
      console.log('Success Login (email): ', userCredentials.user.email);
    })
    .catch(err => {
      console.log('Error Login', JSON.stringify(err));
      console.log('Err', err.code);
      if(['auth/invalid-email', 'auth/missing-email', 'auth/user-not-found'].includes(err.code)) {
        setEmailError(true);
        setPassError(false);
        setTooManyRequests(false);
      }
      if(err.code === 'auth/wrong-password') {
        setPassError(true);
        setEmailError(false);
        setTooManyRequests(false);
      }
      if(err.code === 'auth/too-many-requests') {
        setTooManyRequests(true);
        setPassError(false);
        setEmailError(false);
      }
      if(err.code === 'auth/missing-email') {
        setTooManyRequests(false);
        setPassError(false);
        setEmailError(false);
      }
    })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={passError ? styles.errortext : styles.hide}>password is incorrect</Text>
      <Text style={emailError ? styles.errortext : styles.hide}>email is incorrect</Text>
      <Text style={tooManyRequests ? styles.errortext : styles.hide}>Sorry, too many requests. Try again later</Text>
      <View style={styles.inputContainer}>
        <TextInput
        style={styles.input}
        placeholder='email'
        onChangeText={(text) => setEmail(text)}
        defaultValue=''
        error={emailError ? true : false}
        />
        <TextInput
        style={styles.input}
        placeholder='password'
        onChangeText={(text) => setPass(text)}
        secureTextEntry={true}
        defaultValue=''
        error={passError ? true : false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={() => navigation.navigate('RegisterScreen')}
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
  errortext: {
    color: 'red'
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
