import {StyleSheet } from 'react-native'


export const Styles = StyleSheet.create ({
    Container : {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%'
    },
    ContainBelow:{
      flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    Menu:{
      position:"absolute",
      top:"0%",
      left:"0%",
      width:"100%",
      height:"10%",
      display:'flex',
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:'space-evenly', 
      backgroundColor:'white',
      color:'magenta'

    } ,
    NiceText : {
      fontSize:22,
      fontFamily:'Roboto',
      fontStyle:'italic',
      color:'magenta',
    },
    Button:{
      width:'70%',
      height:'5%',
      backgroundColor:'#222',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:63
    },
    Card:{
      backgroundColor:'white',
      shadowColor:'lightgray',
      elevation:7
    },
    

  })


  
  
export const Colors = ({

   NiceDark:{
    backgroundColor : '#222'
  },

})



