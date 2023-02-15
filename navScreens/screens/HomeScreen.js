import React, { useContext } from 'react';
import {Context} from '../../globals/context.js';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { Link } from '@react-navigation/native';
import * as API from '../API.js';
import axios from 'axios';
import { ActivityIndicator, Avatar } from 'react-native-paper';
//Components
import PendingTrades from '../components/evan/PendingTrades.js';
import Bookmarks from '../components/evan/Bookmarks.js';
import YourItems from '../components/evan/YourItems.js';

export default function ProfileScreen(props) {
  const {userData, handleSignOut, isLoading} = React.useContext(Context);
  console.log('User Data Home', userData);

  if(isLoading || !Object.keys(userData).length) {
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
    <ScrollView style={styles.container}>
      <Text>User Email is {userData.email} </Text>
      <View style={styles.avatar}>
        <Avatar.Image size={200} source={require('../../assets/icon.png')} />
      </View>
      <YourItems />
      <PendingTrades />
      <Bookmarks />


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: 'yellow',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 40
  }
});


//LOGOUT BUTTON
// <Button
// title="LOGOUT"
// onPress={handleSignOut}
// />