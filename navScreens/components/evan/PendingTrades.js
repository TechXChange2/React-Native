import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Context } from '../../../globals/context.js';
import { getAllInvolvedTrades } from '../../API.js';
import { Switch } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Trade from './Trade.js';
import NoItems from './NoItems.js'



const PendingTrades = () => {
  const {userData} = React.useContext(Context);
//your trades, your offers,


const [yourTrades, setYourTrades] = React.useState([]);
const [yourOffers, setYourOffers] = React.useState([]);
// const [shownTrades, setShownTrades] = React.useState([]);
const [currentType, setCurrentType] = React.useState('trade'); //or "offer"
const [typeHTML, setTypeHTML] = React.useState('Showing Your Trades');
const [noTradeView, setNoTradeView] = React.useState({display: 'none'});
const [initialLoad, setInitialLoad] = React.useState(false);
const [switchVal, setSwitchVal] = React.useState(true);


React.useEffect(() => { //sets Trades
  if(userData.id) {
    getSetTrades();
  }
}, [])

const getSetTrades = () => {
  console.log('getset called');
getAllInvolvedTrades(userData.id)
.then(res => {
  console.log('Your Trades fired');
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

React.useEffect(() => { //Set Text
  var typeText = currentType === 'trade' ? 'Showing Your Trades' : 'Showing Your Offers';
  setTypeHTML(typeText);
}, [currentType])

const toggleTrade = () => { //Set Type
  var type = currentType === 'trade' ? 'offer' : 'trade';
  setCurrentType(type);
}


if(!yourTrades.length && !yourOffers.length) {
  return <NoItems textHeader='Your Trades' text='trades'/>
}

return (

    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headLeft}>
          <Switch value={switchVal} color='#007AFF' onValueChange={() => {setSwitchVal(!switchVal); toggleTrade()}} />
          <Text style={styles.headText}>{typeHTML}</Text>
        </View>
        {/* <RefreshIcon fontSize='inherit' onClick={e => {getSetTrades()}} className="refresh-trades"/> */}
        <TouchableOpacity style={styles.refresh} onPress={getSetTrades}>
          <Ionicons name='refresh-outline' size={40} color='#007AFF'/>
        </TouchableOpacity>
      </View>
      <View>

        { currentType === 'trade' ? (
          yourTrades.map((trade, i) => {
            return <Trade i={i} key={trade.id} type={currentType} yourData={userData} trade={trade}/>
          })
        ) : (
          yourOffers.map((trade, i) => {
            return <Trade i={i} key={trade.id} type={currentType} yourData={userData} trade={trade}/>
          })
        )}
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
    minHeight: 150
    // flex: 1,
    // backgroundColor: 'lightblue',
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
    color: '#007AFF',
    justifyContent: 'center'
  },
  headLeft: {
    marginLeft: 30,
    marginVertical: 10,
    width: '65%',
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