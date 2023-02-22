import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';
import { TextInput, Avatar, ActivityIndicator } from 'react-native-paper';
import * as API from '../API';
import {Context} from '../../globals/context.js'
import { useIsFocused } from '@react-navigation/native';
import s3 from '../../globals/s3Utils.js';



export default function AddItemScreen({navigation, route}) {
  const isFocused = useIsFocused();
  const {userData, isReady, setIsReady} = React.useContext(Context);
  const [itemName, setItemName] = React.useState('');
  const [imageURL, setImageURL] = React.useState('');
  const [condition, setCondition] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);


  const handleAddItem = async () => {
    setIsLoading(true);
  const imageUri = route.params?.phoneUri;
  const img = await s3.fetchImageFromUri(imageUri);
  const imgName = 'email?=' + (userData.email || 'empty') + '?-' + (new Date().toISOString()) + '.jpeg';
  const imageKey = await s3.uploadImage(imgName, img);

    //////////////
    let itemObj = {name: itemName, user_id: userData.id, thumbnail_url: imageKey, description: description, item_condition: condition};
    console.log()
    API.insertDevice(userData.id, itemObj)
      .then((res) => {
        let isReadyObj = isReady;
        isReadyObj.yourItems = true;
        setIsReady(isReadyObj);
        setIsLoading(false);
        console.log('success adding an item');
      })
      .catch((err) => {
        console.log('error adding item was ', err);
      });
  };

  if(isLoading) {
    return (
      <View style={styles.containerLoading}>
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
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      {route.params?.phoneUri && (
        <View style={styles.avatar}>
          <Avatar.Image size={100} source={{uri: route.params?.phoneUri}} />
        </View>
      )}
      <Button title="Add an Image" onPress={() => navigation.navigate('ImagePick', {fromPage: 'additem'})} />
      <TextInput
      style={styles.input}
      placeholder="Item Name"
      onChangeText={(text) => setItemName(text)}
      defaultValue=""/>
      <TextInput
      style={styles.input}
      placeholder="Image URL"
      onChangeText={(text) => setImageURL(text)}
      defaultValue=""/>
      <TextInput
      style={styles.input}
      placeholder="Condition"
      onChangeText={(text) => setCondition(text)}
      defaultValue=""/>
      <TextInput
      style={styles.input}
      placeholder="Description"
      onChangeText={(text) => setDescription(text)}
      defaultValue=""/>
      <StatusBar style="auto" />
      </View>
        <View style={styles.buttonStyle} >
          <Button title="Add Item" onPress={handleAddItem} color={'#fff'}></Button>
        </View>
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
  inputContainer: {
    // backgroundColor: 'lightblue',
    width: '80%'
  },
  avatar: {
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  buttonStyle: {
    borderColor: '#007AFF',
    borderWidth: 2.5,
    width: '80%',
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    // position: 'absolute',
    // bottom: 40
  },
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'lightgrey',
    marginTop: 10
  },

});
