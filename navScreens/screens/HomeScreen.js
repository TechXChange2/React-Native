import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Link } from '@react-navigation/native';
import * as API from '../API.js';
import axios from 'axios';

//Screens

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = React.useState('');

  function getUser() {
    console.log('GettingUserFunc called');
    axios({method: 'GET', url: 'http://localhost:8080/users/user/1'})
    .then(res => {
      console.log('response', res.data);
    })
    .catch(err => {
      console.error('error in axios', err);
    })
    // API.getUserFromID(1)
    // .then(response => {
    //   console.log('User from 1', response.data);
    // })
    // .catch(err => {
    //   console.error(err);
    // })

  }
    //get user id 1, set user




  return (
    <View style={styles.container}>
      <Text>User Name is: {user.username}</Text>
      <Link to={{ screen: 'Settings', params: { id: '47' } }}>
      Go to Settings
      </Link>
      <Button
        title="Get User 1"
        onPress={getUser}
      />
      <Button
        title="Add Item"
        onPress={() => navigation.navigate('AddItem', {
          itemId: 12
        })}
      />
      <Button
        title="LOGOUT"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        }
      />
      <Button
        title="View Item Details"
        onPress={() => navigation.navigate('ItemDetails', {
          itemId: 21
        })
        }
      />
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
