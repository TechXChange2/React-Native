import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import React from 'react'
import { getBookmarksFromUserId, getItemFromID } from '../../API.js';
import { Context } from '../../../globals/context.js';
import Item from './Item.js'

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = React.useState();
  const {userData} = React.useContext(Context);


  React.useEffect(() => {
    getBookmarksFromUserId(userData.id)
    .then(res => {
      console.log('Bookmarks: ', res.data);
      var promiseArr = [];
      //go through array
      res.data.forEach(item => {
        promiseArr.push(getItemFromID(item.item_id))
      })//FOR EACH END
      Promise.all(promiseArr)
      .then(items => {
        var tempArr = [];
        items.forEach(item => tempArr.push(item.data[0]));
        // console.log('Book Items: ', tempArr);
        setBookmarks(tempArr);
      })
      .catch(err => console.warn('error in getting bookmarked items'))
      //get item from id
      //.then(push to array)
      //for each, add to array of items
      // setBookmarks(items);
    })
    .catch(err => {
      console.warn('getItemsFromUserId error in YourItems', err);
    })
  }, [])

  if(!bookmarks) {
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

  if(!bookmarks.length) {
    return (
      <View style={styles.container}>
        <Text>You have no Bookmarks yet.. Add one!</Text>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>Your Bookmarks</Text>

      </View>
      {bookmarks.map((item, i) => {
        return <View key={item.id} style={styles.item}><Item isYours={false} item={item}/></View>
      })}
    </View>
  )
}

export default Bookmarks

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