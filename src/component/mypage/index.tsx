import React, { useState } from 'react'
import { mypageStyle } from '../../style/mypage'
import PrivateEdit from './privateEdit'

function Mypage() {
  const classes = mypageStyle()
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div className={classes.mypage}>
      <div className={classes.middle}></div>
      <div className={classes.center}>
        <div className={classes.person}>은향 조</div>
        <button
          type="button"
          className={classes.person}
          onClick={() => {
            setOpenModal(true)
          }}
        >
          개인정보 수정
        </button>
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
      <div className={classes.bottom}></div>
      {openModal === true && <PrivateEdit modal={openModal} setModal={setOpenModal} />}
    </div>
  )
}

export default Mypage
