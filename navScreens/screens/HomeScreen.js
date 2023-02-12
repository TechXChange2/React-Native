import React, { useContext } from 'react';
import {Context} from '../../globals/context.js';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Link } from '@react-navigation/native';
import * as API from '../API.js';
import axios from 'axios';

//Screens

export default function ProfileScreen(props) {
  const {logout, userToken, userData} = React.useContext(Context);


  return (
    <View style={styles.container}>
      <Text>User Token is {userToken} </Text>
      <Text>User Name is {userData.name} </Text>
      <Link to={{ screen: 'Settings', params: { id: '47' } }}>
      Go to Settings
      </Link>
      <Button
        title="Add Item"
        onPress={() => props.navigation.navigate('AddItem', {
          itemId: 12
        })}
      />
      <Button
        title="LOGOUT"
        onPress={() => {
            logout();
            // props.navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'LoginScreen' }],
            // })
          }
        }
      />
      <Button
        title="View Item Details"
        onPress={() => props.navigation.navigate('ItemDetails', {
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
