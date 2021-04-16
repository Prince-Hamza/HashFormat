import React, { Component } from 'react'

export default class TitleKeyWord extends Component {

    Mobi = () => {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        return isMobile;
    }

    render() {
        return (
            <div style={Styles.Row} >

                <input style={{
                    ...Styles.Heading, width: Mobi() ? '75%' : '100%', marginTop: '7%', marginRight: "5%",
                }}
                    placeholder='New Keyword'
                    onChange={(e) => {
                        this.props.SetValue(e.target.value)
                    }} />



                <img
                    onClick={() => 
                    { this.props.AddKeyWord(this.props.currentObject.KeyWords) }}
                    style={Styles.plusImage} alt="void" width="25px" height="25px"
                    src="https://uc-emoji.azureedge.net/orig/ef/44c1af69ec5f274e1bc6f28367a410.png" />

            </div>
        )
    }

}


const Mobi = () => {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile;
}


let Styles = ({
    Row: {
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    Heading: {
        backgroundColor: 'whitesmoke',
        borderStyle: 'solid',
        borderColor: 'lightgray',
        height: '18px',
        font: '12px tmes new roman',
        justifyContent: Mobi() ? 'flex-start' : 'center',
        alignItems: Mobi() ? 'flex-start' : 'center',
    },
    plusImage: {
        marginTop: '5%',
        cursor: 'pointer'
    }

})