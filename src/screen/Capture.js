import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import base64 from 'react-native-base64'
import * as FileSystem from 'expo-file-system';
import { BASE_URL } from "../axios/Api";


export default function Add({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [agree, setAgree] = useState(false);
  const [ddata, setData] = useState([]);


  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === 'granted');


    if (
     
      cameraPermission.status !== 'granted'
    ) {
      alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
    permisionFunction();
    matchFace();
  }, []);

  const takePicture = async () => {
   
    if (camera) {
      const data = await camera.takePictureAsync(null);
      const base64y = await FileSystem.readAsStringAsync(data.uri, { encoding: 'base64' });    
      setImageUri(base64y);
      setTimeout(() => {
        // this.sound.playAsync(); //play the audio
        chchhchhc();
      }, 3000); //wait for 3 sec
      
     
    }
  };

  const matchFace = () => {
  // alert(2)
    fetch(BASE_URL + "/loginface.php", {
      method: 'GET',
      })
      .then((response) => response.json())
      .then((responseJson) => {
      //  console.log(responseJson)
        setData(responseJson) 
      
      })
      .catch((error) => {
        console.error(error);
      });

  }
const chchhchhc = (i)=>{
  let imageData = "data:image/jpeg;base64,"+ddata.value[i]
  let imageData1 = "data:image/jpeg;base64,"+imageUri


  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Host': 'face-verification2.p.rapidapi.com',
      'X-RapidAPI-Key': '1d15958018mshe1ad6a8c286b568p147655jsnfe4a28991ade'
    },
    body: new URLSearchParams({linkFile1:imageData, linkFile2: imageData1})
  };
  
  fetch('https://face-verification2.p.rapidapi.com/faceverification', options)
    .then(response => response.json())
    .then(response => 
      console.log(response)
      )
    .catch(err => console.error(err));

 


}
  const checkface =() =>{
    if(ddata !== null){
      for(let i=0;i<ddata.length;i++){
        chchhchhc(i);
//       let imageData = "data:image/jpeg;base64,"+ddata[i]
//       let imageData1 = "data:image/jpeg;base64,"+imageUri

// console.log(i)
//         const options = {
//           method: 'POST',
//           headers: {
//             'content-type': 'application/x-www-form-urlencoded',
//             'X-RapidAPI-Host': 'face-verification2.p.rapidapi.com',
//             'X-RapidAPI-Key': '1d15958018mshe1ad6a8c286b568p147655jsnfe4a28991ade'
//           },
//           body: new URLSearchParams({linkFile1:imageData, linkFile2: imageData1})
//         };
        
//         fetch('https://face-verification2.p.rapidapi.com/faceverification', options)
//           .then(response => response.json())
//           .then(response => 
//             console.log(response)
//             )
//           .catch(err => console.error(err));

//           if(a.length - 1 === i) {
//             console.log('loop ends');
//           }
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
       
      </View>

      <Button title={'Take Picture'} onPress={takePicture} />
      
      {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});