import React from 'react';
import { Parse } from './Classes/Parse'
import { firebaseApi } from '../components/Features/Firebase'
const Fire = new firebaseApi()
const Parser = new Parse('file:///D:/Software/React/web/infobase/src/screens/Classes/data.txt')


export default class Update extends React.Component {
    constructor() {
        super()
        this.state = {
            Info: []
        }
        this.Data = []
        this.SuperString = ``
    }

    componentDidMount = async () => {

        let Info = await Fire.Once('/HashFormat/Entries')

        Info.forEach((item) => {
            let JSN = item.val()
            this.Data.push(JSN)
        })

        // this.setState({ Info: this.Data })
        

        console.clear()
        this.prepString(this.Data)

    }

    // (( (Array) ((item - num) + num) fact ))           

   //  (( (Array) ($.Age <= arr2[n]) ? => Kids:[] ))           

    prepString = (Info) => {
        let count = 1;
        Info.forEach(item => {
            this.onEntry(item, count)
            count++
        })

        this.Download(this.SuperString)

    }

    onEntry = (Item , count) => {

        this.SuperString += `#${count}\n${Item.RestrictCode ? `-${Item.RestrictCode} ` : '' }`
        Item.KeyWords !== undefined &&
        Item.KeyWords !== 'undefined' && 
        Item.KeyWords.forEach((K)=>{  this.SuperString += K + ' '  })
        this.SuperString += '\n'
        Item.Syntax !== undefined &&
        Item.Syntax !== 'undefined' && 
        Item.Syntax.forEach((S)=>{  this.SuperString += 'Syntax: ' + S })
        this.SuperString += '\n'
        this.SuperString += Item.Description
        this.SuperString += '\n'
        this.SuperString += Item.SeeAlso = '\n \n'
        console.log(this.SuperString)

                
    }

    Download = (String) => {
        alert("DOWN")
        var link = document.createElement('a');
        link.download = 'data.txt';
        var blob = new Blob([String], { type: 'text/plain' });
        link.href = window.URL.createObjectURL(blob);
        link.click();
    }

    render() {
        return (
            <>
                <div>
                   {this.state.Info.map(Item => {
                        console.log(JSON.stringify(Item))
                        return (
                            <div key={Math.random()} style={Styles.Item}>


                                <div style={{ marginBottom: '1.5%' }} >

                                    {Item.KeyWords !== 'undefined' &&
                                        Item.KeyWords !== undefined &&
                                        Item.KeyWords.map(K => {
                                            return (
                                                <p> {K} </p>
                                            )
                                        })}

                                </div>



                                {/* <br></br> <br></br> <br></br> */}


                                <div style={{ marginTop: '1.5%' }} >
                                    {Item.Syntax !== undefined &&
                                        Item.Syntax !== 'undefined' &&
                                        Item.Syntax.map(S => {
                                            return (
                                                <p> Syntax: {S}  </p>
                                            )
                                        })}
                                </div>


                                <br></br> <br></br> <br></br>


                                <p> Description :  {Item.Description !== 'undefined' && Item.Description} </p>

                                <br></br>

                                <div style={{ marginTop: '1.5%' }} >
                                    {Item.SeeAlso !== undefined &&
                                        Item.SeeAlso !== 'undefined' &&
                                        Item.SeeAlso.map(S => {
                                            return (
                                                <p> See Also: {S}  </p>
                                            )
                                        })}
                                </div>



                                {/* <br></br><br></br>

                                <p> {Item.Syntax}  </p>

                                <br></br><br></br>



                                <br></br><br></br>


                                <p> {Item.SeeAlso}  </p> */}

                            </div>
                        )

                    })}
                </div>
            </>
        );
    }
}



let Styles = ({
    Container: {
        position: "absolute",
        display: 'flex',
        flexDirection: "column",
        alignItems: 'flex-start', /* Vertical */
        justifyContent: 'flex-start', /* Horizontal */
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "black",
        overflow: "scroll"

    },
    Item: {
        width: '100%',
        height: '30%',
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "black",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', /* Vertical */
        justifyContent: 'flex-start', /* Horizontal */

    }

})
