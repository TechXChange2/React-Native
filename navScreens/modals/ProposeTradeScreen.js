import React, { useContext, useState, useEffect } from 'react';
import {Context} from '../../globals/context.js';
import * as API from '../API.js';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';


export default function ProposeTradeScreen({route, navigation}) {
  const itemInfo = route.params.itemInfo;
  const {userData, isReady, setIsReady} = React.useContext(Context);
  const [userDevices, setUserDevices] = useState([]);
  const [selectedUserDevice, setSelectedUserDevice] = useState();
  const [selectedDeviceURL, setSelectedDeviceURL] = useState('');

  useEffect(() => {
    API.getItemsFromUserID(userData.id)
    .then((response) => {
      setUserDevices(response.data)
      setSelectedUserDevice(response.data[0]);
      setSelectedDeviceURL(response.data[0].thumbnail_url)
      }).catch((error) => {
        console.log(error);
      })
  }, [itemInfo]);

  const setDevice = (e, id) => {
   e.preventDefault();
   setSelectedUserDevice(id);
  }

  const onSubmitProposal = (e) => {
    e.preventDefault();
    API.createTrade({
      "proposer_id": Number(userData.id),
      "proposer_device_id": Number(selectedUserDevice.id),
      "receiver_id": Number(itemInfo.user_id),
      "receiver_device_id": Number(itemInfo.id),
      "status": "proposed"
    });
    let isReadyObj = isReady;
    isReadyObj.trades = true;
    setIsReady(isReadyObj);
    navigation.navigate('ItemDetails', { itemInfo: itemInfo })
  }

  useEffect(() => {
    if(selectedUserDevice) {
      API.getItemFromID(selectedUserDevice.id)
        .then((response) => {
          setSelectedDeviceURL(response.data[0].thumbnail_url);
        }).catch((error) => {
          console.log(error);
        });
    }
  }, [selectedUserDevice]);

  const deviceMap = userDevices.map((device, index) => {
    return (
      <TouchableOpacity
      style={styles.selectableDevice}
      key={index}
      onPress={(e) => {setDevice(e, device.id)}}
      style={selectedUserDevice === device.id || device.thumbnail_url === selectedDeviceURL ? styles.highlighted : styles.unhighlighted}
      >
        <Avatar.Image size={100} source={{url: device.thumbnail_url}} />
      </TouchableOpacity>
    )
  });

  return (
    <View style={styles.container}>
      <View style={styles.selectedDeviceInfo}>
        <Text style={styles.selectableDevices}>Select a device to trade:</Text>
        <View  style={styles.selectedDevice}>
          {deviceMap}
        </View>
      </View>
      <View style={styles.proposalInfo}>
        <Text style={styles.headerText}>Proposal:</Text>
        <View style={styles.theSwap}>
          <View style={[{ aspectRatio: 1 }], [styles.imgBox, styles.imgBoxLeft]}>
            <View style={styles.yourPic}>
              <Avatar.Image size={45} source={{ url: userData.thumbnail_url}} />
            </View>
            <Image resizeMode="cover" style={[{ aspectRatio: 1}, styles.img]} source={{url: selectedDeviceURL}}/>
          </View>
          <View style={styles.swapIcon}>
            <Ionicons name='swap-horizontal-outline' size={35} />
          </View>
          <View style={[{ aspectRatio: 1 }], [styles.imgBox, styles.imgBoxRight]}>
            <View style={styles.theirPic}>
              <Avatar.Image size={45} source={{url: route.params.sellerData.thumbnail_url}}/>
            </View>
            <Image resizeMode="cover" style={[{ aspectRatio: 1}, styles.img]} source={{url: itemInfo.thumbnail_url}}/>
          </View>
        </View>
      </View>
      <View style={styles.buttonStyle} >
        <Button title="Propose Trade" onPress={(e) => {onSubmitProposal(e)}} color={'#fff'}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonStyle: {
    borderColor: '#007AFF',
    borderWidth: 2.5,
    width: '85%',
    borderRadius: 10,
    backgroundColor: '#007AFF',
    position: 'absolute',
    bottom: 40
  },
  selectedDevice: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectableDevices: {
    fontSize: 24,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  proposalInfo: {
    height: 200,
    backgroundColor: 'rgb(211, 240, 245)',
    paddingLeft: 20,
    width: '100%',
    fontSize: 24,
    marginTop: 0,
    paddingBottom: 5,
    paddingTop: 20
  },
  selectedDeviceInfo: {
    minHeight: 150,
    maxHeight: 300,
    paddingLeft: 20,
    width: '100%',
    fontSize: 24,
    marginTop: 20,
    paddingBottom: 5
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10
  },
  theSwap: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -20
  },
  imgBox: {
    position: 'relative',
    overflow: 'hidden',
    paddingVertical: 30,
    paddingHorizontal: 2,
  },
  imgBoxLeft: {paddingLeft: 8},
  imgBoxRight: {paddingRight: 8},
  yourPic: {
    position: 'absolute',
    top: 10,
    left: 0,
    zIndex: 10
  },
  img: {
    height: 100,
    borderRadius: 20,
  },
  theirPic: {
    position: 'absolute',
    top: 0,
    left: '100%',
    transform: [{translateX: -36}, {translateY: 10}],
    zIndex: 10
  },
  highlighted: {
    borderColor: '#007AFF',
    borderWidth: 3,
    borderRadius: '55%',
    marginRight: 30,
    marginTop: 40
  },
  unhighlighted: {
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: '55%',
    marginRight: 30,
    marginTop: 40
  },
});
