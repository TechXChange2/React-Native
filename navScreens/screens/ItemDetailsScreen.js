import React, { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Image, Button, TouchableOpacity } from 'react-native';
import * as API from '../API.js';
import {Context} from '../../globals/context.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';


export default function ItemDetailsScreen({route, navigation}) {
  const itemId = route.params.itemID;
  const {userData} = React.useContext(Context);
  const [itemInfo, setItemInfo] = useState({});
  const [itemSellerName, setItemSellerName] = useState('');
  const [itemSellerCity, setItemSellerCity] = useState('');
  const [itemSellerState, setItemSellerState] = useState('');
  const [itemSellerThumbnailURL, setItemSellerThumbnailURL] = useState('');




 useEffect(() => {
  API.getItemFromID(itemId)
    .then((response) => {
      setItemInfo(response.data[0]);
    }).catch((error) => {
      console.log(error);
    });
}, []);

useEffect(() => {
  if (itemInfo) {
  API.getUserFromID(itemInfo.user_id)
    .then((response) => {
      setItemSellerName(response.data[0].name)
      setItemSellerCity(response.data[0].city)
      setItemSellerState(response.data[0].state)
      setItemSellerThumbnailURL(response.data[0].thumbnail_url)

    }).catch((error) => {
      console.log(error);
    });
  }
}, [itemInfo]);

const onAddButtonClick = (e) => {
  e.preventDefault();
  const bookmarkObj = {
    itemID: itemId,
    userID: userData.id,
  };
  API.addBookmark(bookmarkObj)
    .then(() => {
      console.log('bookmark added');
    }).catch((error) => {
      console.log(error);
    });
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.addBookmark} onPress={(e) => onAddButtonClick(e)}>
        <Ionicons name='bookmarks-outline' size={40} color='#007AFF'/>
      </TouchableOpacity>
      <Text style={styles.itemName}>{itemInfo.name}</Text>
      <View style={styles.avatar}>
        <Avatar.Image size={200} source={{url: itemInfo.thumbnail_url}} />
      </View>


      <View style={styles.currentOwnerInfo}>
        <Text style={styles.headerText}>Current Owner</Text>
        <View style={styles.currentOwnerInfoBody}>
          <View style={styles.avatar}>
            <Avatar.Image size={100} source={{url: itemSellerThumbnailURL}} />
          </View>
          <View style={styles.ownerDetails}>
            <View style={styles.inlineStyle}><Ionicons name="person-outline" size={20}/><Text style={styles.detailText}>{itemSellerName}</Text></View>
            <View style={styles.inlineStyle}><Ionicons name="location-outline" size={20}/><Text style={styles.detailText}>{itemSellerCity}, {itemSellerState}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.itemDetailsInfo} size={20} >
        {/* <Text style={styles.headerText}>Description</Text> */}
        <View style={styles.itemDetailsInfoBody}>
          <View style={styles.inlineStyleDescription}><Ionicons name="list-outline" size={20}/><Text style={styles.detailText}>{itemInfo.description}</Text></View>
          <View style={styles.inlineStyle}><Ionicons name="ribbon-outline" size={20}/><Text style={styles.detailText}>Condition: {itemInfo.item_condition}</Text></View>
        </View>
      </View>

      <View style={styles.buttonStyle}>
        <Button title="Propose Trade" onPress={() => navigation.navigate('ProposeTradeScreen', { itemInfo: itemInfo }) } ></Button>
      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: -20,
    marginBottom: 10
  },
  addBookmark: {
    width: '90%',
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 20
  },
  currentOwnerInfo: {
    minHeight: 170,
    backgroundColor: 'rgb(211, 240, 245)',
    paddingLeft: 20,
    width: '100%',
    fontSize: 24,
    marginTop: 20
  },
  currentOwnerInfoBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: -30,
    fontSize: 20
  },
  itemDetailsInfo: {
    minHeight: 150,
    paddingLeft: 20,
    width: '100%',
    fontSize: 24,
    marginBottom: -30
  },
  itemDetailsInfoBody: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20,
    width: '80%'
  },
  headerText: {
    fontSize: 24,
    marginTop: 15
  },
  ownerDetails: {
    marginLeft: 40,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  inlineStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center'
  },
  inlineStyleDescription: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 20,
    marginTop: 15,
    alignItems: 'flex-start'
  },
  detailText: {
    marginLeft: 10,
    fontSize: 18,
   // marginTop: 15
  },
  buttonStyle: {
    borderColor: '#1f96f3',
    // backgroundColor: '#1f96f3',
    borderWidth: 2.5,
    width: '85%',
    borderRadius: 10,
    marginBottom: 20
  }

});