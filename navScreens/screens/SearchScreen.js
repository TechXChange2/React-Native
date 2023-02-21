import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import DropDown from "react-native-paper-dropdown";
import React from 'react';
import { useState } from 'react';
import Filter from '../components/arie/Filter.js';
import ItemCard from '../components/arie/ItemCard.js';
import Item from '../components/evan/Item.js';
import { getAllDevices } from '../API.js';

export default function SearchScreen({ route }) {
  const params = route.params;




  return (
<<<<<<< HEAD
    <View style={{ marginHorizontal: 25 }}>
=======
    <View style={styles.container}>
>>>>>>> main
      <Text>Filter Items</Text>
      <StatusBar style="auto" />
      <Filter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 30
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
