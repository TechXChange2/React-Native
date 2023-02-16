import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from '@react-navigation/native';
import { Surface } from 'react-native-paper';
import axios from 'axios';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import DropDown from 'react-native-paper-dropdown';
/// clean imports


export default function Filter(props) {

  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);

  const [category, setCategory] = useState('Category');
  const [condition, setCondition] = useState('Condition');

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
      label: 'Mint',
      value: 'mint'
    },
    {
      label: 'Good',
      value: 'good'
    },
    {
      label: 'Used',
      value: 'used'
    }
  ];

  return (

        <ScrollView>
          <DropDown
            style={{ margin: 15 }}
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
        </ScrollView>

  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
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
