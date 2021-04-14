import React from 'react';
import { EmailSignUp, EmailLogin } from '../components/Features/FirebaseAuth'
import '../App.css'

export default class Main extends React.Component {


  SignUp = async () => {
    let Key = await EmailSignUp(this.state.Email, this.state.Password)
    alert("Created Account Successfully")
  }


  SignIn = async () => {
    let Key = await EmailLogin(this.state.Email, this.state.Password)
    alert("Login Successfully")
    this.props.history.push('/Dice')

  }

  render() {
    return (
      <div style={Styles.Main} className = "Main" >



        <div style = {Styles.Aligner} >
        <div > Email Address </div>

        <input style={Styles.Input} onChange={(e) => { this.setState({ Email: e.target.value }) }} />

        <div>  Password </div>

        <input type = "password" style={Styles.Input} onChange={(e) => { this.setState({ Password: e.target.value }) }} />
        </div>



        <br></br><br></br>

        <div style={Styles.Choice} >

          <button style={Styles.Button} onClick={() => { this.SignIn() }} > Login </button>

          {/* <div style={Styles.Create} onClick={() => { this.SignUp() }}>
            SignUp
          </div> */}

        </div>

      </div>
    );
  }
}


let Styles = ({
  Main: {
    position: "absolute",
    top:"0%",
    height: "100%",
    display: 'flex',
    alignSelf:"center",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  Aligner:{
    display: 'flex',
    alignSelf:"center",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  Choice: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf:'center'
  },
  Button: {
    marginRight: '16%',
    height: '30px',
    width: '130px',
    backgroundColor: 'whitesmoke',
    borderStyle:"none",
    cursor:"pointer",
    borderRadius:'50px'
  },
  Input: {
    marginBottom: "4%",
  },
  Create: {
    font: "bold italic 15px times new roman",
    color: "#222",
    cursor: 'pointer',
    marginTop:"5%"

  },
  
})
