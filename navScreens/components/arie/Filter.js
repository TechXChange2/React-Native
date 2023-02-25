import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from '@react-navigation/native';
import { Surface } from 'react-native-paper';
import axios from 'axios';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import ItemCard from './ItemCard.js';
import { getAllDevices } from '../../API.js';
/// clean imports


export default function Filter(props) {

  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);

  const [category, setCategory] = useState('Category');
  const [condition, setCondition] = useState('Condition');
  const [items, setItems] = useState([]);

  React.useEffect(() => {
    getAllDevices()
    .then(res => {
      console.log(res.data);
      setItems(res.data);
    })
    .catch(err => {
      console.warn('getAllDevices error in useEffect', err);
    })
  }, [])


  const categoryList = [
    {
      label: 'Phone',
      value: 'phone'
    },
    {
      label: 'Computer',
      value: 'computer'
    },
    {
      label: 'Other',
      value: 'other'
    }
  ];

  const conditionList = [
    {
      label: 'Any',
      value: 'Any'
    },
    {
      label: 'Open Box',
      value: 'Open Box'
    },
    {
      label: 'Like New',
      value: 'Like New'
    },
    {
      label: 'Fair',
      value: 'Fair'
    },
    {
      label: 'Good',
      value: 'Good'
    }
  ];

  return (

    <View>
      <DropDown
        label={"Category"}
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={category}
        setValue={setCategory}
        list={categoryList}
      />
      <View style={styles.spacerStyle} />
      <DropDown

        label={"Condition"}
        mode={"outlined"}
        visible={showDropDown2}
        showDropDown={() => setShowDropDown2(true)}
        onDismiss={() => setShowDropDown2(false)}
        value={condition}
        setValue={setCondition}
        list={conditionList}
      />
      <ScrollView style={styles.scroll}>
        {items.map((item, i) => {
          if(condition === 'Condition' || condition === 'Any') {
            return <ItemCard item={item} id={item.id} />
          } else {
            return condition === item.item_condition && <ItemCard item={item} id={item.id} />
          }


        })}
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  scroll: {
    // backgroundColor: 'red',
    marginTop: 20,
    height: 430
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
});
