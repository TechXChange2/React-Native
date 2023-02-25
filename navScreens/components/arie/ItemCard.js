import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { Context } from '../../../globals/context.js'
import s3 from '../../../globals/s3Utils.js'

const ItemCard = ({item}) => {
  const {nav} = React.useContext(Context);
  const [itemImage, setItemImage] = React.useState();

  React.useEffect(() => {
    if(item) {
      s3.getItemImage(item)
      .then(res => setItemImage(res))
      .catch(err => console.error(err))
    }
  }, [])

//navigation.navigate('ItemDetail', {itemId})
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => nav.navigate('ItemDetails', {itemID: item.id})} style={styles.avatar}>
    {/* <Avatar.Image size={100} source={require('../../../assets/icon.png')} /> */}
        <Avatar.Image size={100} source={{ uri: itemImage}} />
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

export default ItemCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightblue',
    marginTop: 30,
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