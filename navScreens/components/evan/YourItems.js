import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import React from 'react'
import Item from './Item.js';
import { getItemsFromUserID } from '../../API.js';
import { Context } from '../../../globals/context.js';

const YourItems = () => {
  const [itemList, setItemList] = React.useState([]);
  const {userData} = React.useContext(Context);


  React.useEffect(() => {
    getItemsFromUserID(userData.id)
    .then(res => {
      // console.log('Items: ', res.data)
      setItemList(res.data);
    })
    .catch(err => {
      console.warn('getItemsFromUserId error in YourItems', err);
    })
  }, [])

  if(!itemList.length) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
        animating={true}
        color='blue'
        // color={MD2Colors.red800}
        size='large'
        />
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>Your Items</Text>

      </View>
      {itemList.map((item, i) => {
        return <View key={item.id} style={styles.item}><Item item={item}/></View>
      })}
    </View>
  )
}

export default YourItems

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'silver',
    // height: 200,
    marginVertical: 30,
    paddingBottom: 30
  },
  item: {
    marginVertical: 5,
    paddingHorizontal: 15
  },
  header: {
    marginVertical: 12,
    paddingLeft: 20
  },
  headerText: {
    fontSize: 24
  }
})