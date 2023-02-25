
//Amplidy S3 for image
import { Amplify, Storage, Auth } from 'aws-amplify';
import awsconfig from "../src/aws-exports.js";
Amplify.configure(awsconfig);

const downloadImage = async (imageKey) => {
  Auth.currentCredentials();
  const img = await Storage.get(imageKey);
  return img;
};

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

  fetchImageFromUri: async function(uri) {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
  },

  getProfilePic: async (userData) => {
      if(userData.thumbnail_url) {
        return userData.thumbnail_url;
      } else {
        // console.log('isloading?', isLoading);
        const profilePic = await downloadImage(userData.imageUri);
        return profilePic;
      }

  },
  getItemImage: async (itemData) => {
    if (itemData.thumbnail_url.indexOf('http') !== -1) {
      return itemData.thumbnail_url;
    } else {
      let itemImage = await downloadImage(itemData.thumbnail_url);
      return itemImage;
    }
  }


}