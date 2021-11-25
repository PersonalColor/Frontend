import { Clear, CloudUpload, ColorLens, InsertPhoto, FavoriteBorder, StarRounded } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { codiStyle } from '../../style/codi'

type IHexCodeKey = '흰색' | '검정색' | '회색' | '갈색' | '베이지색' | '녹색' | '파란색' | '데님' | '보라색' | '노란색' | '분홍색' | '빨간색' | '주황색' | '은색' | '금색' | '기타'

type IOriginData = {
  [key in string]: IProduct[]
}

interface IProduct {
  name: string
  filmingDate: string
  area: string
  image: string
  detail: {
    title: string
    image: string
  }[]
}

type IPersonalColorKey = '겨울쿨톤' | '가을웜톤' | '봄웜톤' | '여름쿨톤'

function Codi() {
  const classes = codiStyle()
  const colorList = ['흰색', '검정색', '회색', '갈색', '베이지색', '녹색', '파란색', '데님', '보라색', '노란색', '분홍색', '빨간색', '주황색', '은색', '금색', '기타']
  const [openColor, setOpenColor] = useState<boolean>(false)
  const [color, setColor] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [originData, setOriginData] = useState<IOriginData | null>(null)
  const [data, setData] = useState<IProduct[]>([])

  const [upload, setUpload] = useState<boolean>(false)
  const [imageName, setImageName] = useState<string>('')
  const fileButton = useRef<any>(null)
  const [userImage, setUserImage] = useState<any>()
  const [resultMessage, setResultMessage] = useState<string>('')

  const personalColor = localStorage.getItem('personalColor')

  const hexList = {
    흰색: '#ffffff',
    검정색: 'black',
    회색: 'gray',
    갈색: '#bf8a3d',
    베이지색: '#f5f5dc',
    녹색: '#008000',
    파란색: '#0067a3',
    데님: '#000849',
    보라색: '#8b00ff',
    노란색: '#ffff00',
    분홍색: 'ff3399',
    빨간색: '#ff0000',
    주황색: '#ff7f00',
    은색: '#c0c0c0',
    금색: '#FFD700',
    기타: '#ffffff',
  }

  const personalColorMatch = {
    겨울쿨톤: ['흰색', '검정색', '회색', '파란색', '분홍색', '보라색', '빨간색', '은색'],
    가을웜톤: ['데님', '분홍색', '파란색'],
    봄웜톤: ['갈색', '보라색', '보라색', '주황색', '금색'],
    여름쿨톤: ['베이지색', '녹색', '노란색', '빨간색'],
  }

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
    const response = await fetch('http://localhost:4000/api/style')
    const product = await response.json()

    setOriginData(product)

    setData(product[colorList[0]])
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (originData === null) return

    const colorKey = color === '' ? '흰색' : color

    setData(originData[colorKey])
  }, [color])

  return (
    <div className={classes.codi}>
      <div className={classes.category}>
        <div> Codi</div>
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
              Codi
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
                    {v === '기타' && <span style={{ color: 'black', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>?</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={classes.content}>
        {data.map((v, i) => (
          <a className={classes.wrapper} key={`coid-product-${i}`}>
            <div className={classes.item}>
              <div className={classes.img}>
                <img src={v.image} alt="" />
              </div>
              <div className={classes.one}>{v.name}</div>
              <div className={classes.two}>{v.area}</div>
              <div className={classes.bottom}>
                <div>{v.filmingDate}</div>
                <div>
                  <FavoriteBorder />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

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

export default Codi
