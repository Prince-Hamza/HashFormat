import { BrowserRouter, Route } from 'react-router-dom'
import firebase from 'firebase'
import { firebaseConfig } from './config'
import Main from './screens/Main.jsx'
import Dice from './screens/Dice'
import Info from './screens/Info'
import New from './screens/New'
import Update from './screens/Update'
import Admin from './screens/Admin'


function App() {

  const Connect = () => {
    try { firebase.initializeApp(firebaseConfig) } catch (ex) { }
  }

  Connect()

  return (
    <BrowserRouter>
      <div className="App">

        <Route exact path="/" component={Main} />

        <Route exact path="/Dice" render={(props) => <Dice {...props} />} />

        <Route exact path="/Info/:id" render={(props) => <Info {...props} />} />

        <Route exact path="/New" render={(props) => <New {...props} />} />

        <Route exact path="/Update" render={(props) => <Update {...props} />} />

        <Route exact path="/Admin" render={(props) => <Admin {...props} />} />

        {/*  Recieve id in Component
               var Data = this.props.match ; var params = Data.params;  var Routeid = params.id;   */}


      </div>
    </BrowserRouter>
  );
}

export default App;
