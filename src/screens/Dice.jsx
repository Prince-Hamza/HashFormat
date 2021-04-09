import React from 'react';
import Select from 'react-select'
import { Parse } from './Classes/Parse'
import SearchResults from './SearchResults'
import Container from './Container'
import { firebaseApi } from '../components/Features/Firebase'
import '../App.css'

const Fire = new firebaseApi()
const Parser = new Parse('file:///D:/Software/React/web/infobase/src/screens/Classes/data.txt')

export default class Dice extends React.Component {


    constructor() {
        super()
        this.state = {
            Info: [],
            SearchResults: [],
            Options: [],
            Menu: [{ value: 1, label: "Everyone" }],
            Description: "",
            currentObject: [],
            KeyWords: [],
            SeeAlsos: []
        }
        this.Data = []
        this.Resp = []
        this.Opts = []
    }

    componentDidMount = async () => {
        //  let info = Parser.readTextFile()

        let Info = await Fire.Once('/HashFormat/Entries')
        let infoPlus = 1

        Info.forEach((item) => {
            let JSN = item.val()
            this.Data.push(JSN)
        })

        this.setState({ Info: this.Data })
        this.Data = []; Info = []
        console.clear()

    }

    AutoComplete = (value) => {
        this.state.Info.forEach((Item) => {
            console.log(JSON.stringify(Item))
            if (Item.Syntax !== "undefined" && Item.Syntax !== undefined) {
                Item.Syntax.forEach((Synx) => {
                    if (Synx !== "undefined" && Synx !== undefined) {
                        if (Synx.substring(0, value.length) == value) {
                            let neobj = {
                                Syntax: Synx,
                                Info: Item
                            }
                            console.log(neobj)
                            this.Resp.push(neobj)
                        }
                    }
                })
                this.setState({ SearchResults: this.Resp })
            }
        })
        this.Resp = []
        if (value == "") this.setState({ SearchResults: [] })
    }




    InsertOption = (Obj) => {
        this.setState({
            currentObject: Obj.Info,
            Options: Obj.Info.Syntax,
            KeyWords: Obj.Info.KeyWords,
            SeeAlsos: Obj.Info.SeeAlso
        })
    }

    Alert = (Item) => {
        alert(JSON.stringify(Item))
    }

    Save = () => {
        alert(this.state.currentObject)
    }

    addSyntax = (paramList, State) => {

        if (Array.isArray(paramList)) {
            paramList.push("newItem")
            this.setState({ currentObject: this.state.currentObject })
            this.setState({ [State]: paramList })

        }
        // alert(JSON.stringify(paramList))

    }



    render() {
        return (
            <div style={Styles.Main}>


                {/* <div style={Styles.OverLayer} >
                    <input />
                    <button style = {Styles.Button}></button>
                </div>
                */}

                <div className="mobiHeader">
                    <div className="Title" style={Styles.Title} >Dice</div>
                    <button onClick={() => { this.Save() }} className="Button" id="Btn1" style={{ ...Styles.Button }} > Save </button>
                    <button className="Button" id="Btn2" style={{ ...Styles.Button }} > Revert </button>
                </div>



                <div className="mobiEnder" >
                    <div style={Styles.textAreaContainer} >

                        {/* <div> drop down </div> */}

                        {/* <input style={{ width: '46%', marginRight: '2%' }} /> */}

                        <Select options={this.state.Menu} className="Select" />


                        <div style={{ ...Styles.Heading, marginRight: '4.2%' }} >   Level Restrictions  </div>

                        <div style={{ ...Styles.Heading, marginLeft: '0%', marginTop: '2%', marginRight: "0.5%" }} > Syntax Options </div>

                        <img onClick={() => { this.addSyntax(this.state.currentObject.KeyWords, this.state['KeyWords']) }} style={Styles.plusImage} alt="void" width="25px" height="25px"
                            src="https://uc-emoji.azureedge.net/orig/ef/44c1af69ec5f274e1bc6f28367a410.png" />


                        <input style={{ ...Styles.Heading, width: '40%', marginLeft: '2%', marginTop: '2%' }}
                            placeholder={"Search"} />


                        <img onClick={() => { this.addSyntax(this.state.currentObject.Syntax, this.state['Options']) }} style={Styles.plusImage} alt="void" width="25px" height="25px"
                            src="https://uc-emoji.azureedge.net/orig/ef/44c1af69ec5f274e1bc6f28367a410.png" />



                    </div>

                    {this.state.showInput && <input />}


                    <Container Top={30} Left={10} Width={21.5} Height={18} Items={this.state.KeyWords} />




                    <Container Top={30} Left={33.5} Width={21.5} Height={18} Items={this.state.Options} Alert={this.Alert} />



                    <textarea type="text" style={Styles.DescriptionBox} value={this.state.currentObject.Description} />


                </div>


                <div className="mobiSearch" >

                    <input id="Search" placeholder="Search" onChange={(e) => { this.AutoComplete(e.target.value) }} />

                    <button className="Button" id="Btn3"  >New Entry</button>


                    <SearchResults
                        Top={30} Left={60} Width={18} Height={50} Items={this.state.SearchResults}
                        addToOptions={this.InsertOption}
                    />

                </div>


                <Container id="SASearch" Top={61.5} Left={33.5} Width={21.5} Height={18} Items={this.state.SeeAlsos} />
                <input style={{ ...Styles.Heading, width: '18%', position: 'absolute', top: "55%", left: '31.5%', marginLeft: '2%' }}
                    placeholder={"Search"} />


                <img id="Plus" onClick={() => { this.addSyntax(this.state.currentObject.SeeAlso, this.state['SeeAlsos']) }}
                    style={{ ...Styles.plusImage, position: 'absolute', left: '53.5%', top: '52%' }}
                    alt="void" width="25px" height="25px"
                    src="https://uc-emoji.azureedge.net/orig/ef/44c1af69ec5f274e1bc6f28367a410.png" />

            </div>
        );
    }
}


const selext = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

let Styles = ({

    Main: {
        position: "absolute",
        width: "100%",
        height: '100%',
        display: 'flex',
        alignItems: 'center', /* Vertical */
        justifyContent: 'center', /* Horizontal */
        backgroundColor: "white",
        zIndex: 0
    },


    Overlayer: {
        position: 'absolute',
        top: '0%',
        left: '0%',
        with: '100%',
        height: '100%',
        backgroundColor: 'black',
        zIndex: 1
    },

    textAreaContainer: {
        position: "absolute",
        top: "15%",
        left: "10%",
        width: '45%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    DropMenu: {
        width: "70%"
    },

    NewEntry: {
        position: 'absolute',
        top: '8%',
        left: '70%',
        height: '4.3%',
        width: "8%",
        backgroundColor: 'blue'

    },
    DescriptionBox: {
        position: 'absolute',
        top: '55%',
        left: '10%',
        width: '21.5%',
        height: '24%',
        font: 'italic 16px times new roman'
    },
    Heading: {
        backgroundColor: 'whitesmoke',
        borderStyle: 'solid',
        borderColor: 'lightgray',
        width: '42%',
        height: '18px',
        font: '12px tmes new roman',
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusImage: {
        marginTop: '1.5%',
        cursor: 'pointer'
    }


})
