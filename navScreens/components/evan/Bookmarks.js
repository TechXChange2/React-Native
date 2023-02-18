import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import React from 'react'
import { useIsFocused } from '@react-navigation/native'
import { getBookmarksFromUserId, getItemFromID } from '../../API.js';
import { Context } from '../../../globals/context.js';
import Item from './Item.js'
import NoItems from './NoItems.js'

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = React.useState();
  const [firstMount, setFirstMount] = React.useState(true);
  const {userData, isReady, setIsReady, setBookmarksArr} = React.useContext(Context);
  const isFocused = useIsFocused();

  function getSetBookmarks() {
    getBookmarksFromUserId(userData.id)
    .then(res => {
      // console.log('Bookmarks: ', res.data);
      var promiseArr = [];
      let itemIds = [];
      //go through array
      res.data.forEach(item => {
        itemIds.push(item.item_id)
        promiseArr.push(getItemFromID(item.item_id))
      })//FOR EACH END
      setBookmarksArr(itemIds);
      Promise.all(promiseArr)
      .then(items => {
        var tempArr = [];
        items.forEach(item => tempArr.push(item.data[0]));
        // console.log('Book Items: ', tempArr);
        setBookmarks(tempArr);
      })
      .catch(err => console.warn('error in getting bookmarked items'))
    })
    .catch(err => {
      console.warn('getItemsFromUserId error in YourItems', err);
    })
  }

    React.useEffect(() => {
      getSetBookmarks();
      setFirstMount(false)
    }, [])

  if(isFocused && isReady.bookmarks && !firstMount) {
    //getSet your bookmarks
    console.log('isFocused Bookmarks CALLED');
    getSetBookmarks();
    // reset isReady.yourItems to false
    let readyObj = isReady;
    readyObj.bookmarks = false;
    setIsReady(readyObj);
  }


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
    return <NoItems textHeader='Your Bookmarks' text='bookmarks'/>
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
    minHeight: 150,
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