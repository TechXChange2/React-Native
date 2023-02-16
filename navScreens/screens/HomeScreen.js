import React, { useContext } from 'react';
import {Context} from '../../globals/context.js';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Link } from '@react-navigation/native';
import * as API from '../API.js';
import axios from 'axios';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Components
import PendingTrades from '../components/evan/PendingTrades.js';
import Bookmarks from '../components/evan/Bookmarks.js';
import YourItems from '../components/evan/YourItems.js';



export default function ProfileScreen(props) {
  const {userData, handleSignOut, isLoading} = React.useContext(Context);
  // console.log('Nav?', props.navigation);
  const {updateNav} = React.useContext(Context);
  updateNav(props.navigation);

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
      <View style={styles.logout}>
      <TouchableOpacity onPress={handleSignOut}>
      <Ionicons name='log-out-outline' size={40} color='#007AFF'/>
      </TouchableOpacity>
      {/* <Button
        title="Logout"
        onPress={handleSignOut}
      /> */}
      </View>
      <Text style={styles.hello}>Hello {userData.name}!</Text>
      <View style={styles.avatar}>
        <Avatar.Image size={200} source={{url: userData.thumbnail_url}} />
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
    // backgroundColor: 'yellow',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 20
  },
  logout: {
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingRight: 30
  },
  hello: {
    fontSize: 40,
    textAlign: 'center'
  }
});


//LOGOUT BUTTON
// <Button
// title="LOGOUT"
// onPress={handleSignOut}
// />