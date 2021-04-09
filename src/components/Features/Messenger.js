import * as firebase from "firebase";

export class messengerApi {
  ChatRoomKey = (String1, String2) => {
    // get first elements

    let S1 = String1.charAt(0);
    let S2 = String2.charAt(0);

    // convert both to ascii

    let S1_Ascii = S1.charCodeAt(0);
    let S2_Ascii = S2.charCodeAt(0);

    // compare number
    var First, Key;
    if (S1_Ascii > S2_Ascii) {
      First = S1_Ascii;
      Key = String1 + String2;
    } else {
      First = S2_Ascii;
      Key = String2 + String1;
    }

    return Key;
  };

  updateHistory = (Input, conversationKey) => {
    let Me = firebase.auth().currentUser.uid, Exists = false;
    let Chat_History = firebase.database().ref(`/ChatPlugin/History/${Me}`);

    Chat_History.once("value", (resp) => {
    resp.forEach((res) => {
    let data = res.val();
    if (data.Conversation == Input.ConvoId) Exists = true;
    })

    if (!Exists) Chat_History.push({ Name: Input.Name, Photo: Input.Photo, Conversation: conversationKey });

    })
  }

  SendMessage = (Message) => {
    let Me = firebase.auth().currentUser.uid || "firebaseuid"
    firebase.database().ref(`/ChatPlugin/Conversations/Messaging/${Key}`)
    .push({ Id: Me, Message: Message })
  }
  
}












// const irzaEmails = () => {
//   let letters = ["A", "B", "C"],
//     counter = 0;

//   letters.forEach((i1) => {
//     letters.forEach((i2) => {
//       letters.forEach((i3) => {
//         counter++;
//         if (counter <= (letters.length * letters.length * letters.length) / 3) {
//           document.getElementById("demo").innerHTML += `${i1} ${i2} ${i3}__`;
//         }
//       });
//     });
//   });

//   document.getElementById("demo").innerHTML += `${counter}`;
// };
