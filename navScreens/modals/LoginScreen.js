import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {Context} from '../../globals/context.js';
import { TextInput } from 'react-native-paper';
import { auth } from '../../globals/firebase.js';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { ActivityIndicator } from 'react-native-paper';


export default function LoginScreen({navigation}) {
  const [email, setEmail] = React.useState();
  const [pass, setPass] = React.useState();
  const [resetPass, setResetPassword] = React.useState(false);
  const [emailReset, setEmailReset] = React.useState();
  const [emailError, setEmailError] = React.useState(false);
  const [passError, setPassError] = React.useState(false);
  const [tooManyRequests, setTooManyRequests] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, pass)
    .then(userCredentials => {
      setIsLoading(false);
      console.log('Success Login (email): ', userCredentials.user.email);
    })
    .catch(err => {
      setIsLoading(false);
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
    })
  }

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, emailReset)
    .then((res) => {
      console.log('pass reset link SENT', res)
      // Password reset email sent!
      // ..
    })
    .catch((err) => {
      if(err.code === 'auth/invalid-email') {
        setEmailError(true);
      }
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.log('Error pass reset', JSON.stringify(err))
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={'-150'}
      >
      <View style={styles.header}>
        <Text style={styles.headerText}>LOGIN</Text>
      </View>
      <Text style={passError ? styles.errortext : styles.hide}>password is incorrect</Text>
      <Text style={emailError ? styles.errortext : styles.hide}>email is incorrect</Text>
      <Text style={tooManyRequests ? styles.errortext : styles.hide}>Sorry, too many requests. Try again later</Text>
      <>
      <View style={styles.inputContainer}>
        <TextInput
        style={resetPass ? styles.hide : styles.input}
        placeholder='email'
        onChangeText={(text) => setEmail(text)}
        defaultValue=''
        error={emailError ? true : false}
        />
        <TextInput
        style={resetPass ? styles.hide : styles.input}
        placeholder='password'
        onChangeText={(text) => setPass(text)}
        secureTextEntry={true}
        defaultValue=''
        error={passError ? true : false}
        />
        <TextInput
        style={resetPass ? styles.input : styles.hide}
        placeholder='email for password reset'
        onChangeText={(text) => setEmailReset(text)}
        />
      </View>
      </>
      {
        !resetPass && (
        <Button
        title='Forgot Password?'
        onPress={() => setResetPassword(true)}
        />
        )
      }
        {
          resetPass && (
            <>
            <Button
            title='Send Reset Link'
            onPress={() => {handlePasswordReset()}}
            />
            <Button
            title='Return to Login'
            onPress={() => {setResetPassword(false); setEmailError(false)}}
            />
            </>
          )
        }
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={() => {setIsLoading(true); handleLogin()}}
        style={styles.button}
        >
          {
          isLoading ? (
            <ActivityIndicator
            animating={true}
            color='white'
            // color={MD2Colors.red800}
            size='small'
            />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )
        }

        </TouchableOpacity>
      </View>
      <Text style={{marginTop: 25}}>Don't have an Account? <Text
      style={styles.blue}
      onPress={() => navigation.navigate('RegisterScreen')}
      >Register here</Text></Text>
    {/* <StatusBar style="auto" /> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  hide: {
    display: 'none'
  },
  show: {
    // display: 'block'
  },
  header: {
    height: '15%',
    // backgroundColor: 'green'
  },
  headerText: {
    fontSize: 40,
    color: '#007AFF'
  },
  blue: {
    fontSize: '18',
    color: '#007AFF'
  },
  loginText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white'
  },
  errortext: {
    color: 'red'
  },
  container: {
    flex: 1,
    // width: '100%',
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
    backgroundColor: '#007AFF',
    marginTop: 20,
    width: '60%'
  },
  button: {
    paddingVertical: 25,
    alignItems: 'center'
  },

});
