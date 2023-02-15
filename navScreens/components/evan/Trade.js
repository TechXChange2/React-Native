import { StyleSheet, Text, TouchableOpacity, View, Image, useWindowDimensions } from 'react-native'
// import { Button } from 'react-native-paper';
import React from 'react'
import * as API from '../../API.js';
import { Context } from '../../../globals/context.js';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Trade = ({yourData, i, type, trade}) => {
  const {nav, userData} = React.useContext(Context);
  const screenWidth = useWindowDimensions().width;
  const [thisTrade, setThisTrade] = React.useState({});
  const [theirData, setTheirData] = React.useState({});
  const [yourItem, setYourItem] = React.useState({});
  const [theirItem, setTheirItem] = React.useState({});

  const [btnDisabled, setBtnDisabled] = React.useState();
  const [btnContent, setBtnContent] = React.useState('');
  const [isTerminated, setIsTerminated] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => { //start animation
    setTimeout(() => {
      setIsMounted(true);
    }, (70 * (2*i)));
  }, []);

  React.useEffect(() => { //set btnContent
    if(['Pend','Comp','Term', 'You ', 'Sorr'].includes(btnContent.slice(0,4))) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [btnContent]);

  React.useEffect(() => { //update this trade
    if(trade) {
      setThisTrade(trade);
    }
  }, [trade]);

  React.useEffect(() => { //set Btn content
    //update BUTTON
    if(thisTrade.status && !isTerminated) {
      if(thisTrade.status === 'proposed' && type === 'trade') {
        setBtnContent('Pending Approval..');
      } else if (thisTrade.status === 'proposed' && type === 'offer') {
        setBtnContent('APPROVE');
      } else if (thisTrade.status === 'approved' && type === 'trade') {
        setBtnContent('ACCEPT');
      } else if(thisTrade.status === 'approved' && type === 'offer') {
        setBtnContent('Pending Accept..');
      } else if(thisTrade.status === 'terminated') {
        setBtnContent('Terminated');
      } else {
        setBtnContent('Completed');
      }
    }
  }, [thisTrade]);


  const updateTradeStatus = () => {
    //get your Item
    Promise.all([
      API.getItemFromID(yourItem.id),
      API.getItemFromID(theirItem.id)
    ]).then((values) => {

      var yourItemUpdate = values[0].data[0];
      var theirItemUpdate = values[1].data[0];
      // console.log('checking youre still owner->', yourItemUpdate.user_id, yourData.id);
      // console.log('checking theyre still owner->', theirItemUpdate.user_id, theirData.id);
     //first HANDLE mid-trade terminations
      if(yourItemUpdate.user_id !== yourData.id) {
        setBtnContent('You traded your item already..');
        setIsTerminated(true);
        updateStatus(true);
      } else if(theirItemUpdate.user_id !== theirData.id) {
        setBtnContent('Sorry they already traded their item..');
        setIsTerminated(true);
        updateStatus(true);
      } else {
        updateStatus(false);
      }//last ELSE

      })//end THEN
      .catch(err => {
      console.error(err);
      });
  };

  const updateStatus = (isTerminate = false) => {
    API.updateTradeFromID(thisTrade.id, thisTrade.status, isTerminate)
      .then(res => {
          API.getTradeFromID(thisTrade.id)
          .then(res => {
              setThisTrade(res.data[0]);
              if(res.data[0].status === 'completed') {
                API.updateOwners(yourData.id, yourItem.id, theirData.id, theirItem.id)
                .then(res => {
                  console.log('updated owners?', res);
                })
                .catch(err => {
                  console.error('error in updating owners..', err);
                })
              }
          })
          .catch(err => {
            console.error('err in updateTradeFromID, Trade.jsx\n', err);
          })
      })
      .catch(err => {
        console.error(err);
      })
  }

  const setTheirUserData = (userID) => {
    API.getUserFromId(userID)
    .then(res => {
      setTheirData(res.data[0]);
    })
    .catch(err => {
      console.error('err in getUserFromID, Trade.js\n', err);
    })
  };

  const getSetItem = (itemID, who) => {
  API.getItemFromID(itemID)
  .then(res => {
    if(type === 'trade' && who === 'proposer') {
      setYourItem(res.data[0]);
      setTheirUserData(trade.receiver_id);
    } else if(type === 'trade' && who === 'receiver') {
      setTheirItem(res.data[0]);
    } else if(type === 'offer' && who === 'proposer') {
      setTheirItem(res.data[0]);
      setTheirUserData(trade.proposer_id);
    } else if(type === 'offer' && who === 'receiver') {
      setYourItem(res.data[0]);
    }
  })
  .catch(err => {
    console.error('ERR in getItemFromUserId\n', err);
  })
};

React.useEffect(() => {
 if(thisTrade.id) {
  getSetItem(thisTrade.proposer_device_id, 'proposer');
  getSetItem(thisTrade.receiver_device_id, 'receiver');
 }
}, [thisTrade])

const rerouteToItem = (item) => {
  nav.navigate('ItemDetails', {itemId: item.id})
};



///////////////////////////////////////////////////////////
  return (
    <View style={[{maxWidth: screenWidth}, styles.container]}>

      <View style={styles.theSwap}>
        <View style={[{ aspectRatio: 1 }], styles.imgBox}>
          <Image source={{uri: yourItem.thumbnail_url}} resizeMode="cover" style={[{ aspectRatio: 1}, styles.img]} />
        </View>
        <View style={styles.swapIcon}>
          <Ionicons name='swap-horizontal-outline' size={40} color='#007AFF'/>
        </View>
        <View style={[{ aspectRatio: 1 }], styles.imgBox}>
          <Image source={{uri: theirItem.thumbnail_url}} resizeMode="cover" style={[{ aspectRatio: 1}, styles.img]} />
        </View>
        {/* <Button icon="account-switch" buttonColor='#007AFF' mode="contained" onPress={() => console.log('Pressed')}>
          {btnContent}
        </Button> */}
      </View>
      <View style={styles.btnBox}>
        <TouchableOpacity
        touchableWithoutFeedback
        onPress={()=> console.log('click')}
        >
          <Text style={styles.btnText}>{btnContent}</Text>
          {/* <Text style={styles.btnText}>one two three four five six</Text> */}
        </TouchableOpacity>
      </View>

      {/* <Text>Trade Item with id: {}</Text> */}
    </View>
  )
}

export default Trade

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    // gap: 40,
    backgroundColor: 'yellow',
    marginVertical: 10,
  },
  theSwap: {
    flexDirection: 'row',
    flex: 2
  },
  swapIcon: {
    justifyContent: 'center'
  },
  btnBox: {
    padding: 10,
    flex: .8,
    // backgroundColor: 'grey',
    justifyContent: 'center'
    // flexDirection: 'row'
  },
  btnText: {
    textAlign: 'center',
    color: '#007AFF'
  },
  imgBox: {
    // borderRadius: 20,
    overflow: 'hidden',
  },
  img: {
    height: 100,
    borderRadius: 20
  }

})