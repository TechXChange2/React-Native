import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Image, useWindowDimensions } from 'react-native';
import { Avatar } from 'react-native-paper'
// import { Button } from 'react-native-paper';
import React from 'react'
import * as API from '../../API.js';
import { Context } from '../../../globals/context.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import s3 from '../../../globals/s3Utils.js';


const Trade = ({yourData, i, type, trade}) => {
  const {nav, userData, isReady, setIsReady} = React.useContext(Context);
  const screenWidth = useWindowDimensions().width;
  const [thisTrade, setThisTrade] = React.useState({});
  const [theirData, setTheirData] = React.useState({});
  const [yourItem, setYourItem] = React.useState({});
  const [theirItem, setTheirItem] = React.useState({});

  const [yourImage, setYourImage] = React.useState();
  const [theirImage, setTheirImage] = React.useState();
  const [yourItemImage, setYourItemImage] = React.useState();
  const [theirItemImage, setTheirItemImage] = React.useState();

  const [btnDisabled, setBtnDisabled] = React.useState();
  const [btnContent, setBtnContent] = React.useState('');
  const [isTerminated, setIsTerminated] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  //set your image
  React.useEffect(() => { //start animation
    if(yourData) {
    s3.getProfilePic(yourData)
    .then(res => setYourImage(res))
    .catch(err => console.error(err))
    }
  }, []);
  React.useEffect(() => { //start animation
    if(theirData) {
      s3.getProfilePic(theirData)
      .then(res => setTheirImage(res))
      .catch(err => console.error(err))
    }
  }, [theirData]);
  React.useEffect(() => { //start animation
    if(yourItem) {
      s3.getItemImage(yourItem)
      .then(res => setYourItemImage(res))
      .catch(err => console.error(err))
    }
  }, [yourItem]);
  React.useEffect(() => { //start animation
    if(theirItem) {
      s3.getItemImage(theirItem)
      .then(res => setTheirItemImage(res))
      .catch(err => console.error(err))
    }
  }, [theirItem]);


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
    let readyObj = isReady;
    readyObj.trades = true;
    setIsReady(readyObj);
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
                  console.log('updated owners?');
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
        <View style={[{ aspectRatio: 1 }], [styles.imgBox, styles.imgBoxLeft]}>
          <View style={styles.yourPic}>
            <Avatar.Image size={45} source={{ uri: yourImage}} />
          </View>
          <TouchableOpacity onPress={() => nav.navigate('ItemDetails', {itemID: yourItem.id})}>
            <Image source={{uri: yourItemImage}} resizeMode="cover" style={[{ aspectRatio: 1}, styles.img]} />
          </TouchableOpacity>
        </View>
        <View style={styles.swapIcon}>
          <Ionicons name='swap-horizontal-outline' size={35} color='#007AFF'/>
        </View>
        <View style={[{ aspectRatio: 1 }], [styles.imgBox, styles.imgBoxRight]}>
          <View style={styles.theirPic}>
            <Avatar.Image size={45} source={{ url: theirData.thumbnail_url}} />
          </View>
          <TouchableOpacity onPress={() => nav.navigate('ItemDetails', {itemID: theirItem.id})}>
            <Image source={{uri: theirItemImage}} resizeMode="cover" style={[{ aspectRatio: 1}, styles.img]} />
          </TouchableOpacity>
        </View>
        {/* <Button icon="account-switch" buttonColor='#007AFF' mode="contained" onPress={() => console.log('Pressed')}>
          {btnContent}
        </Button> */}
      </View>
      { !btnDisabled ? (
        <View style={styles.btnBox}>
          <TouchableOpacity
          onPress={()=> {console.log('click'); updateTradeStatus()}}
          style={styles.btn}
          >
            <Text style={styles.btnText}>{btnContent}</Text>
            {/* <Text style={styles.btnText}>one two three four five six</Text> */}
            {/* <Text style={styles.btnText}>one two three four five six seven eight nine ten</Text> */}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.btnBox}>
          <TouchableWithoutFeedback
          style={styles.btn}
          disabled
          >
            {/* <Text style={styles.btnText}>{btnContent}</Text> */}
            <Text style={[styles.btnText, styles.disabled]}>{btnContent}</Text>
            {/* <Text style={styles.btnText}>one two three four five six seven eight nine ten</Text> */}
          </TouchableWithoutFeedback>
        </View>
      )
      }

    </View>
  )
}

export default Trade

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    // gap: 40,
    // backgroundColor: 'yellow',
  },
  theSwap: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center'
  },
  yourPic: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10
  },
  theirPic: {
    // backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: '100%',
    transform: [{translateX: -36}, {translateY: 0}],
    zIndex: 10
  },
  swapIcon: {
    justifyContent: 'center',
    marginHorizontal: -3
  },
  btnBox: {
    padding: 10,
    flex: .8,
    // backgroundColor: 'grey',
    justifyContent: 'center'
    // flexDirection: 'row'
  },
  btn: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  disabled: {
    color: 'grey'
  },
  imgBox: {
    // backgroundColor: 'blue',
    position: 'relative',
    overflow: 'hidden',
    paddingVertical: 30,
    paddingHorizontal: 2,
  },
  imgBoxLeft: {paddingLeft: 8},
  imgBoxRight: {paddingRight: 8},
  img: {
    height: 100,
    borderRadius: 20
  }

})