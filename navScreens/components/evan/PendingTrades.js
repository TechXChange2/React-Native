import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Context } from '../../../globals/context.js';
import * as API from '../../API.js';
import { Switch } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Trade from './Trade.js';


const PendingTrades = () => {
  const {userData} = React.useContext(Context);

const [yourTrades, setYourTrades] = React.useState([]);
const [yourOffers, setYourOffers] = React.useState([]);
const [shownTrades, setShownTrades] = React.useState([]);
const [currentType, setCurrentType] = React.useState('trade'); //or "offer"
const [typeHTML, setTypeHTML] = React.useState('Showing Your Trades');
const [noTradeView, setNoTradeView] = React.useState({display: 'none'});
const [initialLoad, setInitialLoad] = React.useState(false);
const [switchVal, setSwitchVal] = React.useState(true);

React.useEffect(() => { //set HTML Text for TYPE
  var typeText = currentType === 'trade' ? 'Showing Your Trades' : 'Showing Your Offers';
  setTypeHTML(typeText);
}, [currentType]);
React.useEffect(() => { //set HTML Text for TYPE
  if(!shownTrades.length && initialLoad) {
    setNoTradeView({display: 'block'});
    // console.log('timeout')
  }
}, [shownTrades]);


React.useEffect(() => { //sets Trades
  // console.log('User Data in Pending Trades,', userData);
  if(userData.id) {
    getSetTrades();
  }
}, [userData])
React.useEffect(() => { //sets Trades
  // console.log('User Data in Pending Trades,', userData);
  if(userData.id) {
    getSetTrades();
  }
}, [])

React.useEffect(() => { //sets displayed Trades
  if(yourTrades.length || yourOffers.length) {
    if(currentType === 'trade' && yourTrades.length) {
      setShownTrades(yourTrades);
      setNoTradeView({display: 'none'});
    } else if(currentType === 'offer' && yourOffers.length) {
      setShownTrades(yourOffers);
      setNoTradeView({display: 'none'});
    }
  } else {
    setShownTrades([]);
  }
}, [yourTrades, yourOffers, currentType])


//First
const getSetTrades = () => {
  // console.log('userData ID', userData.id);
API.getAllInvolvedTrades(userData.id)
.then(res => {
  // console.log('res from getAllInvolvedTrades', res);
  var tempTrades = [];
  var tempOffers = [];
  var errTrades = [];
  res.data.forEach((trade, i) => {
    if(trade.proposer_id === userData.id) {
      tempTrades.push(trade);
    } else if(trade.receiver_id === userData.id) {
      tempOffers.push(trade);
    } else {
      errTrades.push(trade);
    }
  }); //end forEach
  setInitialLoad(true);
  setYourTrades(tempTrades);
  setYourOffers(tempOffers);

  // console.log('Trades\n', tempTrades);
  // console.log('Offers\n', tempOffers);
  if(errTrades.length) {console.log('error trades involved', errTrades)}
}) //Involved Trades set
.catch(err => {
  console.error('ERR in getAllInvolvedTrades', err);
})
};

const toggleTrade = () => {
  var type = currentType === 'trade' ? 'offer' : 'trade';
  setCurrentType(type);
}




  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headLeft}>
          <Switch value={switchVal} onValueChange={() => {setSwitchVal(!switchVal); toggleTrade()}} />
          <Text style={styles.headText}>{typeHTML}</Text>
        </View>
        {/* <RefreshIcon fontSize='inherit' onClick={e => {getSetTrades()}} className="refresh-trades"/> */}
        <TouchableOpacity style={styles.refresh} onPress={getSetTrades}>
          <Ionicons name='refresh-outline' size={40} color='#007AFF'/>
        </TouchableOpacity>
      </View>
      <View>
        {shownTrades.map((trade, i) => {
          // return <View key={i}><Text>I am a trade</Text></View>
          return <Trade i={i} key={trade.id} type={currentType} yourData={userData} trade={trade}/>
        })}
      </View>
      <View style={noTradeView}>
        <Text>
        Your Trades will show here..
        </Text>
      </View>
    </View>

  )
}

export default PendingTrades

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'lightblue',
    // height: 200,
    // marginVertical: 30
  },
  header: {
    // backgroundColor: 'grey',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headText: {
    // backgroundColor: 'blue',
    paddingTop: 5,
    fontSize: 18,
    color: 'white',
    justifyContent: 'center'
  },
  headLeft: {
    marginLeft: 10,
    marginVertical: 10,
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    display: 'inline-block'
  },
  refresh: {
    marginRight: 20,
    paddingTop: 5
  }

})