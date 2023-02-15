import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Item from './Item.js';

const YourItems = () => {
  return (
    <View style={styles.container}>
      <Text>Your Items</Text>
      <Item id={3}/>
    </View>
  )
}

export default YourItems

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'silver',
    height: 200,
    marginVertical: 30
  }
})