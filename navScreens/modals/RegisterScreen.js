import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
//Third Party
import { auth } from '../../globals/firebase.js';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { TextInput } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { createUser, deleteUser } from '../API.js';
import { GOOGLE_PLACES_WEB_API } from '@env';
import { ActivityIndicator } from 'react-native-paper';


export default function RegisterScreen() {

  const [email, setEmail] = React.useState();
  const [pass, setPass] = React.useState();
  const [emailInvalid, setEmailInvalid] = React.useState(false);
  const [userExists, setUserExists] = React.useState(false);
  const [passIsWeak, setPassIsWeak] = React.useState(false);
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const [thumbnail_url, setThumbnailUrl] = React.useState();
  const [street, setStreet] = React.useState();
  const [cityStateCountry, setCityStateCountry] = React.useState();
  const [keyOffset, setKeyOffset] = React.useState(200);
  const [googleApiKey, dontSetGoogleApiKey] = React.useState(process.env.GOOGLE_PLACES_WEB_API);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = () => {
    var locationArr = cityStateCountry.length ? cityStateCountry.split(', ') : []
    var userObj = {
      email,
      name,
      description,
      thumbnail_url,
      street,
      city: locationArr[0],
      state: locationArr[1],
      country: locationArr[2],
    }
    // console.log('User Obj', userObj);

    createUser(userObj)
      .then(res => {
        console.log('Added User to DB', res.data)
        createUserWithEmailAndPassword(auth, email, pass)
        .then(res => {
          console.log('Added User to FB')
          setIsLoading(false);
        })
        .catch(err => {
          console.log('Error adding user to FB', err);
          setIsLoading(false);
        })
      })
      .catch(err => {
        console.log('Couldnt add user to DB..', err);
        setUserExists(true);
        setIsLoading(false);
      })
  }


  return (
    <>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={keyOffset}
      >

      <View style={styles.inputContainer}>
        <Text style={emailInvalid ? styles.error : styles.hide}>email is invalid</Text>
        <Text style={userExists ? styles.error : styles.hide}>email already exists</Text>
        <TextInput
        style={styles.input}
        placeholder='email'
        placeholderTextColor='lightgrey'
        onChangeText={(text) => setEmail(text)}
        onFocus={() => {setKeyOffset('-50'); setEmailInvalid(false)}}
        onSubmitEditing={() => setKeyOffset(200)}
        error={emailInvalid}
        />
        <Text style={passIsWeak ? styles.error : styles.hide}>password is weak</Text>
        <TextInput
        style={styles.input}
        placeholder='password'
        placeholderTextColor='lightgrey'
        onChangeText={(text) => setPass(text)}
        secureTextEntry={true}
        onFocus={() => {setKeyOffset('-50'); setPassIsWeak(false)}}
        onSubmitEditing={() => setKeyOffset(200)}
        error={passIsWeak}
        />
        <TextInput
        style={styles.input}
        placeholder='name'
        placeholderTextColor='lightgrey'
        onChangeText={(text) => setName(text)}
        onFocus={() => {setKeyOffset('-50')}}
        onSubmitEditing={() => setKeyOffset(200)}
        />
        </View>

      <View style={styles.inputContainer}>
        <TextInput
        style={styles.input}
        placeholder='brief about you'
        placeholderTextColor='lightgrey'
        onChangeText={(text) => setDescription(text)}
        onFocus={() => {setKeyOffset('-50')}}
        onSubmitEditing={() => setKeyOffset(200)}
        />
        <TextInput
        style={styles.input}
        placeholder='profile pic (url)'
        placeholderTextColor='lightgrey'
        onChangeText={(text) => setThumbnailUrl(text)}
        onFocus={() => {setKeyOffset(200)}}
        />
      </View>
      {/* ADDRESS INPUT */}
      <GooglePlacesAutocomplete
      placeholder='Address'
      // onFocus={() => {setKeyOffset(200)}}
      isFocused={() => {console.log('addy focused')}}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(data, '\n\n\n', details);
        var street = details.structured_formatting.main_text;
        var cityStateCountry = details.structured_formatting.secondary_text;
        setStreet(street);
        setCityStateCountry(cityStateCountry);

      }}
      suppressDefaultStyles
      styles={searchStyles}
      query={{
        key: googleApiKey,
        language: 'en',
      }}
    />
    {/* REGISTER BUTTON */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={() => {setIsLoading(true); handleRegister()}}
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
            <Text style={styles.registerText}>Register</Text>
          )
        }

        </TouchableOpacity>
      </View>
    {/* <StatusBar style="auto" /> */}
    </KeyboardAvoidingView>
    </>
      // </View>
  );
}






const styles = StyleSheet.create({
  hide: {
    display: 'none'
  },
  error: {
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
    backgroundColor: 'white',
    marginTop: 10
  },
  registerText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white'
  },
  buttonContainer: {
    backgroundColor: '#007AFF',
    marginTop: 20,
    width: '60%'
  },
  button: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonOutline: {

  }
});


const searchStyles = {
  container: {
    // flex: 1,
    heigth: 80,
    width: '80%',
    paddingVertical: 10
  },
  keyboardContainer: {
    width: '100%'
  },
  textInputContainer: {
    flexDirection: 'row',
    height: 55
  },
  textInput: {
    backgroundColor: 'white',
    height: '100%',
    // color: 'red',
    // borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {},
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
};
