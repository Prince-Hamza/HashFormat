import React, { Component } from 'react'
import { SpreadSheetApi } from "../components/Features/SpreadsheetApi";
const Api = new SpreadSheetApi('https://script.google.com/macros/s/AKfycbzbz8th_Wjz5tL9E5WlYoyp1ZllA2btfWq8nDk2YTG5v7wg0r1YimS5lOq1Mzg-RZvP/exec')

export default class API extends Component {
    constructor() {
        super()
        this.state = { Reactive: true }
    }


    ApiRead = async () => {
        Object.prototype.Stringify = () => {
            return JSON.stringify(this)
        };

        let resp = await Api.readFirebase('Pending')

        // alert(resp.Stringify())
    }

    Download = () => {
        var link = document.createElement('a');
        link.download = 'data.json';
        var blob = new Blob(["json_string"], { type: 'text/plain' });
        link.href = window.URL.createObjectURL(blob);
        link.click();
    }




    render() {
        return (
            <div style={{ ...Verstyle.InputsView, ...this.props.style }} >




                <div style={{ ...Verstyle.ItemView, flexDirection: 'column', marginBottom: '15%' }}>

                    <div style={{ ...Verstyle.ItemView, marginBottom: '5%' }} >
                        <div style={{ marginRight: '5%' }}> Api Entry Example </div>
                        <button onClick={() => { this.ApiRead() }} style={Verstyle.Button} > try </button>
                    </div>

                    <div style={{ ...Verstyle.ItemView, flexDirection: 'row' }} >
                        <input style={Verstyle.Input} value={'axios.get("https://script.google.com/macros/s/AKfycbzbz8th_Wjz5tL9E5WlYoyp1ZllA2btfWq8nDk2YTG5v7wg0r1YimS5lOq1Mzg-RZvP/exec" , { params: { Method: "Read" , Path: firePath } }) '} />
                    </div>

                </div>





                <div style={{ ...Verstyle.ItemView, flexDirection: 'column', marginBottom: '15%' }}>

                    <div style={{ ...Verstyle.ItemView, marginBottom: '5%' }} >
                        <div style={{ marginRight: '5%' }}> Webhook Url </div>
                        <button style={Verstyle.Button} > try </button>
                    </div>

                    <div style={{ ...Verstyle.ItemView, flexDirection: 'row' }} >
                        <input style={Verstyle.Input} value="https://script.google.com/macros/s/AKfycbzbz8th_Wjz5tL9E5WlYoyp1ZllA2btfWq8nDk2YTG5v7wg0r1YimS5lOq1Mzg-RZvP/exec" />
                    </div>

                </div>




                <div style={{ ...Verstyle.ItemView, flexDirection: 'column', marginBottom: '15%' }}>

                    <div style={{ ...Verstyle.ItemView, marginBottom: '5%' }} >
                        <div style={{ marginRight: '5%' }}> File Download </div>

                    </div>

                    <div style={{ ...Verstyle.ItemView, flexDirection: 'row' }} >
                        <input value = 'localhost:3000/update' />
                        <button style={Verstyle.Button} onClick={() => { this.Download() }} > Download </button>
                    </div>

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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    InputsView: {
        ...FlexCenter,
        position: 'absolute',
        top: Mobile() ? '-0.4%' : '5%',
        left: '5%',
        flexDirection: 'column',
        width: Mobile() ?  '100%' : '40%',
        height: '90%',
        marginBottom: '3%',
        borderStyle: 'solid',
        borderColor: 'lightgray'
    },
    Label: {
        width: '100%',
        height: '85%',
        borderColor: 'lightgray',
        borderStyle: 'solid',
        borderWidth: '0.5px'
    },
    Button: {
        width: '15%',
        height: '27px',
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: '8px',
        cursor: 'pointer'
    },
    Input: {
        width: '60%'
    }
})