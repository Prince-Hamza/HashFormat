import React, { Component } from 'react'
import { SpreadSheetApi } from "../components/Features/SpreadsheetApi";
const Api = new SpreadSheetApi('https://script.google.com/macros/s/AKfycbzwgYJmRT3ZJOSZYD9bNdVQzuO0I3-mg41cIYU2h_GYo5ChU8up8Aj7FFAW0awARUJ7/exec')


export default class SMTP extends Component {
    constructor() {
        super()
        this.state = { Email: '' , Password:'' , Username:'' }
    }

    SendMail = () => {
       Api.sendEmail(this.state.Email , 'Password Updated' , 'Password Updated')
    }

    render() {
        return (
            <div style={{...Verstyle.InputsView, ...this.props.style}} >


                <h3 style = {{position:'absolute' , left:'15%' , top:'2%'}} >SMPT </h3>

                <button style = {{top:'5%' , width:'15%' , left:'75%'}}
                 onClick={() => { this.Save() }} className="Button" id="BtnSmpt" > Save </button>



                <div style={Verstyle.ItemView} >
                    <p style={{ marginRight: '5%' }} > Username </p>
                    <input style={Verstyle.Input} placeholder={'Username'} 
                    onChange={(e) => { this.setState({ Username: e.target.value }) }} />
                </div>



                <div style={Verstyle.ItemView} >
                    <p style={{ marginRight: '11%' }} > Email </p>
                    <input style={Verstyle.Input} placeholder={'Email'} 
                    onChange={(e) => { this.setState({ Email: e.target.value }) }} />
                </div>



                <div style={Verstyle.ItemView} >
                    <p style={{ marginRight: '5%' }} > Password  </p>
                    <input style={Verstyle.Input} placeholder={'Password'} 
                    onChange={(e) => { this.setState({ Password: e.target.value }) }} />
                </div>


                <div style={Verstyle.ItemView} >
                    <p style={{ marginRight: '10%' }} > Server  </p>
                    <input style={Verstyle.Input} placeholder={'Password'} onChange={(e) => { this.setState({ Server: e.target.value }) }} />
                </div>



                <div style={Verstyle.ItemView} >
                    <p style={{ marginRight: '14%' }} > Port  </p>
                    <input style={Verstyle.Input} placeholder={'Password'} onChange={(e) => { this.setState({ Port: e.target.value }) }} />
                </div>



                <button style = {{top:'75%' , width:'25%' , alignSelf:'center'}} onClick={() => { this.SendMail() }} className="Button" id="BtnSendMail" > Send Email </button>




                <div style={Verstyle.ItemView} >
                    {/* <p style={{ marginRight: '70%' }} >Role</p> */}

                </div>


            </div>

        )
    }

}


const Mobile = () => {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile;
}


let FlexCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}



let Verstyle = ({
    ItemView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    InputsView: {
        ...FlexCenter,
        position: 'absolute',
        top: Mobile() ? '110%' : '5%',
        left: Mobile() ? '0%' : '5%',
        flexDirection: 'column',
        width: Mobile() ? '100%' : '40%',
        height: '90%',
        marginBottom: '3%',
        borderStyle: 'solid',
        borderColor: 'lightgray'

    },
})