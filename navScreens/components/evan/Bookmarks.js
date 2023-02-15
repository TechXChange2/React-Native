import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Bookmarks = () => {
  return (
    <View style={styles.container}>
      <Text>Bookmarks</Text>
    </View>
  )
}

export default Bookmarks

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'grey',
    height: 200,
    marginVertical: 30
  }
})