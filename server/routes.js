const router = require('express').Router();
const {
  Users,
  Trades,
  Shared,
  Bookmarks,
  Search,
  Map,
} = require('./controllers');

router.get('/users/user', Users.getUser);
router.post('/users', Users.createUser);
router.delete('/users', Users.deleteUser);
router.get('/users/all', Users.getAllUsers);
router.get('/map', Map.getMap);

router.post('/trades/involved', Trades.getInvolvedTrades); //WORKING
router.put('/update/owners/:userA/:itemA/:userB/:itemB', Trades.updateOwners);//Working
router.get('/trade/:tradeID', Trades.getTradeFromID); //..........
router.get('/item/:itemID', Shared.getItemFromID); //WORKING
router.get('/items/user/:userID', Shared.getItemsFromUserID); //WORKING
router.post('/item/insert/:userID', Shared.insertDevice); //WORKING
router.put('/trade/status/:tradeID/:newStatus', Trades.updateTradeFromID); //WORKING
router.post('/trades', Trades.createNewTrade); //WORKING

// router.get('/users/userInfo', Users.getUserByID);


router.post('/bookmark', Bookmarks.saveBookmark);
router.get('/bookmarks/:userID', Bookmarks.getBookmarks);

router.get('/devices', Search.getAllDevices);

module.exports = router;
