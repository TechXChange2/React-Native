import React, { useContext } from 'react';
import {Context} from '../../globals/context.js';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Link, useIsFocused } from '@react-navigation/native';
import * as API from '../API.js';
import axios from 'axios';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Components
import PendingTrades from '../components/evan/PendingTrades.js';
import Bookmarks from '../components/evan/Bookmarks.js';
import YourItems from '../components/evan/YourItems.js';
//Amplify + S3
import { Storage, Auth } from 'aws-amplify';



export default function ProfileScreen(props) {
  const [image, setImage] = React.useState();
  const {userData, updateNav, handleSignOut, setIsLoading, isLoading, isReady} = React.useContext(Context);
  updateNav(props.navigation);


  const downloadImage = async () => {
    console.log('isloading?', isLoading);
    Auth.currentCredentials();
    const img = await Storage.get(userData.imageUri);
    // console.log('img', img);
    setImage(img);
  };

  React.useEffect(() => {
    downloadImage();
    }, [])
  React.useEffect(() => {
    if(image) {
      setIsLoading(false);
    }
  }, [image])

  //Show Loading
  if(isLoading || !Object.keys(userData).length) {
    return (
      <View style={styles.containerLoading}>
        <View style={styles.logout}>
          <TouchableOpacity onPress={handleSignOut}>
          <Ionicons name='log-out-outline' size={40} color='#007AFF'/>
          </TouchableOpacity>
        </View>
        <ActivityIndicator
        animating={true}
        color='#007AFF'
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

      </View>
      <Text style={styles.hello}>Hello {userData.name}!</Text>
      <View style={styles.avatar}>
        <Avatar.Image size={200} source={{uri: image}} />
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
  },
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 10
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