import React from 'react';
import Select from 'react-select'
import { Parse } from './Classes/Parse'
import { firebaseApi } from '../components/Features/Firebase'
import { EmailSignUp } from '../components/Features/FirebaseAuth'

import AdminSearchResults from './AdminSearchResults';
import '../App.css'
const Fire = new firebaseApi()
const Parser = new Parse('file:///D:/Software/React/web/infobase/src/screens/Classes/data.txt')

class Users extends React.Component {


    constructor() {
        super()
        this.state = {
            Username: '',
            Email: '',
            Password: '',
            Role: '',
            Success: false,
            Users: [
                // { Name: 'Humza', Role: 'Dev' }
            ]
        }
        this.Info = []

    }

    componentDidMount = async () => {
        let UserInfo = await Fire.Once('Users')
        UserInfo.forEach((item) => {
            let data = item.val()
            console.log(JSON.stringify(data))
            this.Info.push(data)
        })

        this.setState({ Users: this.Info })

    }

    Mobi = () => {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        return isMobile;
    }

    AddUser = async () => {

        let Userid = await EmailSignUp(this.state.Email, this.state.Password)
        alert(Userid)

        Fire.Set(`Users/${Userid}`, ({
            Name: this.state.Username,
            Email: this.state.Email,
            Password: this.state.Password,
            Role: this.state.Role
        }))

        // this.updateResp(this.state.Username , this.state.Role)

    }


    SuccessMsg = (x) => {
        this.setState({ Success: true })
        setTimeout(() => {
            this.setState({ Success: false })
        }, 1000)
    }

    updateResp = (n, r) => {
        this.state.Users.push({ Name: n, Role: r })
        this.setState({ Users: this.state.Users })
    }


    render() {
        return (
            <div style={Verstyle.Theme} >


                <div >

                    <input id="Search" placeholder="Search" onChange={(e) => { this.AutoComplete(e.target.value) }} />

                    <button className="Button" id="Btn3"  >New Entry</button>


                    <AdminSearchResults
                        Top={this.Mobi() ? 15 : 30}
                        Left={this.Mobi() ? 10 : 60}
                        Width={this.Mobi() ? 83 : 18}
                        Height={this.Mobi() ? 60 : 50}
                        Items={this.state.Users}
                        addToOptions={this.InsertOption}
                    />

                </div>


                <div style={Verstyle.InputsView} >


                    <div style={Verstyle.ItemView} >
                        <p style={{ marginRight: '5%' }} > Username </p>
                        <input style={Verstyle.Input} placeholder={'Username'} onChange={(e) => { this.setState({ Username: e.target.value }) }} />
                    </div>



                    <div style={Verstyle.ItemView} >
                        <p style={{ marginRight: '13%' }} >Email</p>
                        <input style={Verstyle.Input} placeholder={'Email'} onChange={(e) => { this.setState({ Email: e.target.value }) }} />
                    </div>



                    <div style={Verstyle.ItemView} >
                        <p style={{ marginRight: '5%' }} >Password</p>
                        <input style={Verstyle.Input} placeholder={'Password'} onChange={(e) => { this.setState({ Password: e.target.value }) }} />
                    </div>



                </div>

                <div style={Verstyle.Role}> Role </div>


                <Select className={"SlctAdmin"} options={Menu} onChange={(opt) => { this.setState({ Role: opt.label }) }} />

                {/* <div style={Verstyle.Select} >
                    <Select options={Menu} onChange={(opt) => { this.setState({ Role: opt.label }) }} />
                </div> */}

                <button
                    style={{
                        ...Verstyle.Button, position: 'absolute', top: Mobile() ? '160%' : '75%',
                        left: Mobile() ? '28%' : '20%' , width:Mobile() ? '50%' : '15%'
                    }}
                    onClick={() => { this.AddUser() }} > Add User </button>


                {this.state.Success &&
                    <div style={Verstyle.Success} >
                        <div> Success </div>
                    </div>

                }


            </div>
        );
    }
}


export default Users



const Mobile = () => {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile;
}


const Menu = [
    { label: "Primary", value: 1 }, { label: "Author", value: 2 },
    { label: 'Admin', value: 3 }, { label: 'Super Admin', value: 4 }
]



let FlexCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}




const Verstyle = {
    Role: {
        position: 'absolute',
        left: '16%',
        top: Mobile() ? '150%' : '62%'
    },
    Theme: {
        position: 'absolute',
        top: '4.5%',
        height: '95%',
        width: '100%',

    },
    Select: {
        position: 'absolute',
        width: '20%',
        top: '60%',
        left: '18%'
    },
    ItemView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    TabView: {
        position: 'absolute',
        top: '0%',
        left: '0%',
        width: '20%',
        height: '25px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start', /* Vertical */
        justifyContent: 'flex-start', /* Horizontal */

    },
    Tab: {
        width: '30%',
        height: '100%',
        borderStyle: 'solid',
        borderColor: 'whitesmoke',
        borderWidth: '2px',
        marginRight: '1%',
        cursor: 'pointer',
        ...FlexCenter,
    },

    InputsView: {
        ...FlexCenter,
        position: 'absolute',
        top: Mobile() ? '90%' : '0%',
        left: Mobile() ? '20%' : '0%',
        flexDirection: 'column',
        width: '50%',
        height: '90%',
        marginBottom: '3%'

    },
    Input: {
        height: '65%'
    },

    Button: {
        position: 'absolute',
        cursor: 'pointer',
        top: '70%',
        left: '20%',
        width: '15%',
        height: '4%',
        outline: 'none',
        borderStyle: 'none',
        borderRadius: '50px'

    },
    Success: {
        position: 'absolute',
        cursor: 'pointer',
        top: '90%',
        left: '5%',
        width: '50%',
        height: '4%',
        outline: 'none',
        borderStyle: 'none',
        borderRadius: '50px',
        backgroundColor: 'cyan',
        color: 'magenta',
        ...FlexCenter
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
