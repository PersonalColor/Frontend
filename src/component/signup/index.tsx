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
              <div onClick={() => setModal(true)}>{realResult === '' ? 'Person Color 진단하기' : `재진단하기(${realResult})`}</div>
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
              <div>Personal Color 진단</div>
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
                  <div>문답 진단</div>
                </div>
                <div
                  className={classes.node}
                  onClick={() => {
                    setType(1)
                    setStep(1)
                  }}
                >
                  <Filter />
                  <div>필터 진단</div>
                </div>
                <div
                  className={classes.node}
                  onClick={() => {
                    setType(2)
                    setStep(1)
                  }}
                >
                  <Computer />
                  <div>AI 진단</div>
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
                          <div className={classes.head}>쿨, 웜 진단</div>
                          <article>
                            <div className={classes.article}>
                              1. 머리카락이 어떤 색에 가깝나요?<br></br>
                              <input type="radio" name="1" id="1-1" />
                              검은색
                              <input type="radio" name="1" id="1-2" />
                              갈색
                            </div>
                            <div className={classes.article}>
                              2. 민낯 피부톤이 어느 쪽에 더 가까운가요?<br></br>
                              <input type="radio" name="2" id="2-1" />
                              붉다
                              <input type="radio" name="2" id="2-2" />
                              노랗다
                            </div>
                            <div className={classes.article}>
                              3. 손목 혈관 색이 어느 색에 가까운가요?<br></br>
                              <input type="radio" name="3" id="3-1" />
                              파란색
                              <input type="radio" name="3" id="3-2" />
                              초록색
                            </div>
                            <div className={classes.article}>
                              4. 햇볕에 장시간 있으면 피부가 ... <br></br>
                              <input type="radio" name="4" id="4-1" />
                              금방 원래의 피부로 돌아옴
                              <input type="radio" name="4" id="4-2" />
                              갈색으로 타고 지속됨
                            </div>
                            <div className={classes.article}>
                              5. 무슨 색 셔츠가 더 잘어울리나요?<br></br>
                              <input type="radio" name="5" id="5-1" />
                              순백
                              <input type="radio" name="5" id="5-2" />
                              아이보리
                            </div>
                            <div className={classes.article}>
                              6. 무슨 색 악세사리가 더 잘 어울리나요?<br></br>
                              <input type="radio" name="6" id="6-1" />
                              실버
                              <input type="radio" name="6" id="6-2" />
                              골드
                            </div>
                            <div className={classes.article}>
                              7. 무슨 색 목도리가 더 잘어울리나요?<br></br>
                              <input type="radio" name="7" id="7-1" />
                              파란색 목도리
                              <input type="radio" name="7" id="7-2" />
                              갈색 목도리
                            </div>
                            <div className={classes.article}>
                              8. 눈동자가 어떤 색에 가깝나요?<br></br>
                              <input type="radio" name="8" id="8-1" />
                              검은색
                              <input type="radio" name="8" id="8-2" />
                              갈색
                            </div>
                            <div className={classes.article}>
                              9. 맨 얼굴로 검은색 옷을 입으면 - 칙칙해보인다.<br></br>
                              <input type="radio" name="9" id="9-1" />
                              이목구비가 뚜렷해 보인다.
                              <input type="radio" name="9" id="9-2" />
                              칙칙해보인다
                            </div>
                            <div className={classes.article}>
                              10. 핑크 톤의 립스틱과 오렌지 톤의 립스틱 중 더 잘 어울리는 립 컬러는?<br></br>
                              <input type="radio" name="10" id="10-1" />
                              핑크톤
                              <input type="radio" name="10" id="10-2" />
                              오렌지톤
                            </div>
                            <div className={classes.article}>
                              11. 어울리는 아이섀도 컬러는?<br></br>
                              <input type="radio" name="11" id="11-1" />
                              핑크, 블루, 퍼플, 그레이
                              <input type="radio" name="11" id="11-2" />
                              그린, 오렌지, 베이지, 브라운
                            </div>
                          </article>
                        </React.Fragment>
                      )}

                      {nextCheck > 0 && isCool === true && (
                        <React.Fragment>
                          <div style={{ width: '100%' }}>
                            <div className={classes.head}>겨울 쿨, 여룸 쿨 진단</div>
                            <article>
                              <div className={classes.article}>
                                1. 둘 중 무슨 색이 더 잘 어울리나요?<br></br>
                                <input type="radio" name="cool-1" id="cool-1-1" />
                                원색에 가까운 쩅한 색상
                                <input type="radio" name="cool-1" id="cool-1-2" />
                                파스텔 같이 은은한 색상
                              </div>
                              <div className={classes.article}>
                                2. 주변으로 부터 많이 듣는 나의 이미지는?<br></br>
                                <input type="radio" name="cool-2" id="cool-2-1" />
                                카리스마, 도시적인 느낌
                                <input type="radio" name="cool-2" id="cool-2-2" />
                                부드럽고 산뜻한 느낌
                              </div>
                              <div className={classes.article}>
                                3. 또렷하고 선명한 색이 잘 어울리나요?<br></br>
                                <input type="radio" name="cool-3" id="cool-3-1" />예
                                <input type="radio" name="cool-3" id="cool-3-2" />
                                아니요
                              </div>
                              <div className={classes.article}>
                                4. 회색기가 섞인 톤이 잘 어울리나요?<br></br>
                                <input type="radio" name="cool-4" id="cool-4-1" />
                                아니요
                                <input type="radio" name="cool-4" id="cool-4-2" />예
                              </div>
                              <div className={classes.article}>
                                5. 내 인생 립은?<br></br>
                                <input type="radio" name="cool-5" id="cool-5-1" />
                                푸시아
                                <input type="radio" name="cool-5" id="cool-5-2" />
                                쿨핑크
                              </div>
                            </article>
                          </div>
                        </React.Fragment>
                      )}

                      {nextCheck > 0 && isCool === false && (
                        <React.Fragment>
                          <div style={{ width: '100%' }}>
                            <div className={classes.head}>봄 웜, 가을 웜 진단</div>
                            <article>
                              <div className={classes.article}>
                                1. 어두운 색상이 잘 어울리나요?<br></br>
                                <input type="radio" name="warm-1" id="warm-1-1" />
                                아니요
                                <input type="radio" name="warm-1" id="warm-1-2" />예
                              </div>
                              <div className={classes.article}>
                                2. 주변으로 부터 자주 듣는 나의 이미지는?<br></br>
                                <input type="radio" name="warm-2" id="warm-2-1" />
                                어려보이고 활달한 느낌, 생기발랄
                                <input type="radio" name="warm-2" id="warm-2-2" />
                                성숙하고 차분한 느낌
                              </div>
                              <div className={classes.article}>
                                3. 눈동자가 어느 색에 더 가깝나요?<br></br>
                                <input type="radio" name="warm-3" id="warm-3-1" />
                                밝은 갈색
                                <input type="radio" name="warm-3" id="warm-3-2" />
                                깊은 갈색
                              </div>
                              <div className={classes.article}>
                                4. 진하고 톤 다운 된 색상이 잘 어울리나요?<br></br>
                                <input type="radio" name="warm-4" id="warm-4-1" />
                                아니요
                                <input type="radio" name="warm-4" id="warm-4-2" />예
                              </div>
                              <div className={classes.article}>
                                5. 내 인생립은?<br></br>
                                <input type="radio" name="warm-5" id="warm-5-1" />
                                코랄
                                <input type="radio" name="warm-5" id="warm-5-2" />
                                브라운
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
                        <div style={{ marginBottom: '8px' }}>사진을 업로드한 이후에 가장 어울리는 필터를 고르고 결과 보기를 눌러주세요!</div>
                        <div className={classes.button} style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
                          <button
                            style={{ width: '126px', fontSize: '14px', height: '30px' }}
                            onClick={() => {
                              setSeason('spring')
                            }}
                          >
                            봄
                          </button>
                          <button
                            style={{ width: '126px', fontSize: '14px', height: '30px' }}
                            onClick={() => {
                              setSeason('summer')
                            }}
                          >
                            여름
                          </button>
                          <button
                            style={{ width: '126px', fontSize: '14px', height: '30px' }}
                            onClick={() => {
                              setSeason('fall')
                            }}
                          >
                            가을
                          </button>
                          <button
                            style={{ width: '126px', fontSize: '14px', height: '30px' }}
                            onClick={() => {
                              setSeason('winter')
                            }}
                          >
                            겨울
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
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}

                  {type === 2 && <React.Fragment>개발 예정입니다.</React.Fragment>}
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
                      돌아가기
                    </button>
                    <button
                      style={{ width: '160px' }}
                      onClick={() => {
                        if (type === 0) {
                          if (nextCheck === 0) {
                            if (getWarmCoolCheck() === -1) {
                              alert('모든 항목에 대해 체크해주세요')
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
                                alert('모든 항목에 대해 체크해주세요')
                                return
                              }

                              setDiagnosisResult(getWinterSummerCheck() > 2 ? '겨울쿨톤' : '여름쿨톤')
                              setStep(2)
                            } else {
                              if (getFallSpringCheck() === -1) {
                                alert('모든 항목에 대해 체크해주세요')
                                return
                              }

                              setDiagnosisResult(getFallSpringCheck() > 2 ? '가을웜톤' : '봄웜톤')
                              setStep(2)
                            }
                          }
                        } else if (type === 1) {
                          if (season === 'winter') {
                            setDiagnosisResult('겨울쿨톤')
                          } else if (season === 'summer') {
                            setDiagnosisResult('여름쿨톤')
                          } else if (season === 'fall') {
                            setDiagnosisResult('가을웜톤')
                          } else if (season === 'spring') {
                            setDiagnosisResult('봄웜톤')
                          }

                          setStep(2)
                        } else {
                        }
                      }}
                    >
                      {type === 0 ? (nextCheck === 0 ? '다음' : '결과 보기') : '결과 보기'}
                    </button>
                  </div>
                </div>
              </React.Fragment>
            )}
            {step === 2 && (
              <React.Fragment>
                <div className={classes.first} style={{ padding: '30px', height: 'calc(100% - 260px)', overflow: 'auto', fontSize: '40px', justifyContent: 'center' }}>
                  진단 결과는 <span style={{ fontWeight: 'bold', marginLeft: '15px' }}>{diagnosisResult}</span> 입니다!
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
                      돌아가기
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
                      저장하기
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
