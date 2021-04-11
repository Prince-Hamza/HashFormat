import React from 'react';
import Select from 'react-select'
import { Parse } from './Classes/Parse'
import SearchResults from './SearchResults'
import Container from './Container'
import { firebaseApi } from '../components/Features/Firebase'
import '../App.css'

const Fire = new firebaseApi()
const Parser = new Parse('file:///D:/Software/React/web/infobase/src/screens/Classes/data.txt')

export default class Admin extends React.Component {


    constructor() {
        super()
        this.state = {
            Info: [],
            SearchResults: [],
            Options: [],
            Menu: [{ value: 1, label: "Everyone" }],
            currentObject: [],
            KeyWords: [],
            SeeAlsos: [],
            Description: "",
            newKey: '',
            newSyntax: '',
            newSA: ''
        }
        this.Data = []
        this.Resp = []
        this.Opts = []
    }

    componentDidMount = async () => {

        // let Info = await Fire.Once('/HashFormat/Entries')

        // Info.forEach((item) => {
        //     let JSN = item.val()
        //     this.Data.push(JSN)
        // })

        // this.setState({ Info: this.Data })
        // this.Data = []; Info = []
        // console.clear()
        // this.PreSet()

    }

    Mobi = () => {

        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        return isMobile;

    }


    render() {
        return (
            <div style={Styles.Main}>


                <div className="mobiHeader">
                    <div className="Title" style={Styles.Title} >Dice</div>
                    <button onClick={() => { this.Save() }} className="Button" id="Btn1" > Save </button>
                    <button className="Button" id="Btn2" style={{ ...Styles.Button }} > Revert </button>
                </div>



                <div>
                    <div style={{ ...Styles.textAreaContainer ,
                         width : this.Mobi() ? '100%' : '45%'  , top: this.Mobi() ? '105%' : '15%' ,
                        }}
                         >


                        <Select options={this.state.Menu} className={ this.Mobi() ? "mobiSelect" : "Select"} />


                        <div id = {this.Mobi ? 'mobiLR' : 'void' } 
                        style={{ ...Styles.Heading, marginRight: '4.2%' , width:this.Mobi ? '85%':'42%' }}
                         >   Level Restrictions  </div>

                        <input
                        id = {this.Mobi ? 'nKey' : 'void'}
                        style={{ ...Styles.Heading, marginLeft: '0%', marginTop: '2%', marginRight: "0.5%" }}
                            placeholder='New Keyword' onChange={(e) => { this.setState({ newKey: e.target.value }) }} />

                        <img
                            id = {this.Mobi ? 'plus1' : 'void'}
                            onClick={() => { this.addSyntax(this.state.currentObject.KeyWords, this.state['KeyWords'], this.state.newKey) }}
                            style={Styles.plusImage} alt="void" width="25px" height="25px"
                            src="https://uc-emoji.azureedge.net/orig/ef/44c1af69ec5f274e1bc6f28367a410.png" />


                        <input style={{ ...Styles.Heading, width: '40%', marginLeft: '2%', marginTop: '2%' }}
                            placeholder={"New Syntax"} onChange={(e) => { this.setState({ newSyntax: e.target.value }) }} />


                        <img onClick={() => { this.addSyntax(this.state.currentObject.Syntax, this.state['Options'], this.state.newSyntax) }} style={Styles.plusImage} alt="void" width="25px" height="25px"
                            src="https://uc-emoji.azureedge.net/orig/ef/44c1af69ec5f274e1bc6f28367a410.png" />



                    </div>



                    <Container Top={ this.Mobi() ? 130 : 30} 
                    Left={10} Width={21.5} Height={18} Items={this.state.KeyWords} Slice={this.Slice}
                        ArrayName={'KeyWords'}
                    />




                    <Container Top={30} Left={33.5} Width={21.5} Height={18} Items={this.state.Options} Slice={this.Slice}
                        ArrayName={'Options'}
                    />



                    {/* <textarea type="text" style={Styles.DescriptionBox} value={this.state.currentObject.Description} /> */}


                </div>


                <div className="mobiSearch" >

                    <input id="Search" placeholder="Search" onChange={(e) => { this.AutoComplete(e.target.value) }} />

                    <button className="Button" id="Btn3"  >New Entry</button>


                    <SearchResults
                        Top={30}
                        Left= {this.Mobi() ? 10 : 60}
                        Width={this.Mobi() ? 83 : 18}
                        Height={this.Mobi() ? 60 : 50}
                        Items={this.state.SearchResults}
                        addToOptions={this.InsertOption}
                    />

                </div>

                {/* 
                <Container id="SASearch" Top={61.5} Left={33.5} Width={21.5} Height={18} Items={this.state.SeeAlsos} />

                <input style={{ ...Styles.Heading, width: '18%', position: 'absolute', top: "55%", left: '31.5%', marginLeft: '2%' }}
                    onChange={(e) => { this.setState({ newSA: e.target.value }) }}
                    placeholder={"Search"} />


                <img id="Plus"
                    onClick={() => { this.addSyntax(this.state.currentObject.SeeAlso, this.state['SeeAlsos'], this.state.newSA) }}

                    style={{ ...Styles.plusImage, position: 'absolute', left: '53.5%', top: '52%' }}
                    alt="void" width="25px" height="25px"
                    src="https://uc-emoji.azureedge.net/orig/ef/44c1af69ec5f274e1bc6f28367a410.png" /> */}



            </div>
        );
    }
}



let Styles = ({

    Main: {
        position: "absolute",
        top: '0%',
        left: '0%',
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
        font: 'italic 16px times new roman',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-Start'
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
