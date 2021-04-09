import React from 'react';
import { Parse } from './Classes/Parse'
const Parser = new Parse('file:///D:/Software/React/web/infobase/src/screens/Classes/data.txt')

export default class Info extends React.Component {

    constructor() {
        super()
        this.state = ({
            Encrypt: null,
            Complete: false
        })
    }

    componentDidMount = () => {
        let param = this.props.match.params.id
        let Format = Parser.getInfo(param)
        //let Parse = JSON.parse(Format)

         this.setState({ Encrypt: Format, Complete: true })
        // this.setState({ Encrypt: Format })

    }

    render() {
        if (this.state.Complete) {
            return (
                <div>

                    <p>Restrict Code :    {this.state.Encrypt.RestrictCode} </p>

                    <p>  Syntax : </p>



                    <div>
                        {this.state.Encrypt.Syntax.map(Synx => {
                            return (
                                <p key = {Math.random()} >     {Synx}     </p>
                            )
                        })}
                    </div>

                    <br></br>

                    <p> Description :  </p>

                    <p> {this.state.Encrypt.Description}</p>

                    <br></br>


                    <p> See also :  </p>

                    <p> {this.state.Encrypt.SeeAlso}</p>



                </div>
            );
        };
        return null
    }
}

