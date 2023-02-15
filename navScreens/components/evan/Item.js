import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { Context } from '../../../globals/context.js'

const Item = ({item}) => {
  const {nav} = React.useContext(Context);

//navigation.navigate('ItemDetail', {itemId})
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => nav.navigate('ItemDetails', {itemId: item.id})} style={styles.avatar}>
    {/* <Avatar.Image size={100} source={require('../../../assets/icon.png')} /> */}
        <Avatar.Image size={100} source={{ url: item.thumbnail_url}} />
      </TouchableOpacity>
      <View style={styles.info}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{item.name}</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descText}>Description: {item.description}</Text>
        </View>
        <View style={styles.condition}>
          <Text style={styles.condText}>Condition: {item.item_condition}</Text>
        </View>
      </View>
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightblue'
    // backgroundColor: 'lightblue',
  },
  avatar: {
    // backgroundColor: 'pink',
    flex: .5
  },
  info: {
    // backgroundColor: 'green',
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    // backgroundColor: 'orange',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700'
  },
  description: {
    // backgroundColor: 'tomato'
  },
  descText: {
    fontSize: 16
  },
  condText: {
    fontWeight: '500'
  },
  condition: {
    // backgroundColor: 'lightblue',
    alignItems: 'flex-end'
  }
})