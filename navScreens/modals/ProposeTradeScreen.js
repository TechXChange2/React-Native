import React, { useContext, useState, useEffect } from 'react';
import {Context} from '../../globals/context.js';
import * as API from '../API.js';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import s3 from '../../globals/s3Utils.js'


export default function ProposeTradeScreen({route, navigation}) {
//userDevices
//devicelistWithImage
//itemInfo -- to trade with
//seller info

  const itemInfo = route.params.itemInfo; //to trade with
  const {userData, isReady, setIsReady} = React.useContext(Context);
  const [yourImage, setYourImage] = useState();
  const [theirImage, setTheirImage] = useState();
  const [userDevices, setUserDevices] = useState([]);
  const [devicesWithImage, setDevicesWithImage] = useState([]);
  const [selectedUserDevice, setSelectedUserDevice] = useState();
  // const [selectedDeviceURL, setSelectedDeviceURL] = useState('');

//set yourPic
  useEffect(() => {
    if(userData) {
      s3.getProfilePic(userData)
      .then(res => setYourImage(res))
      .catch(err => console.error(err))
      s3.getProfilePic(route.params.sellerData)
      .then(res => setTheirImage(res))
      .catch(err => console.error(err))
    }
  }, []);
//getSetUserDevices
  useEffect(() => {
    API.getItemsFromUserID(userData.id)
    .then((response) => {
      setUserDevices(response.data)
      }).catch((error) => {
        console.log(error);
      })
  }, [itemInfo]);
//print selected user device
  // useEffect(() => {
  //   console.log('user device: ', selectedUserDevice)
  // }, [selectedUserDevice]);

  //once user devices set, set devicesWithImage
  useEffect(() => {
    //create a bunch of promises
    if(userDevices.length) {
      const promiseMap = userDevices.map((device, index) => {
        return new Promise((resolve, reject) => {
          //get image
          s3.getItemImage(device)
          .then(img => {
            let deviceObj = {...device};
            deviceObj.thumbnail_url = img;
            resolve(deviceObj)
          })
          // resolve with large html
        }) //end PROMISE

      });
      Promise.all(promiseMap)
      .then(arr => {
        // console.log('arr', arr);
        setDevicesWithImage(arr)
        setSelectedUserDevice(arr[0])
      })
      .catch(err => console.error(err))
    }

  }, [userDevices]);

  // const setDevice = (e, id) => {
  //  e.preventDefault();
  //  setSelectedUserDevice(id);
  // }

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

  // useEffect(() => {
  //   if(selectedUserDevice) {
  //     API.getItemFromID(selectedUserDevice.id)
  //       .then((response) => {
  //         setSelectedDeviceURL(response.data[0].thumbnail_url);
  //       }).catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [selectedUserDevice]);


  return (
    <View style={styles.container}>
      <View style={styles.selectedDeviceInfo}>
        <Text style={styles.selectableDevices}>Select a device to trade:</Text>
        {(devicesWithImage && selectedUserDevice) && (
        <View  style={styles.selectedDevice}>
          {devicesWithImage.map(device => {
            return (
              <TouchableOpacity
              style={styles.selectableDevice}
              key={device.id}
              onPress={() => { setSelectedUserDevice(device) }}
              style={(selectedUserDevice.id === device.id) ? styles.highlighted : styles.unhighlighted}
              >
                <Avatar.Image size={100} source={{uri: device.thumbnail_url}} />
              </TouchableOpacity>
            )
          })}
        </View>
        )}
      </View>
      <View style={styles.proposalInfo}>
        <Text style={styles.headerText}>Proposal:</Text>
        <View style={styles.theSwap}>
          <View style={[{ aspectRatio: 1 }], [styles.imgBox, styles.imgBoxLeft]}>
            <View style={styles.yourPic}>
              {yourImage && (
                <Avatar.Image size={45} source={{ uri: yourImage}} />
              )}
            </View>
            {(devicesWithImage && selectedUserDevice) && (
              // <View><Text>x</Text></View>
              <Image resizeMode="cover" style={[{ aspectRatio: 1}, styles.img]} source={{uri: selectedUserDevice.thumbnail_url}}/>
            )}
          </View>
          <View style={styles.swapIcon}>
            <Ionicons name='swap-horizontal-outline' size={35} />
          </View>
          <View style={[{ aspectRatio: 1 }], [styles.imgBox, styles.imgBoxRight]}>
            <View style={styles.theirPic}>
              <Avatar.Image size={45} source={{uri: theirImage}}/>
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
