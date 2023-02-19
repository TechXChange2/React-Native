import React, { useContext, useState, useEffect } from 'react';
import {Context} from '../../globals/context.js';
import * as API from '../API.js';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ProposeTradeScreen({route, navigation}) {
  const itemInfo = route.params.itemInfo;
  const {userData} = React.useContext(Context);
  const [userDevices, setUserDevices] = useState([]);
  const [selectedUserDevice, setSelectedUserDevice] = useState();

  useEffect(() => {
  //  console.log('USERDATA.id: ', userData.id)
    API.getItemsFromUserID(2)
    .then((response) => {
      setUserDevices(response.data)
      }).catch((error) => {
        console.log(error);
      })
  }, [itemInfo]);

  const setDevice = (e, id) => {
   e.preventDefault();
   // console.log('KEY: ', e.key);
   setSelectedUserDevice(id);
   console.log('DEX: ', id)
  }

  const onSubmitProposal = (e) => {
    e.preventDefault();
    API.createTrade({
      "proposer_id": Number(userData.id),
      "proposer_device_id": Number(selectedUserDevice),
      "receiver_id": Number(itemInfo.user_id),
      "receiver_device_id": Number(itemInfo.id),
      "status": "proposed"
    });
    navigation.navigate('ItemDetails', { itemInfo: itemInfo })
  }

  const deviceMap = userDevices.map((device, index) => {
    console.log(device);
    return (
      <Button key={device.id} title={index.toString()} onPress={(e) => {setDevice(e, device.id)}}></Button>
    //  <TouchableOpacity activeOpacity = { .5 } onPress={(e) => {onPress(e)} } key={index}>
    //     <Image style={{width: '50%', height: '25%'}} source={{uri: device.thumbnail_url}}/>
    //   </TouchableOpacity>
    )
  });

  return (
    <View style={styles.container}>
      <Text>Propose Trade</Text>

      <Text>Proposing a trade for:</Text>
      <Image style={{width: '50%', height: '25%'}} source={{uri: itemInfo.thumbnail_url}}/>

      <Text>Select a device to trade:</Text>

      {deviceMap}

        {/* {console.log(userDevices)} */}


      <Button title="Propose Trade" onPress={(e) => {onSubmitProposal(e)}}></Button>
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
