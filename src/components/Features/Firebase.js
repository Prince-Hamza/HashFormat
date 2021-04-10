import firebase from "firebase";

export class firebaseApi {
    
  Once = async (Ref) => {
    return firebase.database().ref(Ref).once('value')
  }

  On = (refString , Event , Method ) => {
    const ref = firebase.database().ref(refString)
    ref.on('child_added' , (res) => {
      Method(res.val())        
    })
  }

  Set = (param,info) => {
    firebase.database().ref(param).set(info)
  }

}




// firebase.database()
// .ref(`/ChatPlugin/Conversations/Messaging/${this.Key}`)
// .on("child_added", (res) => {
//   MsgsArray.push(res.val());
//   this.setState({ MsgsArray: MsgsArray, Complete: true });
//   // else this.CompLoad = false;
// });
