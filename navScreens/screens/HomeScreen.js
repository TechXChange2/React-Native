import React, { useContext } from 'react';
import {Context} from '../../globals/context.js';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Link } from '@react-navigation/native';
import * as API from '../API.js';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';


//Screens

export default function ProfileScreen(props) {
  const {userData, handleSignOut, isLoading} = React.useContext(Context);
  console.log('User Data Home', userData);

  if(isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
        animating={true}
        color='blue'
        // color={MD2Colors.red800}
        size='large'
        />
      </View>
    )
  }

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
