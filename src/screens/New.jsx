import React from 'react';
import '../App.css'
import firebase from 'firebase/app'
import { Parse } from './Classes/Parse'
const Parser = new Parse('file:///D:/Software/React/web/infobase/src/screens/Classes/data.txt')

export default class Container extends React.Component {

    constructor() {
        super()
        this.state = {
            Syntax: "",
            RestrictCode: 1,
            Description: "",
            SeeAlso: "",
            EntryNum: 70000,
            Complete: false
        }
    }

    componentDidMount = () => {
        // firebase.database().ref('/HashFormat/Entries').once('value', (resp) => {
        //     let info = resp.val()
        //     this.setState({ EntryNum: info.length })
        // })
        this.scheme()
      //let i = Parser.getInfoAll()
    //   alert(JSON.stringify(i))
    }

    Update = () => {

        let Syntax = this.state.Syntax
        let Entry = `#${this.state.EntryNum}\n -${this.state.RestrictCode} ${Syntax} \n Syntax: ${Syntax[0]}\n${Syntax[1]}\n${this.state.Description}\n${this.state.SeeAlso}}`

        // firebase.database().ref('/HashFormat/Entries').push(Entry)

        // increment

        // alert(done)

    }

    getAbsRandom = () => {
        return Math.trunc(Math.random() * 100000 * 100000);
    }

    scheme = () => {

        let info = Parser.getInfoAll()

        // let EntryInfo = firebase.database().ref('/HashFormat/Entries/Info')

        info.forEach(item => {
            
            if (item.Syntax == undefined) item.Syntax = "undefined"
            if (item.RestrictCode == undefined) item.RestrictCode = "undefined"
            if (item.Description == undefined) item.Description = "undefined"
            if (item.SeeAlso == undefined) item.SeeAlso = "undefined"
            if (item.SeeAlso == undefined) item.SeeAlso = "undefined"


            let random = this.getAbsRandom()
            let Entries = firebase.database().ref('/HashFormat/Entries/' + random)

            Entries.set({
                KeyWords:item.KeyWords,
                Id: random,
                Syntax: item.Syntax,
                RestrictCode: item.RestrictCode,
                Description: item.Description,
                SeeAlso: item.SeeAlso
            })

        })

alert("success")


    }
    render() {
        return (
            <div style={Styles.Container}>
                <input placeholder={"Syntax"} onChange={(e) => { this.setState({ Syntax: e.target.value }) }} />
                <input placeholder={"RestrictCode e.g 1"} onChange={(e) => { this.setState({ RestrictCode: e.target.value }) }} />
                <input placeholder={"Description"} onChange={(e) => { this.setState({ Description: e.target.value }) }} />
                <input placeholder={"See Also"} onChange={(e) => { this.setState({ SeeAlso: e.target.value }) }} />

                <br></br>

                <button className="Button" style={{ top: '48%', cursor: "pointer" }}
                    onClick={() => { this.Update() }} >

                    Submit </button>
            </div>
        );
    }
}



let Styles = ({
    Container: {
        height: '500px',
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center', /* Vertical */
        justifyContent: 'center', /* Horizontal */
    },
    Item: {
        width: '100%',
        height: '20%',
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "black",
        display: 'flex',
        alignItems: 'center', /* Vertical */
        justifyContent: 'flex-start', /* Horizontal */

    }

})
