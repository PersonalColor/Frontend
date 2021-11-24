import { createStyles, makeStyles } from '@material-ui/core'

export const privateEditStyle = makeStyles(() =>
  createStyles({
    privateEdit: {
        position:'fixed',
        width:'60%',
        height:'700px',
        marginTop:'100px',
        marginLeft:'20%',
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
    }
  })
)

