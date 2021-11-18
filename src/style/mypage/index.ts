import { createStyles, makeStyles } from '@material-ui/core'

export const mypageStyle = makeStyles(() =>
  createStyles({
    mypage: {},
    topbar: {
      display: 'flex',
      width: '100%',
      height: '64px',
      justifyContent: 'space-around',
      backgroundColor: 'black',
      alignItems: 'center',
    },

    title: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#ffffff',
    },

    menu: {},
    info: {},
    tab: {},
  })
)
