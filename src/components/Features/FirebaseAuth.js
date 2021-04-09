// import * as Google from 'expo-google-app-auth';
import firebase from 'firebase'
// import { Actions } from 'react-native-router-flux';


export class webAuth {

   EmailSignUp = (email,pass) => {EmailSignUp(email,pass)}

   EmailLogin = (email,pass) => {EmailLogin(email,pass)}

   AnonymousLogin = () => {AnonymousLogin()}

   // need Social Login See Firebase Docs

}


export class expoAuth {

   //expoLogin = (Auth) => {return expoLogin(Auth) }

   AnonymousLogin = () => { return AnonymousLogin() }

}

export class nativeAuth {

  AnonymousLogin = () => {AnonymousLogin()}

  // need Social Login : see 2oui

}














export const EmailSignUp = async (Email , Password) => {

  const response = await firebase.auth().createUserWithEmailAndPassword(Email, Password);
  const Id = response.user.uid
  console.log ('RESPONSE :: ' + Id);
  return Id
  
}



export const EmailLogin = async (Email , Password) => {   

 // alert(Email)

  try {

  
  const response = await firebase.auth().signInWithEmailAndPassword(Email, Password);
  const Id = response.user.uid
  console.log('Resp : ' + Id);
  return Id
  } catch (ex) {alert(ex)}
}


 const AnonymousLogin = async () => {

  const response = await firebase.auth().signInAnonymously();
  const Id = response.user.uid
  console.log('Resp : ' + Id);
  return Id

}





// export const expoLogin = async (Auth) => {  
//     try {
//      const result = await Google.logInAsync({
//          // Get From Expo Google Login Guide 
//        androidClientId: "80398670374-jrafsuu0fsmdf1mqfllq1pcmf2e6d5q9.apps.googleusercontent.com",
//       // iosClientId: YOUR_CLIENT_ID_HERE,
//        scopes: ['profile', 'email'],
//      });
 
//      if (result.type === 'success') {
      
//       //  const Auth = firebase.auth.FacebookAuthProvider
//        const credential = Auth.credential(result.idToken, result.accessToken);


//        return firebase.auth().signInWithCredential(credential)
//          .then(res => {
//            console.log(`Firebase :: social Login : Success , Data :: ${res}`);
//            return res
//          })         
        
 
//      }
//        else {
//        return { cancelled: true };
//      }
//    } catch (e) {
//      alert(e)
//      return { error: true };
//    }
//  }


//  export const AnonymousLogin = () => {

//  }

 

