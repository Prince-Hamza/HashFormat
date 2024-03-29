import React from 'react';
import '../App.css'

export default class Container extends React.Component {

    Insert = (Item) => {

        if (this.props.addToOptions) {
            this.props.addToOptions(Item)
        }

        //else if (this.props.Alert) this.props.Alert(Item)

        // this.props.Alert(Item)
        // ((fn:addToOptions)(Item)) : ((fn:Alert)(Item))

        // {{JSN|item,index| ((item.child))   }}

        // alert(JSON.stringify(Item))
    }

    Mobi = () => {

        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        return isMobile;

    }

    render() {
        console.log("Props :: " + typeof (this.props.Items))
        return (
            <div>

                <div
                    style={{
                        ...Styles.Container,
                        left: this.props.Left + "%",
                        top: this.props.Top + '%',
                        width: this.props.Width + '%',
                        height: this.props.Height + "%"
                    }}

                >
                    {typeof (this.props.Items) == 'object' &&
                        this.props.Items.map((Item,index) => {
                            return (

                                <div key={Math.random()} style={Styles.Item}>

                                    {Item != '' &&
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }} id="respItem" onClick={() => { this.Insert(Item) }}>

                                            {Item}

                                        </div>


                                    }

                                    <img
                                        src={'https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-minus-icon-png-image_956426.jpg'}
                                        style={{ width: '20px', height: '20px', marginLeft: 'auto' , marginRight:'15px' }}
                                        onClick={() => {
                                            this.props.Items.splice(index, 1)
                                            this.props.Slice(this.props.ArrayName, this.props.Items)
                                        }}
                                    />

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
        flexDirection: "column",
        alignItems: 'flex-start', /* Vertical */
        justifyContent: 'flex-start', /* Horizontal */
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "black",
        overflow: "scroll"

    },
    Item: {
        width: '100%',
        height: '20%',
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "black",
        display: 'flex',
        alignItems: 'center', /* Vertical */
        justifyContent: 'center', /* Horizontal */
        overflow: 'hidden'

    }

})
