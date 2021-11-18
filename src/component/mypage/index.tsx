import React from 'react'
import { mypageStyle } from '../../style/mypage'

function Mypage() {
  const classes = mypageStyle()
  return (
    <div className={classes.mypage}>
      <div className={classes.topbar}>
        <div className={classes.title}>Codibook</div>
        <div>검색어를 입력하세요</div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div>조은향</div>
        </div>
      </div>
      <div className={classes.menu}></div>
      <div className={classes.info}></div>
      <div className={classes.tab}></div>
    </div>
  )
}

export default Mypage
