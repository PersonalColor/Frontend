import { Cancel, Check, Clear, CloudUpload, Computer, Filter, InsertPhoto } from '@material-ui/icons'
import React, { useRef, useState } from 'react'
import { signupStyle } from '../../style/signup'

interface IValidate {
  email: boolean
  pw: boolean
}

function Signup() {
  const classes = signupStyle()
  const [userId, setUserId] = React.useState<string>('')
  const [userName, setUserName] = React.useState<string>('')
  const [passwd, setPasswd] = React.useState<string>('')
  const [confirmPw, setConfirmPw] = React.useState<string>('')
  const [validate, setValidate] = React.useState<IValidate>({
    email: true,
    pw: true,
  })
  const [modal, setModal] = useState<boolean>(false)
  const [type, setType] = useState<number>(0)
  const [step, setStep] = useState<number>(0)

  const [season, setSeason] = useState<string>('spring')
  const [upload, setUpload] = useState<boolean>(false)
  const [imageName, setImageName] = useState<string>('')
  const fileButton = useRef<any>(null)
  const [userImage, setUserImage] = useState<any>()

  const [nextCheck, setNextCheck] = useState<number>(0)
  const [isCool, setIsCool] = useState<boolean>(false)

  const [diagnosisResult, setDiagnosisResult] = useState<string>('')
  const [realResult, setRealResult] = useState<string>('')

  const handleEmail = (e: any) => {
    setUserId(e.target.value)
    let result = true
    setValidate({ ...validate, email: result })
  }

  const submitSignUp = async () => {
    let payload = {
      userId: userId,
      userName: userName,
      passwd: passwd,
      personalColor: realResult,
    }

    let data = await fetch(`http://localhost:4000/api/user`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
    window.location.href = '/login'
  }

  const handleFileButtonClick = () => {
    fileButton.current.click()
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
    }
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
  }

  const getWarmCoolCheck = () => {
    let coolCount = 0
    let warmCount = 0

    for (let i = 1; i <= 11; i++) {
      coolCount += (document.getElementById(`${i}-1`) as HTMLInputElement).checked ? 1 : 0
      warmCount += (document.getElementById(`${i}-2`) as HTMLInputElement).checked ? 1 : 0
    }

    if (coolCount + warmCount !== 11) {
      return -1
    }

    return coolCount
  }

  const getWinterSummerCheck = () => {
    let coolCount = 0
    let warmCount = 0

    for (let i = 1; i <= 5; i++) {
      coolCount += (document.getElementById(`cool-${i}-1`) as HTMLInputElement).checked ? 1 : 0
      warmCount += (document.getElementById(`cool-${i}-2`) as HTMLInputElement).checked ? 1 : 0
    }

    if (coolCount + warmCount !== 5) {
      return -1
    }

    return coolCount
  }

  const getFallSpringCheck = () => {
    let coolCount = 0
    let warmCount = 0

    for (let i = 1; i <= 5; i++) {
      coolCount += (document.getElementById(`warm-${i}-1`) as HTMLInputElement).checked ? 1 : 0
      warmCount += (document.getElementById(`warm-${i}-2`) as HTMLInputElement).checked ? 1 : 0
    }

    if (coolCount + warmCount !== 5) {
      return -1
    }

    return coolCount
  }

  return (
    <React.Fragment>
      <div className={classes.signup}>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <div className={classes.title}>Sign Up</div>
            <div className={classes.input}>
              <input type="text" placeholder="name" onChange={(e: any) => setUserName(e.target.value)} />
            </div>
            <div className={classes.input}>
              <input type="text" placeholder="id" onChange={(e: any) => handleEmail(e)} />
            </div>
            <div className={classes.input}>
              <input type="password" placeholder="password" onChange={(e: any) => setPasswd(e.target.value)} />
            </div>
            <div className={classes.input}>
              <input type="password" placeholder="confirm password" onChange={(e: any) => setConfirmPw(e.target.value)} />
            </div>
            <div className={classes.input}>
              <div onClick={() => setModal(true)}>{realResult === '' ? 'Person Color ????????????' : `???????????????(${realResult})`}</div>
            </div>
            <div className={classes.button}>
              <button
                onClick={() => {
                  if (userId === '') return
                  if (userName === '') return
                  if (passwd === '' || confirmPw !== passwd) return
                  if (confirmPw === '') return
                  if (realResult === '') return

                  submitSignUp()
                }}
              >
                Sign Up
              </button>
            </div>
            <div className={classes.a}>
              <a style={{ textDecoration: 'none', color: '#ffffff' }} href="/">
                Do you have an account?
              </a>
            </div>
          </div>
        </div>
      </div>

      {modal === true && (
        <React.Fragment>
          <div className={classes.modal}>
            <div style={{ height: '60px', color: '#ffffff', display: 'flex', padding: '30px', fontSize: '32px', fontWeight: 'bold', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>Personal Color ??????</div>
              <div style={{ cursor: 'pointer' }} onClick={() => setModal(false)}>
                <Clear style={{ width: '36px', height: '36px' }} />
              </div>
            </div>
            {step === 0 && (
              <div className={classes.first}>
                <div
                  className={classes.node}
                  onClick={() => {
                    setType(0)
                    setStep(1)
                  }}
                >
                  <Check />
                  <div>?????? ??????</div>
                </div>
                <div
                  className={classes.node}
                  onClick={() => {
                    setType(1)
                    setStep(1)
                  }}
                >
                  <Filter />
                  <div>?????? ??????</div>
                </div>
                <div
                  className={classes.node}
                  onClick={() => {
                    setType(2)
                    setStep(1)
                  }}
                >
                  <Computer />
                  <div>AI ??????</div>
                </div>
              </div>
            )}
            {step === 1 && (
              <React.Fragment>
                <div className={classes.first} style={{ padding: '30px', height: 'calc(100% - 260px)', flexDirection: 'column', overflow: 'auto' }}>
                  {type === 0 && (
                    <React.Fragment>
                      {nextCheck === 0 && (
                        <React.Fragment>
                          <div className={classes.head}>???, ??? ??????</div>
                          <article>
                            <div className={classes.article}>
                              1. ??????????????? ?????? ?????? ?????????????<br></br>
                              <input type="radio" name="1" id="1-1" />
                              ?????????
                              <input type="radio" name="1" id="1-2" />
                              ??????
                            </div>
                            <div className={classes.article}>
                              2. ?????? ???????????? ?????? ?????? ??? ????????????????<br></br>
                              <input type="radio" name="2" id="2-1" />
                              ??????
                              <input type="radio" name="2" id="2-2" />
                              ?????????
                            </div>
                            <div className={classes.article}>
                              3. ?????? ?????? ?????? ?????? ?????? ????????????????<br></br>
                              <input type="radio" name="3" id="3-1" />
                              ?????????
                              <input type="radio" name="3" id="3-2" />
                              ?????????
                            </div>
                            <div className={classes.article}>
                              4. ????????? ????????? ????????? ????????? ... <br></br>
                              <input type="radio" name="4" id="4-1" />
                              ?????? ????????? ????????? ?????????
                              <input type="radio" name="4" id="4-2" />
                              ???????????? ?????? ?????????
                            </div>
                            <div className={classes.article}>
                              5. ?????? ??? ????????? ??? ???????????????????<br></br>
                              <input type="radio" name="5" id="5-1" />
                              ??????
                              <input type="radio" name="5" id="5-2" />
                              ????????????
                            </div>
                            <div className={classes.article}>
                              6. ?????? ??? ??????????????? ??? ??? ????????????????<br></br>
                              <input type="radio" name="6" id="6-1" />
                              ??????
                              <input type="radio" name="6" id="6-2" />
                              ??????
                            </div>
                            <div className={classes.article}>
                              7. ?????? ??? ???????????? ??? ???????????????????<br></br>
                              <input type="radio" name="7" id="7-1" />
                              ????????? ?????????
                              <input type="radio" name="7" id="7-2" />
                              ?????? ?????????
                            </div>
                            <div className={classes.article}>
                              8. ???????????? ?????? ?????? ?????????????<br></br>
                              <input type="radio" name="8" id="8-1" />
                              ?????????
                              <input type="radio" name="8" id="8-2" />
                              ??????
                            </div>
                            <div className={classes.article}>
                              9. ??? ????????? ????????? ?????? ????????? - ??????????????????.<br></br>
                              <input type="radio" name="9" id="9-1" />
                              ??????????????? ????????? ?????????.
                              <input type="radio" name="9" id="9-2" />
                              ??????????????????
                            </div>
                            <div className={classes.article}>
                              10. ?????? ?????? ???????????? ????????? ?????? ????????? ??? ??? ??? ???????????? ??? ??????????<br></br>
                              <input type="radio" name="10" id="10-1" />
                              ?????????
                              <input type="radio" name="10" id="10-2" />
                              ????????????
                            </div>
                            <div className={classes.article}>
                              11. ???????????? ???????????? ??????????<br></br>
                              <input type="radio" name="11" id="11-1" />
                              ??????, ??????, ??????, ?????????
                              <input type="radio" name="11" id="11-2" />
                              ??????, ?????????, ?????????, ?????????
                            </div>
                          </article>
                        </React.Fragment>
                      )}

                      {nextCheck > 0 && isCool === true && (
                        <React.Fragment>
                          <div style={{ width: '100%' }}>
                            <div className={classes.head}>?????? ???, ?????? ??? ??????</div>
                            <article>
                              <div className={classes.article}>
                                1. ??? ??? ?????? ?????? ??? ??? ????????????????<br></br>
                                <input type="radio" name="cool-1" id="cool-1-1" />
                                ????????? ????????? ?????? ??????
                                <input type="radio" name="cool-1" id="cool-1-2" />
                                ????????? ?????? ????????? ??????
                              </div>
                              <div className={classes.article}>
                                2. ???????????? ?????? ?????? ?????? ?????? ?????????????<br></br>
                                <input type="radio" name="cool-2" id="cool-2-1" />
                                ????????????, ???????????? ??????
                                <input type="radio" name="cool-2" id="cool-2-2" />
                                ???????????? ????????? ??????
                              </div>
                              <div className={classes.article}>
                                3. ???????????? ????????? ?????? ??? ????????????????<br></br>
                                <input type="radio" name="cool-3" id="cool-3-1" />???
                                <input type="radio" name="cool-3" id="cool-3-2" />
                                ?????????
                              </div>
                              <div className={classes.article}>
                                4. ???????????? ?????? ?????? ??? ????????????????<br></br>
                                <input type="radio" name="cool-4" id="cool-4-1" />
                                ?????????
                                <input type="radio" name="cool-4" id="cool-4-2" />???
                              </div>
                              <div className={classes.article}>
                                5. ??? ?????? ???????<br></br>
                                <input type="radio" name="cool-5" id="cool-5-1" />
                                ?????????
                                <input type="radio" name="cool-5" id="cool-5-2" />
                                ?????????
                              </div>
                            </article>
                          </div>
                        </React.Fragment>
                      )}

                      {nextCheck > 0 && isCool === false && (
                        <React.Fragment>
                          <div style={{ width: '100%' }}>
                            <div className={classes.head}>??? ???, ?????? ??? ??????</div>
                            <article>
                              <div className={classes.article}>
                                1. ????????? ????????? ??? ????????????????<br></br>
                                <input type="radio" name="warm-1" id="warm-1-1" />
                                ?????????
                                <input type="radio" name="warm-1" id="warm-1-2" />???
                              </div>
                              <div className={classes.article}>
                                2. ???????????? ?????? ?????? ?????? ?????? ?????????????<br></br>
                                <input type="radio" name="warm-2" id="warm-2-1" />
                                ??????????????? ????????? ??????, ????????????
                                <input type="radio" name="warm-2" id="warm-2-2" />
                                ???????????? ????????? ??????
                              </div>
                              <div className={classes.article}>
                                3. ???????????? ?????? ?????? ??? ?????????????<br></br>
                                <input type="radio" name="warm-3" id="warm-3-1" />
                                ?????? ??????
                                <input type="radio" name="warm-3" id="warm-3-2" />
                                ?????? ??????
                              </div>
                              <div className={classes.article}>
                                4. ????????? ??? ?????? ??? ????????? ??? ????????????????<br></br>
                                <input type="radio" name="warm-4" id="warm-4-1" />
                                ?????????
                                <input type="radio" name="warm-4" id="warm-4-2" />???
                              </div>
                              <div className={classes.article}>
                                5. ??? ?????????????<br></br>
                                <input type="radio" name="warm-5" id="warm-5-1" />
                                ??????
                                <input type="radio" name="warm-5" id="warm-5-2" />
                                ?????????
                              </div>
                            </article>
                          </div>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}

                  {type === 1 && (
                    <React.Fragment>
                      <div>
                        <div style={{ marginBottom: '8px' }}>????????? ???????????? ????????? ?????? ???????????? ????????? ????????? ?????? ????????? ???????????????!</div>
                        <div className={classes.button} style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
                          <button
                            style={{ width: '126px', fontSize: '14px', height: '30px' }}
                            onClick={() => {
                              setSeason('spring')
                            }}
                          >
                            ???
                          </button>
                          <button
                            style={{ width: '126px', fontSize: '14px', height: '30px' }}
                            onClick={() => {
                              setSeason('summer')
                            }}
                          >
                            ??????
                          </button>
                          <button
                            style={{ width: '126px', fontSize: '14px', height: '30px' }}
                            onClick={() => {
                              setSeason('fall')
                            }}
                          >
                            ??????
                          </button>
                          <button
                            style={{ width: '126px', fontSize: '14px', height: '30px' }}
                            onClick={() => {
                              setSeason('winter')
                            }}
                          >
                            ??????
                          </button>
                        </div>
                      </div>

                      <div>
                        <img
                          src={`/images/${season}.jpg`}
                          alt=""
                          style={{
                            width: '596px',
                            height: '448px',
                          }}
                        />
                        <div className={classes.imageUpload} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={thumbnailDrop} onClick={handleFileButtonClick}>
                          {upload ? (
                            <div className={classes.upload}>
                              <div>
                                <InsertPhoto className={classes.uploadIcon} />
                              </div>
                              <div className={classes.fileName}>{imageName !== '' ? imageName : '???????????? ???????????????'}</div>
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
                                      <div>???????????? ??????????????? ?????????</div>
                                      <div>????????? ?????? ?????????????????????.</div>
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
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}

                  {type === 2 && <React.Fragment>?????? ???????????????.</React.Fragment>}
                </div>

                <div className={classes.second}>
                  <div className={classes.button} style={{ display: 'flex', gap: '30px', justifyContent: 'flex-end' }}>
                    <button
                      style={{ width: '160px' }}
                      onClick={() => {
                        setType(0)
                        setStep(0)
                        setNextCheck(0)
                      }}
                    >
                      ????????????
                    </button>
                    <button
                      style={{ width: '160px' }}
                      onClick={() => {
                        if (type === 0) {
                          if (nextCheck === 0) {
                            if (getWarmCoolCheck() === -1) {
                              alert('?????? ????????? ?????? ??????????????????')
                              return
                            }

                            if (getWarmCoolCheck() > 5) {
                              setIsCool(true)
                            } else {
                              setIsCool(false)
                            }
                            setNextCheck(1)
                          } else {
                            if (isCool === true) {
                              if (getWinterSummerCheck() === -1) {
                                alert('?????? ????????? ?????? ??????????????????')
                                return
                              }

                              setDiagnosisResult(getWinterSummerCheck() > 2 ? '????????????' : '????????????')
                              setStep(2)
                            } else {
                              if (getFallSpringCheck() === -1) {
                                alert('?????? ????????? ?????? ??????????????????')
                                return
                              }

                              setDiagnosisResult(getFallSpringCheck() > 2 ? '????????????' : '?????????')
                              setStep(2)
                            }
                          }
                        } else if (type === 1) {
                          if (season === 'winter') {
                            setDiagnosisResult('????????????')
                          } else if (season === 'summer') {
                            setDiagnosisResult('????????????')
                          } else if (season === 'fall') {
                            setDiagnosisResult('????????????')
                          } else if (season === 'spring') {
                            setDiagnosisResult('?????????')
                          }

                          setStep(2)
                        } else {
                        }
                      }}
                    >
                      {type === 0 ? (nextCheck === 0 ? '??????' : '?????? ??????') : '?????? ??????'}
                    </button>
                  </div>
                </div>
              </React.Fragment>
            )}
            {step === 2 && (
              <React.Fragment>
                <div className={classes.first} style={{ padding: '30px', height: 'calc(100% - 260px)', overflow: 'auto', fontSize: '40px', justifyContent: 'center' }}>
                  ?????? ????????? <span style={{ fontWeight: 'bold', marginLeft: '15px' }}>{diagnosisResult}</span> ?????????!
                </div>
                <div className={classes.second}>
                  <div className={classes.button} style={{ display: 'flex', gap: '30px', justifyContent: 'flex-end' }}>
                    <button
                      style={{ width: '160px' }}
                      onClick={() => {
                        setType(0)
                        setStep(0)
                        setNextCheck(0)
                        setDiagnosisResult('')
                      }}
                    >
                      ????????????
                    </button>
                    <button
                      style={{ width: '160px' }}
                      onClick={() => {
                        setRealResult(diagnosisResult)

                        setType(0)
                        setStep(0)
                        setNextCheck(0)
                        setDiagnosisResult('')
                        setModal(false)
                      }}
                    >
                      ????????????
                    </button>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
          <div className={classes.overlay} onClick={() => setModal(false)}></div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default Signup
