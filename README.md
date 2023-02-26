# TechXChange
A React-Native mobile app designed to facilitate Electronic Device Trading.

## Authors

[Evan O'Shea](https://github.com/evanoshea21) \
[Aristotle Jalalianfard](https://github.com/n0kam1)\
[Erin Antoine](https://github.com/)\
[Kyle Robers](https://github.com/)

## Built With

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

## Product Overview

#### Highlighted Features

- Firebase Authentication used in tandem with MySql DB in order to login and retrieve user information
- React Native's Stack and Tab navigators implemented to manage user navigation
- Google Places API used to autocomplete user input (for Address) while registering
- AWS Amplify & S3 integrated to work with Expo-client ImagePicker component, so user can upload/take an image from their phone

<p align="center">
<img src="./assets/overview2.gif" height="600">
</p>


## Home Screen
Author: [Evan O'Shea](https://github.com/evanoshea21)

<img src="./assets/homescreen5.gif" height="600">

#### Optimization Feature
Global Context `isReady` was made to keep track of when user updates one of 3 lists (Items, Trades, Bookmarks). \
This limits when AJAX requests are made to only occur when updates are detected \
Object:
```js
const [isReady, setIsReady] = useState({
   yourItems: true,
   trades: true,
   bookmarks: true
})
```

**Examples:**
1. User adds a new device, hence new GET req for yourItems permitted.
2. User Bookmarks another item, hence new GET req for yourBookmarks permitted

#### Your Devices (items):

- Displays User's added devices
- Global Context `isReady` used to limits pull requests only when list changes (mentioned above)

#### Your Pending Trades (proposed & offered):

- 3 stage process for Devices being traded. Status is either Proposed, Approved, or Completed. This allows a proposer to Accept the trade, hence Confirming it once the recipient of the trade proposition Approves it.
- Global Context only pulls from trades if trade is proposed by user or refresh button is clicked
- Toggle Button allows user to change views, between trades they *Proposed* and trades they are *Offered*

#### Your Bookmarks:

- Uses Global context to ONLY pull from bookmarks after each time an item is bookmarked (reduces unnecessary AJAX requests)
- Items that are **Yours** cannot be bookmarked (bookmark button doesn't display)
- Items that are already bookmarked by you displays a disabled grey button

## Propose Trade Screen
Author: [Erin Antoine](https://github.com/)

<img src="./assets/proposeForm.gif" height="600">

#### Highlighted Features
- fill in

##### Subheading: (if you want to talk about a feature of the page/your work)

- notes
- notes

##### Subheading2: (another feature of page)

- notes
- notes


## Search Items Screen
Author: [Aristotle Jalalianfard](https://github.com/n0kam1)

<img src="./assets/search.gif" height="600">

#### Highlighted Features
- fill in

##### Subheading: (if you want to talk about a feature of the page/your work)

- notes
- notes

##### Subheading2: (another feature of page)

- notes
- notes

## Add Items Screen
Author: [Kyle Robers](https://github.com/)

<img src="./assets/addItem.gif" height="600">

#### Highlighted Features
- fill in

##### Subheading: (if you want to talk about a feature of the page/your work)

- notes
- notes

##### Subheading2: (another feature of page)

- notes
- notes
-------------------------------------------
### More Demo Clips

|         Login              |               Register (with Google Places Address AutoComplete)                    |        Trade Process   |
| :---------------------------------: | :----------------------------: | :-----------------------------------: |
| <img src="./assets/login.gif" height="400"> | <img src="./assets/register.gif" height="400"> | <img src="./assets/trade.gif" height="400">           |

## Getting Started

### Basic Setup
1. Clone repo
2. run `npm install`
3. Open terminal for expo client. Run `npm start`
4. Open terminal for node server (to communicate wit your db). Run `npm run server`

**To test with dummy data**

0. First, you must have mysql downloaded and running on your local machine
1. Open a new terminal and run `cd server/db`
2. Run following commands:
- `mysql -u [yourSqlUserName] -p [yourPassword] < schema.sql`
- `mysql -u [yourSqlUserName] -p [yourPassword] < seed.sql`

### To setup Firebase & Google Places API for Login/Reg functionality
**Firebase**
1. Create a firebase account
2. Add project > add Authentication > enable email-password login/signup > get web config file
3. Create a `.env` file and paste in your firebase values. Use the example config in repo
**Google Places**
1. Create a google cloud account and add billing
2. Get API for google places. Input into your config file

### To setup with Amplify Aws + S3 (for image uploads in profile)
Amplify is Amazon's full stack project manager. It will make it easier to add and connect to an S3 bucket for image storage

1. Run `npm install -g @aws-amplify/cli` to install Amplify CLI
2. Run `amplify configure` (will prompt you to create an AWS iam user in the browswer)
  - sign into aws account in browser
  - once signed in, return to terminal and press enter to finish config
3. Run `amplify init` to initilise a new Amplify project in your app
  - choose profile to connect to the local IAM User you just made
  - an amplify folder in your project will appear
4. Run `amplify add storage` (IMPORTANT: make sure to setup with "Auth + Guests" when asked; won't work otherwise)
5. Run `amplify push` to deploy the Storage and Auth resources in Aws Amplify project
6. You should see a `src` directory appear with file named `aws-exports.js`. Is should display your s3 bucket information if done correctly.

If done correctly you can start the app and add/take pictures from your local device.

