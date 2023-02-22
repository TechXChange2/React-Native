import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as API from '../API';
import {Context} from '../../globals/context.js'

export default function AddItemScreen({user}) {
  const {userData, isReady, setIsReady} = React.useContext(Context);
  const [itemName, setItemName] = React.useState('');
  const [imageURL, setImageURL] = React.useState('');
  const [condition, setCondition] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleAddItem = () => {
    let itemObj = {name: itemName, user_id: userData.id, thumbnail_url: imageURL, description: description, item_condition: condition};
    console.log()
    API.insertDevice(userData.id, itemObj)
      .then((res) => {
        let isReadyObj = isReady;
        isReadyObj.yourItems = true;
        setIsReady(isReadyObj);
        console.log('success adding an item');
      })
      .catch((err) => {
        console.log('error adding item was ', err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
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
  input: {
    backgroundColor: 'lightgrey',
    marginTop: 10
  },

});
