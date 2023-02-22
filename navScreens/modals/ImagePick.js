import Auth from "@aws-amplify/auth";
// import Amplify from "@aws-amplify/core";
// import Storage from "@aws-amplify/storage";
import * as Clipboard from "expo-clipboard";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Avatar } from 'react-native-paper';


import { Amplify, Storage } from 'aws-amplify';
// import awsconfig from "../../src/aws-exports.js";
// Amplify.configure(awsconfig);

export default function ImagePick1({navigation}) {
  const [phoneUri, setPhoneUri] = useState(null);
  // const [afterSelection, setAfterSelection] = useState(false);

  //GET OS PERMISSIONS
  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          alert("Sorry, we need these permissions to make this work!");
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    handleImagePicked(result);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(result);
  };

  const handleImagePicked = async (pickedImage) => {
    try {
      if (pickedImage.canceled) {
        alert("Upload cancelled");
        return;
      } else {
        // console.log('phone uri: ', pickedImage.assets[0].uri)
        setPhoneUri(pickedImage.assets[0].uri);
        // setAfterSelection(true);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile Picture</Text>

      {phoneUri && (
        <View>
          <Avatar.Image size={200} source={{uri: phoneUri}} />
        </View>
      )}
      <View style={styles.buttons}>
      { phoneUri ? (
        <Button onPress={() => navigation.navigate('RegisterScreen', {phoneUri})} title="Return to Register with Image" />
      ) : (
        <>
        <Button onPress={pickImage} title="Pick an image from camera roll" />
        <Button onPress={takePhoto} title="Take a photo" />
        </>
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  buttons: {
    paddingTop: 20
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    marginHorizontal: 15,
  },
  percentage: {
    marginBottom: 10,
  },
  result: {
    paddingTop: 5,
  },
  info: {
    textAlign: "center",
    marginBottom: 20,
  },
});
