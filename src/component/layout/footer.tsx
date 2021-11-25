import React from 'react'
import { footerStyle } from '../../style/layout/footer'

function Footer() {
  const classes = footerStyle()
  return (
    <div className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.first}>
          <div>소개</div>
          <div>브랜드</div>
          <div>멤버쉽</div>
          <div>이용약관</div>
          <div>개인정보취급방침</div>
          <div>입점/제휴문의</div>
          <div>배송/교환/반품</div>
          <div>고객센터</div>
        </div>

        <div className={classes.second}>PersonalColor는 오픈소스소프트웨어개발 수업 과제를 위해 제작된 페이지입니다.</div>

        <div className={classes.third}>ⓒ2021 PersonalColor. All Rights Reserved</div>
      </div>
    </div>
  )
}

export default Footer
