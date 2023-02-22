
//Amplidy S3 for image
import { Amplify, Storage, Auth } from 'aws-amplify';
import awsconfig from "../src/aws-exports.js";
Amplify.configure(awsconfig);


export default {

  uploadImage: (filename, img2) => {
    Auth.currentCredentials();
    return Storage.put(filename, img2, {
      level: "public",
      contentType: "image/jpeg"
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        console.log('UploadImg Error: ', error);
        return error;
      });
  },

  downloadImage: async (imageKey) => {
    Auth.currentCredentials();
    const img = await Storage.get(imageKey);
    return img;
  },

  fetchImageFromUri: async function(uri) {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
  }


}