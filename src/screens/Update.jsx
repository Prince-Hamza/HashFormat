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
    }

    componentDidMount = async () => {

        let Info = await Fire.Once('/HashFormat/Entries')

        Info.forEach((item) => {
            let JSN = item.val()
            this.Data.push(JSN)
        })

        this.setState({ Info: this.Data })
        this.Data = []; Info = []
        // console.clear()
    }

    render() {
        return (
            <div>
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
            </div>
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
