import React from 'react'
import { homeStyle } from '../../style/home'

function Home() {
  const classes = homeStyle()
  return <div className={classes.home}></div>
}

export default Home
