import React, { Component } from 'react'
import { SpreadSheetApi } from "../components/Features/SpreadsheetApi";
const Api = new SpreadSheetApi('https://script.google.com/macros/s/AKfycbzem4I92UvmI8vdBH5qGvEJvyrbV_rC-K4djJ1Y50d1U1chsejVLOEL2C5jhgl2uVEH/exec')


export default class SMTP extends Component {
    constructor() {
        super()
        this.state = { Reactive: true }
    }

    SendMail = () => {
       Api.sendEmail('princehamzi.mine@gmail.com' , 'Password Updated' , 'Password Updated')
    }

    render() {
        return (
            <div style={{...Verstyle.InputsView, ...this.props.style}} >


                <h3 style = {{position:'absolute' , left:'15%' , top:'2%'}} >SMPT </h3>
                <button style = {{top:'5%' , width:'15%' , left:'75%'}} onClick={() => { this.Save() }} className="Button" id="BtnSmpt" > Save </button>



                <div style={Verstyle.ItemView} >
                    <p style={{ marginRight: '5%' }} > Username </p>
                    <input style={Verstyle.Input} placeholder={'Username'} onChange={(e) => { this.setState({ Username: e.target.value }) }} />
                </div>



                <div style={Verstyle.ItemView} >
                    <p style={{ marginRight: '5%' }} >Password</p>
                    <input style={Verstyle.Input} placeholder={'Email'} onChange={(e) => { this.setState({ Email: e.target.value }) }} />
                </div>



                <div style={Verstyle.ItemView} >
                    <p style={{ marginRight: '9%' }} > Server  </p>
                    <input style={Verstyle.Input} placeholder={'Password'} onChange={(e) => { this.setState({ Password: e.target.value }) }} />
                </div>



                <div style={Verstyle.ItemView} >
                    <p style={{ marginRight: '13%' }} > Port  </p>
                    <input style={Verstyle.Input} placeholder={'Password'} onChange={(e) => { this.setState({ Password: e.target.value }) }} />
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