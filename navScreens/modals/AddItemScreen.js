import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as API from '../API';

export default function AddItemScreen({user}) {
  const [itemName, setItemName] = React.useState('');
  const [imageURL, setImageURL] = React.useState('');
  const [condition, setCondition] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleAddItem = () => {
    let user = {id:2};
    let itemObj = {name: itemName, thumbnail_url: imageURL, description: description, item_condition: condition};
    console.log()
    API.insertDevice(user.id, itemObj)
      .then((res) => {
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {handleAddItem()}}
        style={styles.button}
        >
          <Text>
            Add Item
          </Text>
        </TouchableOpacity>
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
  input: {
    backgroundColor: 'grey',
    marginTop: 10
  },
  buttonContainer: {
    backgroundColor: '#007AFF',
    marginTop: 20,
    width: '60%'
  },
  button: {
    paddingVertical: 25,
    alignItems: 'center'
  },
});
