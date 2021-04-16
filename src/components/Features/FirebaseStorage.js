
export class FirebaseStorage {
    UrlToBlob = (localUrl) => {
   
    }

    uploadBlob = (ref , file) => {
        ref.put(file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            
         });           
    }
}