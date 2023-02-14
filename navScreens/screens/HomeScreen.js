import React, { useContext } from 'react';
import {Context} from '../../globals/context.js';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Link } from '@react-navigation/native';
import * as API from '../API.js';
import axios from 'axios';

//Screens

export default function ProfileScreen(props) {
  const {userData, handleSignOut} = React.useContext(Context);
  console.log('User Data Home', userData);

  return (
    <View style={styles.container}>
      <Text>User Email is {userData.email} </Text>
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
        onPress={handleSignOut}
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
