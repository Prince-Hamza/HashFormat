import * as axios from "axios";
//const GAPSUri = `https://script.google.com/macros/s/AKfycbzToTyB5iHw7ZycnscFQajhkKu2qqlHjZvXwZCcuAfsnlBCGOXmiHTS/exec`

export class SpreadSheetApi {

  constructor(Uri) {
    this.GAPSUri = Uri;
  }

  readRange = async () => {
       return await axios.get(this.GAPSUri, {
        params: { Method: "readRange" },
      })
      .then((res) => {
        let info = res.data;
        let Stringjs = `[${info}]`
        return JSON.parse(Stringjs)
    })
  }


  readFirebase = async (firePath) => {
    return await axios.get(this.GAPSUri, {
     params: { Method: "Read" , Path: firePath }
   })
   .then((res) => {
     return res.data;
    //  let Stringjs = `[${info}]`
    //  return JSON.parse(Stringjs)
 })
}


  sendEmail = (emailAddress, Message, Subject) => {
    return axios.get(this.GAPSUri, {
        params: { Method:'Email' , Email: emailAddress, Message: Message, Subject: Subject },
      })
      .then((res) => {
        alert("Email Sent Successfully")
        // let info = res.data;
        // var myObj = JSON.parse(res.data);

      })
  };

}
