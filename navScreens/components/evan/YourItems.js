import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import React from 'react'
import Item from './Item.js';
import { getItemsFromUserID } from '../../API.js';
import { Context } from '../../../globals/context.js';
import Ionicons from 'react-native-vector-icons/Ionicons';


const YourItems = () => {
  const [itemList, setItemList] = React.useState(undefined);
  const {userData, nav} = React.useContext(Context);


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

  if(!itemList) {
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

  if(!itemList.length) {
    return (
      <View style={styles.container}>
        <Text>You have no items yet.. Add one!</Text>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>Your Items</Text>
        </View>
        <TouchableOpacity
        onPress={() => nav.navigate('AddItem')}
        >
          <Ionicons name='add-outline' size={40} color='#007AFF'/>
        </TouchableOpacity>
      </View>
      {itemList.map((item, i) => {
        return <View key={item.id} style={styles.item}><Item isYours={true} item={item}/></View>
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
    // backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 20
  },
  headerTextBox: {
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 24
  }
})