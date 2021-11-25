import { FavoriteBorder, NotificationsNoneOutlined, Search, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import { headerStyle } from '../../style/layout/header'
import CheckroomIcon from '@mui/icons-material/Checkroom'

function Header() {
  const classes = headerStyle()
  const userId = localStorage.getItem('userId')

  return (
    <div className={classes.header}>
      <div className={classes.container}>
        <div className={classes.top}>
          <div className={classes.title}>
            <a href="/" style={{ textDecoration: 'none', color: '#ffffff' }}>
              PersonalColor
            </a>
          </div>

          <div className={classes.search}>
            <Search />
            <input className={classes.input} type="text" placeholder="검색어를 입력하세요" />
          </div>

          <div className={classes.etc}>
            <div className={classes.favorite}>
              <FavoriteBorder />
            </div>
            <div className={classes.shoppingCart}>
              <ShoppingCartOutlined />
            </div>
            <div className={classes.notification}>
              <NotificationsNoneOutlined />
            </div>
            {userId === null ? (
              <a href="/login" style={{ textDecoration: 'none' }}>
                <div className={classes.login}>로그인</div>
              </a>
            ) : (
              <a
                href="/"
                style={{ textDecoration: 'none' }}
                onClick={() => {
                  localStorage.removeItem('personalColor')
                  localStorage.removeItem('userId')
                }}
              >
                <div className={classes.login}>로그아웃</div>
              </a>
            )}
          </div>
        </div>

        <div className={classes.bottom}>
          <a href="/codi">
            <CheckroomIcon style={{ width: '16px', height: '16px', marginRight: '4px', color: '#ff2477' }} />
            CODI
          </a>
          <a href="/product?category=outer">OUTER</a>
          <a href="/product?category=상의">TOPS</a>
          <a href="/product?category=하의">BOTTOMS</a>
          <a href="/product?category=dress">DRESS</a>
          <a href="/product?category=신발">SHOES</a>
          <a href="/product?category=bags">BAGS</a>
          <a href="/product?category=악세서리">ACCESSORIES</a>
          <a href="/product?category=swimwear">SWIMWEAR</a>
          <a href="/product?category=new">NEW</a>
          <a href="/product?category=best">BEST</a>
          <a href="/product?category=sale">SALE</a>
        </div>
      </div>
    </div>
  )
}

export default Header
