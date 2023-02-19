# React-Native
A React Native mobile app to trade Electronic items with other users

### To setup with Amplify Aws + S3 (for profile pic image upload)
Amplify is Amazon's full stack project manager. It will make it easier to add and create to an S3 bucket

1. Run `npm install -g @aws-amplify/cli` to install Amplify CLI
2. Run `amplify configure` (will prompt you to create an AWS iam user in the browswer)
2. Run `amplify init` to initilise a new Amplify project in your app
  - choose profile to connect to the iam User you just made
  - an amplify folder in your project will appear
3. Run `amplify add storage` (make sure to setup with Auth)
3. Run `amplify push` to deploy the Storage and Auth resources in Aws Amplify project
4. Put the following configuration in your App's root file:

###### Amplify + S3 config for app

```
import { Amplify } from 'aws-amplify';
import awsconfig from "./src/aws-exports.js";
Amplify.configure(awsconfig);
```
