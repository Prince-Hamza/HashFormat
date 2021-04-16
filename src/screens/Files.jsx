import React from 'react';
import Select from 'react-select'
import { Parse } from './Classes/Parse'
import SearchResults from './SearchResults'
import Container from './Container'
import TitleKeyWord from './TitleKeyWord'
import { firebaseApi } from '../components/Features/Firebase'
import '../App.css'
import LevelRestrict from './LevelRestrict';

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
            currentObject: [],
            Syntax: [],
            KeyWords: [],
            SeeAlsos: [],
            Class: ['Level Restriction'],
            EntryName: '',
            Description: "",
            newKey: '',
            newSyntax: '',
            newSA: ''
        }
        this.Data = []
        this.Resp = []
        this.Opts = []
        this.KeyWordsArray = []
    }

    componentDidMount = async () => {
        //  let info = Parser.readTextFile()

        let Info = await Fire.Once('/HashFormat/Entries')

        Info.forEach((Obj) => {
            let Item = Obj.val()
            Item.KeyWords.forEach((Word) => {

                let neobj = {
                    KeyWord: Word,
                    Info: Item
                }
                this.KeyWordsArray.push(neobj)
            })
            // this.Data.push(JSN)
        })

        // alert( JSON.stringify(this.KeyWordsArray[3]))


        this.setState({ Info: this.KeyWordsArray })
        Info = []
    }

    PreSet = () => {
        this.state.Info.forEach((Item) => {
            if (Item.Syntax !== "undefined" && Item.Syntax !== undefined) {
                let neobj = {
                    Syntax: Item.Syntax,
                    Info: Item
                }

                console.log(neobj)
                this.Resp.push(neobj)

            }
        })
        // alert("done")
        this.setState({ SearchResults: this.Resp })
        this.Resp = []
    }

    AutoComplete = (value) => {
        // @Info |item| (Item:string()) & ((Item.Syntax !== Nil)) @Item.Syntax |Sx| ((Sx != Nil))  ((Synx(0,val.length))) 

        this.state.Info.forEach((Item) => {
            console.log(JSON.stringify(Item))
            if (Item.KeyWord !== "undefined" && Item.KeyWord !== undefined) {
                // Item.KeyW.forEach((Synx) => {
                // if (Synx !== "undefined" && Synx !== undefined) {
                if (Item.KeyWord.substring(0, value.length) == value) {
                    let neobj = {
                        KeyWord: Item.KeyWord,
                        Info: Item
                    }
                    console.log(neobj)
                    this.Resp.push(neobj)
                }
                //}
                // })
                this.setState({ Info: this.Resp })
            }
        })
        // this.Resp = []
        // if (value == "") this.setState({ Info: [] })
    }




    InsertOption = (Obj) => {
        this.setState({
            EntryName: Obj.KeyWord,
            currentObject: Obj.Info,
            Options: Obj.Info.Syntax,
            KeyWords: Obj.Info.KeyWords,
            SeeAlsos: Obj.Info.SeeAlso,
            Class: Obj.Class
        })
    }

    Alert = (Item) => {
        alert(JSON.stringify(Item))
    }

    Save = () => {
        Fire.Set(`Pending/${this.state.currentObject.Id}`, this.state.currentObject)
    }

    AddSyntax = (paramList) => {

        // alert(paramList)

        // alert(this.state.newSyntax)

        if (!Array.isArray(paramList)) paramList = []


        if (Array.isArray(paramList)) {
            paramList.push(this.state.newSyntax)
            this.state.currentObject.Name = this.state.EntryName
            // alert(JSON.stringify(this.state.currentObject))
            this.setState({ currentObject: this.state.currentObject })
            this.setState({ Syntax: paramList })
            alert(this.state.newSyntax)
        }
        // alert(JSON.stringify(paramList))

    }

    AddKeyWord = (paramList) => {

        if (Array.isArray(paramList)) {
            paramList.push(this.state.newKey)
            this.state.currentObject.Name = this.state.EntryName
            // alert(JSON.stringify(this.state.currentObject))
            this.setState({ currentObject: this.state.currentObject })
            this.setState({ KeyWords: paramList })
        }
        // alert(JSON.stringify(paramList))

    }


    AddSeeAlso = (paramList) => {

        if (!Array.isArray(paramList)) paramList = []
        if (Array.isArray(paramList)) {
            paramList.push(this.state.newSA)
            this.state.currentObject.Name = this.state.EntryName
            this.setState({ currentObject: this.state.currentObject })
            this.setState({ SeeAlsos: paramList })
            // alert(this.state.newSyntax)
        }

    }

    Slice = (stateArray, newArray) => {
        this.setState({ [stateArray]: newArray })
        if (stateArray == 'KeyWords') this.state.currentObject.KeyWords = newArray
        if (stateArray == 'Syntax') this.state.currentObject.Syntax = newArray
        this.setState({ currentObject: this.state.currentObject })

        this.Save()
    }

    Mobi = () => {

        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        return isMobile;

    }

    SetSyntaxValue = (value) => {
        alert(value)
        this.setState({ newSyntax: value })
    }

    SetKeyValue = (value) => {
        this.setState({ newKey: value })
    }

    SetSeeAlsoValue = (value) => {
        this.setState({ SeeAlso: value })
    }

    render() {
        return (
            <div style={Styles.Main}>


                {/* <div className="mobiHeader">
<div className="Title" style={Styles.Title} >Entry name</div>
<button onClick={() => { this.Save() }} className="Button" id="Btn1" > Approve </button>
<button className="Button" id="Btn2" style={{ ...Styles.Button }} > Deny </button>
</div>

 */}





                <div>
                    <div style={Styles.textAreaContainer} >

                        <Select options={this.state.Menu} className={this.Mobi() ? "mobiSelect" : "Select"} />

                        <TitleKeyWord
                            SetValue={this.SetKeyValue}
                            currentObject={this.state.currentObject}
                            AddKeyWord={this.AddKeyWord}
                        />

                    </div>











                    <div style={{ ...Styles.textAreaContainer, left: Mobi() ? '0%' : '34%', top: Mobi() ? '145%' : '13%' }} >

                        <div style={{
                            ...Styles.Heading, width: '90%', marginTop: '7%', alignSelf: 'flex-start',
                            justifyContent: 'flex-start'
                        }}
                        > {this.state.Class !== 'undefined' ? this.state.Class[0] : 'Level Restrictions'} </div>


                        <LevelRestrict
                            AddSyntax={this.AddSyntax}
                            SetValue={this.SetSyntaxValue}
                            currentObject={this.state.currentObject}
                        />

                    </div>


                    {/* <div style={{ ...Styles.Heading, marginRight: '4.2%' }} >   Level Restrictions  </div>
 
 
 <input style={{ ...Styles.Heading, width: '40%', marginLeft: '2%', marginTop: '2%' }}
     placeholder={"New Syntax"} onChange={(e) => { this.setState({ newSyntax: e.target.value }) }} />
 
 
 <img onClick={() => { this.addSyntax(this.state.currentObject.Syntax, this.state['Options'], this.state.newSyntax) }} style={Styles.plusImage} alt="void" width="25px" height="25px"
     src="https://uc-emoji.azureedge.net/orig/ef/44c1af69ec5f274e1bc6f28367a410.png" />
 
  */}





                    <Container
                        Top={this.Mobi() ? 120 : 30}
                        Left={this.Mobi() ? 3 : 10}
                        Width={this.Mobi() ? 90 : 21.5}
                        Height={18}
                        Items={this.state.KeyWords} Slice={this.Slice}
                        ArrayName={'KeyWords'}
                    />




                    <Container
                        Top={this.Mobi() ? 165 : 30}
                        Left={this.Mobi() ? 3 : 34}
                        Width={this.Mobi() ? 90 : 21.5}
                        Height={18}
                        Items={this.state.Syntax} Slice={this.Slice}
                        ArrayName={'Options'}
                    />



                    <textarea type="text" style={Styles.DescriptionBox} value={this.state.currentObject.Description} />


                </div>


                <div className="mobiSearch" >

                    <input id="Search" placeholder="Search" onChange={(e) => { this.AutoComplete(e.target.value) }} />

                    <button className="Button" id="Btn3"  >New Entry</button>


                    <SearchResults
                        Top={this.Mobi() ? 20 : 30}
                        Left={this.Mobi() ? 10 : 60}
                        Width={this.Mobi() ? 80 : 18}
                        Height={this.Mobi() ? 60 : 50}
                        Items={this.state.Info}
                        addToOptions={this.InsertOption}
                    />

                </div>



                <input style={{
                    ...Styles.Heading,
                    position: 'absolute',
                    width: Mobi() ? '80%' : '18%',
                    top: Mobi() ? '220%' : "55%",
                    left: Mobi() ? '0%' : '31.5%',
                    marginLeft: '2%'
                }}
                    onChange={(e) => { this.setState({ newSA: e.target.value }) }}
                    placeholder={"Search"} />


                <img id="Plus"
                    onClick={() => { this.AddSeeAlso(this.state.currentObject.SeeAlso) }}

                    style={{
                        ...Styles.plusImage,
                        position: 'absolute',
                        left: Mobi() ? '89%' : '53.5%',
                        top: Mobi() ? '219.5%' : '52%'
                    }}
                    alt="void" width="25px" height="25px"
                    src="https://uc-emoji.azureedge.net/orig/ef/44c1af69ec5f274e1bc6f28367a410.png" />


                <Container id="SASearch"
                    Top={Mobi() ? 230 : 61.5}
                    Left={Mobi() ? 2 : 33.5}
                    Width={Mobi() ? 90 : 21.5}
                    Height={18}
                    Items={this.state.SeeAlsos}
                />

            </div>
        );
    }
}




const Mobi = () => {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile;
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
        top: Mobi() ? '105%' : '15%',
        left: Mobi() ? '0%' : "10%",
        width: Mobi() ? '100%' : '21%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'

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
        top: Mobi() ? '190%' : '55%',
        left: Mobi() ? '4%' : '10%',
        width: Mobi() ? '90%' : '21.5%',
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
        justifyContent: Mobi() ? 'flex-start' : 'center',
        alignItems: Mobi() ? 'flex-start' : 'center',
    },
    plusImage: {
        marginTop: '1.5%',
        cursor: 'pointer'
    }


})
