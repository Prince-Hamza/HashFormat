// import React, { useState, useEffect } from 'react';
// import { Button, Image, View } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
// import * as MediaLibrary from 'expo-media-library';

// export default function ImagePickerExample() {
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     (async () => {
//       if (Constants.platform.ios) {
//         const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
//         if (status !== 'granted') {
//           alert('Sorry, we need camera roll permissions to make this work!');
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async () => {

// try {
//    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
//    var x = await MediaLibrary.getAssetsAsync()

//    var FirstUri = (x.assets[11].uri)
//   // alert(FirstUri)


// } catch(err){alert(err)}

//     // let result = await ImagePicker.launchImageLibraryAsync({
//     //   mediaTypes: ImagePicker.MediaTypeOptions.All,
//     //   allowsEditing: true,
//     //   aspect: [4, 3],
//     //   quality: 1,
//     // });

//     let result = ({
//       "cancelled":false,
//       "type":"image",
//       "uri": FirstUri.toString()
//     })

//    // alert(JSON.stringify(result));

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }

//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//     </View>
//   );
// }