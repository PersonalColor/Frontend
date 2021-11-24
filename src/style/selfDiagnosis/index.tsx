import { createStyles, makeStyles } from '@material-ui/core'
import { convertCompilerOptionsFromJson } from 'typescript'

export const selfDiagnosisStyle = makeStyles(() =>
  createStyles({
    head: {
      //maxHeight : '25vw',
      //maxWidth : '100vw',
      //position:'fixed',
      width:'100%',
      height:'10%',
      //backgroundSize: 'cover',
      backgroundColor: '#FFA500',
      //backgroundposition: 'center',
      marginTop:'13%',
      //fontFamily: '돋움',
      fontSize: '30px',
      fontWeight: 'bold',
      //textAlign: 'center',
      verticalAlign: 'middle',
      lineHeight: '270%',
    },
    article:{
        //position:'fixed',
        width:'70%',
        height:'50%',
        backgroundColor:'#C0C0C0',
        margin:'1% 1% 1% 15%',
        fontSize: '25px',
        lineHeight: '200%',
        textAlign: 'center'
        //fontWeight: 'bold',
        //opacity: 0.3,
        //width:'100%',
        //height:'100%',
        //zIndex: 99,
        //cursor:'pointer'
    },
    layout:{
      textAlign: 'left',
      marginTop:'13%',
      marginLeft: '25%',
      lineHeight: '200%'
    }
  })
)