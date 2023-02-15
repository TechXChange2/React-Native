import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PendingTrades = () => {
  return (
    <View style={styles.container}>
      <Text>PendingTrades</Text>
    </View>
  )
}

export default PendingTrades

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'lightblue',
    height: 200,
    // marginVertical: 30
  }
})