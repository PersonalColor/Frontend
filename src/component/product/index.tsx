import { Clear, CloudUpload, ColorLens, FavoriteBorder, InsertPhoto, StarRounded } from '@material-ui/icons'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { productStyle } from '../../style/product'
import qs from 'qs'

interface IProduct {
  itemName: string
  price: string
  link: string
  imgLink: string
}

type IOriginData = {
  [key in string]: {
    [key in string]: IProduct[]
  }
}

type IHexCodeKey = '아이보리' | '오렌지레드' | '코랄핑크' | '카멜' | '머스타드' | '오렌지' | '버건디' | '플럼' | '블루그레이' | '빨강' | '블랙' | '마젠타'

type IPersonalColorKey = '겨울쿨톤' | '가을웜톤' | '봄웜톤' | '여름쿨톤'

function Product() {
  const classes = productStyle()
  const location = useLocation()
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  })
  const optionList = useMemo(() => ['상의', '하의', '악세서리', '신발', '화장품'], [])
  const sortList = ['인기', '신상', '리뷰많은순', '낮은가격순', '높은가격순']
  const colorList = ['아이보리', '오렌지레드', '코랄핑크', '카멜', '머스타드', '오렌지', '버건디', '플럼', '블루그레이', '빨강', '블랙', '마젠타']
  const hexList = {
    아이보리: '#ece6cc',
    오렌지레드: '#d9381e',
    코랄핑크: '#ff6f61',
    카멜: '#bf8a3d',
    머스타드: '#c3803b',
    오렌지: '#FFA500',
    버건디: '#760c0c',
    플럼: '#681734',
    블루그레이: '#6699cc',
    빨강: '#ff0000',
    블랙: 'black',
    마젠타: '#ff0090',
  }

  const personalColorMatch = {
    겨울쿨톤: ['빨강', '블랙', '마젠타'],
    가을웜톤: ['카멜', '머스타드', '오렌지'],
    봄웜톤: ['아이보리', '오렌지레드', '코랄핑크'],
    여름쿨톤: ['버건디', '플럼', '블루그레이'],
  }

  const [openColor, setOpenColor] = useState<boolean>(false)

  const [data, setData] = useState<IProduct[]>([])
  const [originData, setOriginData] = useState<IOriginData | null>(null)
  const [category, setCategory] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [checkEmpty, setCheckEmpty] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)

  const [upload, setUpload] = useState<boolean>(false)
  const [imageName, setImageName] = useState<string>('')
  const fileButton = useRef<any>(null)
  const [userImage, setUserImage] = useState<any>()
  const [resultMessage, setResultMessage] = useState<string>('')

  const personalColor = localStorage.getItem('personalColor')

  const dragOver = (e: any) => {
    e.preventDefault()
  }

  const dragEnter = (e: any) => {
    e.preventDefault()
    setUpload(true)
  }

  const dragLeave = (e: any) => {
    e.preventDefault()
    setUpload(false)
  }

  const thumbnailDrop = async (e: any) => {
    e.preventDefault()
    const files = e.dataTransfer.files

    if (files !== undefined) {
      setUserImage(files[0])
      setImageName(files[0].name)
      let formData = new FormData()
      formData.append('uploadFile', files[0])
      const response = await fetch('http://localhost:4000/api/data', { method: 'POST', body: formData })
      const { uploadFileId, code } = await response.json()

      if (code === 200) {
        await excuteDiagnosis(uploadFileId)
      }
    }
  }

  const excuteDiagnosis = async (imageId: string) => {
    const diagnosisResponse = await fetch('http://localhost:4000/api/diagnosis', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageId }),
    })
    const { result } = await diagnosisResponse.json()

    setResultMessage(result)
  }

  const handleUploadFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const tmpImage = event.target.files

    if (tmpImage === null || tmpImage === undefined) return

    setUserImage(tmpImage[0])
    setImageName(tmpImage[0].name)
    let formData = new FormData()
    formData.append('uploadFile', tmpImage[0])
    const response = await fetch('http://localhost:4000/api/data', { method: 'POST', body: formData })
    const { uploadFileId, code } = await response.json()

    if (code === 200) {
      await excuteDiagnosis(uploadFileId)
    }
  }

  const handleFileButtonClick = () => {
    fileButton.current.click()
  }

  const getData = async () => {
    const response = await fetch('http://localhost:4000/api/product')
    const product = await response.json()

    setOriginData(product)

    const categoryKey = category === '' ? '상의' : category
    const colorKey = color === '' ? '아이보리' : color

    setData(product[categoryKey][colorKey])
  }

  useEffect(() => {
    getData()
    if (query.category === undefined) return
    if (optionList.includes(query.category as string)) {
      setCheckEmpty(false)
      setCategory(query.category as string)
      return
    }
    setCheckEmpty(true)
  }, [])

  useEffect(() => {
    if (originData === null) return

    const categoryKey = category === '' ? '상의' : category
    const colorKey = color === '' ? '아이보리' : color

    setData(originData[categoryKey][colorKey])
  }, [category, color, originData])

  useEffect(() => {
    if (optionList.includes(category)) {
      setCheckEmpty(false)
    }
  }, [category, optionList])

  return (
    <div className={classes.product}>
      <div className={classes.category}>
        <div> {category === '' ? (query.category === undefined ? '상의' : (query.category as string).charAt(0).toUpperCase() + (query.category as string).slice(1)) : category}</div>
        <div className={classes.button}>
          <button onClick={() => setModal(true)}>제품 색 추출</button>
        </div>
      </div>
      <div className={classes.filter}>
        <div
          style={{
            display: 'flex',
          }}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <div>{`Category >`}</div>
            <div
              style={{
                marginLeft: '6px',
              }}
            >
              <select
                name=""
                id=""
                style={{ width: '100px', height: '28px', backgroundColor: 'inherit', color: '#ffffff' }}
                onChange={(event: any) => setCategory(event.target.value)}
                defaultValue={category}
              >
                <option style={{ color: 'black' }} value="" disabled>
                  선택 안됨
                </option>
                {optionList.map((v, i) => (
                  <option style={{ color: 'black' }} key={`option-category-${i}`} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <div>{`Color >`}</div>
            <div
              id="button"
              style={{
                marginLeft: '6px',
                cursor: 'pointer',
              }}
              onClick={() => setOpenColor((openColor) => !openColor)}
            >
              <ColorLens />
            </div>
            {openColor === true && (
              <div className={classes.colorWrapper}>
                {colorList.map((v, i) => (
                  <div key={`color-item-${i}`} className={classes.colorItem} style={{ backgroundColor: hexList[v as IHexCodeKey] }} onClick={() => setColor(v)}>
                    <div className={classes.tooltip}>{v}</div>
                    <div>
                      {personalColor !== null && personalColorMatch[personalColor as IPersonalColorKey].includes(v) && (
                        <React.Fragment>
                          <StarRounded style={{ color: 'yellow', position: 'absolute', zIndex: 9, width: '24px', height: '24px' }} key={`codi-star-${i}`} />
                          <StarRounded style={{ color: 'black', position: 'absolute', width: '26px', height: '26px', marginRight: '1px' }} key={`codi-star-${i}`} />
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
            }}
          >
            <div>{`Sort >`}</div>
            <div
              style={{
                marginLeft: '6px',
              }}
            >
              <select name="" id="" style={{ width: '100px', height: '28px', backgroundColor: 'inherit', color: '#ffffff' }}>
                {sortList.map((v, i) => (
                  <option style={{ color: 'black' }} key={`option-sort-${i}`} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {checkEmpty === false && (
        <div className={classes.content}>
          {data.map((v, i) => (
            <a className={classes.wrapper} href={v.link} key={`product-content-${i}`}>
              <div className={classes.item}>
                <div className={classes.img}>
                  <img src={v.imgLink} alt="" />
                </div>
                <div className={classes.one}>쿠팡</div>
                <div className={classes.two}>{v.itemName}</div>
                <div className={classes.bottom}>
                  <div>{v.price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원</div>
                  <div>
                    <FavoriteBorder />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
      {checkEmpty === true && <div>아직 준비된 제품이 없습니다.</div>}

      {modal === true && (
        <React.Fragment>
          <div className={classes.modal}>
            <div style={{ height: '60px', color: '#ffffff', display: 'flex', padding: '30px', fontSize: '32px', fontWeight: 'bold', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>제품 색 추출</div>
              <div style={{ cursor: 'pointer' }} onClick={() => setModal(false)}>
                <Clear style={{ width: '36px', height: '36px' }} />
              </div>
            </div>

            <div className={classes.first} style={{ padding: '30px', height: 'calc(100% - 260px)', flexDirection: 'column', overflow: 'auto' }}>
              <div>
                <div className={classes.imageUpload} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={thumbnailDrop} onClick={handleFileButtonClick}>
                  {upload ? (
                    <div className={classes.upload}>
                      <div>
                        <InsertPhoto className={classes.uploadIcon} />
                      </div>
                      <div className={classes.fileName}>{imageName !== '' ? imageName : '이미지를 놓아주세요'}</div>
                    </div>
                  ) : (
                    <>
                      <div style={{ textAlign: 'center' }}>
                        <div>
                          <CloudUpload className={classes.uploadIcon} />
                        </div>
                        <div className={classes.fileName}>
                          {imageName !== '' ? (
                            imageName
                          ) : (
                            <React.Fragment>
                              <div>이미지를 드래그해서 놓거나</div>
                              <div>클릭을 통해 업로드해주세요.</div>
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <input
                  ref={fileButton}
                  style={{
                    display: 'none',
                  }}
                  type="file"
                  id="getFile"
                  accept="image/gif,image/jpeg,image/png,image/jpg"
                  onChange={handleUploadFileChange}
                />

                {userImage !== undefined && (
                  <div className={classes.userImage}>
                    <img src={URL.createObjectURL(userImage)} />
                    <div>{resultMessage}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={classes.overlay} onClick={() => setModal(false)}></div>
        </React.Fragment>
      )}
    </div>
  )
}

export default Product
