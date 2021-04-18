import React from 'react';
import Select from 'react-select'
import { Parse } from './Classes/Parse'
import SearchResults from './SearchResults'
import Container from './Container'
import { firebaseApi } from '../components/Features/Firebase'
import Users from './Users'
import Files from './Files'
import Settings from './Settings'

const Fire = new firebaseApi()
const Parser = new Parse('file:///D:/Software/React/web/infobase/src/screens/Classes/data.txt')

export default class Admin extends React.Component {


    constructor() {
        super()
        this.state = {
            Files: false,
            Users: true,
            Settings: false,
        }
       
    }

    componentDidMount = async () => {
        this.setState({ Selected: 'Users' })
    }



    Mobi = () => {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        return isMobile;
    }

    Color = (label) => { return this.state.Selected == label ? 'blueviolet' : 'lightgray' }


    render() {
        return (
            <div style={Verstyle.Theme} >
                <div style={Verstyle.TabView} >
                    <div style={{ ...Verstyle.Tab, borderColor: this.Color('Files'), color: this.Color('Files') }} onClick={() => { this.setState({ Selected: 'Files' }) }} >  Files  </div>
                    <div style={{ ...Verstyle.Tab, borderColor: this.Color('Users'), color: this.Color('Users') }} onClick={() => { this.setState({ Selected: 'Users' }) }}  >  Users  </div>
                    <div style={{ ...Verstyle.Tab, borderColor: this.Color('Settings'), color: this.Color('Settings') }} onClick={() => { this.setState({ Selected: 'Settings' }) }} > Settings  </div>
                </div>

                <div style={Verstyle.BlueLine} />

                {this.state.Selected == 'Users' && <Users />}
                {this.state.Selected == 'Files' && <Files />}
                {this.state.Selected == 'Settings' && <Settings />}


            </div>
        );
    }
}



const Mobile = () => {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile;
}


let Flex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}


const Verstyle = {
    Theme: {
        position: 'absolute',
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },
    TabView: {
        position: 'absolute',
        top: '0%',
        left: Mobile() ? '3%' : '0%',
        width: Mobile() ? '100%' : '20%',
        height: '4%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start', /* Vertical */
        justifyContent: 'flex-start', /* Horizontal */

    },
    Tab: {
        width: '30%',
        height: '100%',
        borderStyle: 'solid',
        borderWidth: '2px',
        marginRight: Mobile() ? '0%' : '1%',
        cursor: 'pointer',
        ...Flex,
    },
    BlueLine: {
        position: 'absolute',
        left: '0%',
        top: '4.1%',
        width: '100%',
        height: '0.6%',
        backgroundColor: 'blueviolet'
    }


}


let Styles = ({

    Main: {
        position: "absolute",
        top: '0%',
        left: '0%',
        width: "100%",
        height: '100%',
        // display: 'flex',
        // alignItems: 'flex-start', /* Vertical */
        // justifyContent: 'flex-start', /* Horizontal */
        // backgroundColor: "white",
        // zIndex: 0
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
