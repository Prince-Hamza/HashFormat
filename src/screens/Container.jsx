import React from 'react';
import '../App.css'

export default class Container extends React.Component {

    Insert = (Item) => {
      //  alert(JSON.stringify(Item.Info))
       let x = this.props.addToOptions ? this.props.addToOptions : this.props.Alert
       x(Item)

    //    if (this.props.addToOptions) {
    //        this.props.addToOptions(Item)
    //    } else if (this.props.Alert) this.props.Alert(Item)

      // this.props.Alert(Item)
        // ((fn:addToOptions)(Item)) : ((fn:Alert)(Item))

        // {{JSN|item,index| ((item.child))   }}

        // alert(JSON.stringify(Item))
    }
    
    render() {
        return (
            <div>

                <div className = "resp"
                style={{
                    ...Styles.Container, left: this.props.Left + "%", top: this.props.Top + "%",
                    width: this.props.Width + "%", height: this.props.Height + "%"
                }}
                
                >
                    {this.props.Items.map(Item => {
                        return (

                            <div key = {Math.random()} style={Styles.Item}>

                                <div id = "respItem" onClick = {()=> {this.Insert(Item) }}> {Item} </div>

                            </div>
                        )

                    })}
                </div>
            </div>
        );
    }
}



let Styles = ({
    Container: {
        position: "absolute",
        display: 'flex',
        flexDirection:"column",
        alignItems: 'flex-start', /* Vertical */
        justifyContent: 'flex-start', /* Horizontal */
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "black",
        overflow:"scroll"

    },
    Item: {
        width: '100%',
        height: '20%',
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "black",
        display: 'flex',
        alignItems: 'center', /* Vertical */
        justifyContent: 'flex-start', /* Horizontal */

    }

})
