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
      <div className={classes.menu}>
        <a className={classes.menuItem} href="/product">TRENDING</a>
         <div>OUTER</div>
         <div>TOPS</div>
         <div>BOTTOMS</div>
         <div>DRESS</div>
         <div>SHOES</div>
         <div>BAGS</div>
         <div>ACCESSORIES</div>
         <div>SWIMWEAR</div>
         <div>NEW</div>
         <div>BEST</div>
         <div>SALE</div>
      </div>
      <div className={classes.middle}></div>
      <div className={classes.center}>
        <div className={classes.person}>은향 조</div>
      </div>
      <div className={classes.follow}>
        <div className={classes.following}>팔로잉</div>
        <div>팔로워</div>
        <div>받은 좋아요</div>
        <div className={classes.number}>0</div>
         <div>0</div>
         <div>0</div>
      </div>
      <div className={classes.codi}>
        <div className={classes.stylist}>내 코디</div>
        <div>관심 코디</div>
        <div>관심 상품</div>
        <div>최근 본 상품</div>
      </div>
      <div className={classes.bottom}>
      </div>
        </div>
      </div>
      <div className={classes.menu}></div>
      <div className={classes.info}></div>
      <div className={classes.tab}></div>
    </div>
  )
}

export default Mypage