import { createStyles, makeStyles } from '@material-ui/core'

export const selfDiagnosisStyle = makeStyles(() =>
  createStyles({
    privateEdit: {
        position:'fixed',
        width:'500px',
        height:'300px',
        marginTop:'20%',
        marginLeft:'35%',
        left:0,
        top:0,
        backgroundColor:"#EDEDED",
        zIndex: 100
    },
    overlay:{
        position:'fixed',
        left:0,
        top:0,
        backgroundColor:'black',
        opacity: 0.3,
        width:'100%',
        height:'100%',
        zIndex: 99,
        cursor:'pointer'
    },
    layout:{
      textAlign: 'left',
      marginTop:'13%',
      marginLeft: '25%',
      lineHeight: '200%'
    }
  })
)