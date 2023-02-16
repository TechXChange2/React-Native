import axios from 'axios';
import { MY_IP, PORT } from '@env'
//all functions are promises, so "THEN-able"

 function axiosCall(method, endpoint, data) {
  const localIP = process.env.MY_IP;
  const port = process.env.PORT;
  const url = `http://${localIP}:${port}${endpoint}`;


  return new Promise((resolve, reject) => {
    axios({method, url, data })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      // console.error('Err HERE', err);
      reject(err);
    })
  })
}
//////////////////////////////////////////////////

export function getAllInvolvedTrades(userID) {
  return new Promise((resolve,reject) => {
    axiosCall('post', '/trades/involved', {userID})
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

export function createUser(userObj) {
  //console.log('TRADEOBJ: ', tradeObj)
  return new Promise((resolve,reject) => {
    axiosCall('post', '/users', userObj)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}
export function deleteUser(userEmail) {
  //console.log('TRADEOBJ: ', tradeObj)
  return new Promise((resolve,reject) => {
    axiosCall('delete', `/users?email=${userEmail}`)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

export function createTrade(tradeObj) {
  //console.log('TRADEOBJ: ', tradeObj)
  return new Promise((resolve,reject) => {
    axiosCall('post', '/trades', tradeObj)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

export function getItemFromID(itemID) {
  return new Promise((resolve,reject) => {
    axiosCall('get', `/item/${itemID}`)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

export function getItemsFromUserID(userID) {
  return new Promise((resolve,reject) => {
    axiosCall('get', `/items/user/${userID}`)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

export function insertDevice(userID, dataObj) {
  console.log('data obj in insert ', dataObj, userID);
  return new Promise((resolve,reject) => {
    axiosCall('post', `/item/insert/${userID}`, dataObj)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

export function getUserFromEmail(userEmail) {
  return new Promise((resolve,reject) => {
    axiosCall('get', `/users/user?email=${userEmail}`)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

export function updateOwners(userA, itemA, userB, itemB) {
  return new Promise((resolve,reject) => {
    axiosCall('put', `/update/owners/${userA}/${itemA}/${userB}/${itemB}`)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}
export function getTradeFromID(tradeID) {
  return new Promise((resolve,reject) => {
    axiosCall('get', `/trade/${tradeID}`)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}
export function getAllUsers() {
  return new Promise((resolve,reject) => {
    axiosCall('get', `/users/all`)
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

export function updateTradeFromID(tradeID, currentTradeStatus, isTerminate) {
  const statusList = ['proposed', 'approved', 'completed'];
  var newStatus = statusList[statusList.indexOf(currentTradeStatus) + 1];
  if(isTerminate) { newStatus = 'terminated'};
  return new Promise((resolve,reject) => {
    if(currentTradeStatus === 'completed' && !isTerminate) {
      resolve(currentTradeStatus);
      return;
    };

    axiosCall('put', `/trade/status/${tradeID}/${newStatus}`)
    .then(res => {
      resolve({message: 'successful', newStatus});
    })
    .catch(err => {
      reject(err);
    })
  })//end Promise
}

