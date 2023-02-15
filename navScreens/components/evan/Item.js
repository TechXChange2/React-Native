import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'

const Item = ({id}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar.Image size={50} source={require('../../../assets/icon.png')} />
      </View>
      <View style={styles.info}>
        <View style={styles.title}>
          <Text>Title id: {id}</Text>
        </View>
        <View style={styles.description}>
          <Text>Description..</Text>
        </View>
        <View style={styles.condition}>
          <Text>Condition..</Text>
        </View>
      </View>
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue'
  },
  avatar: {
    backgroundColor: 'yellow'
  },
  info: {
    backgroundColor: 'green'
  },
  title: {
    backgroundColor: 'orange'
  },
  description: {
    backgroundColor: 'tomato'
  },
  condition: {
    backgroundColor: 'lightblue'
  }
})