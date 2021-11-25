import React, { useState } from 'react'
import { classicNameResolver } from 'typescript'
import { selfDiagnosisStyle } from '../../style/selfDiagnosis/index'

function SelfDiagnosis(){
    const classes = selfDiagnosisStyle()

    return (
        <body>
            <header className={classes.head}>퍼스널 컬러 자가 진단</header>
            <article>
                <div className={classes.article}>1. 머리카락이 어떤 색에 가깝나요?<br></br>
                    <input type="radio" name="1"/>검은색
                    <input type="radio" name="1"/>갈색
                </div>
                <div className={classes.article}>2. 민낯 피부톤이 어느 쪽에 더 가까운가요?<br></br>
                    <input type="radio" name="2"/>붉다
                    <input type="radio" name="2"/>노랗다
                </div>
                <div className={classes.article}>3. 손목 혈관 색이 어느 색에 가까운가요?<br></br>
                    <input type="radio" name="3"/>파란색
                    <input type="radio" name="3"/>초록색
                </div>
                <div className={classes.article}>4. 햇볕에 장시간 있으면 피부가 ... <br></br>
                    <input type="radio" name="4"/>금방 원래의 피부로 돌아옴
                    <input type="radio" name="4"/>갈색으로 타고 지속됨
                </div>
                <div className={classes.article}>5. 무슨 색 셔츠가 더 잘어울리나요?<br></br>
                    <input type="radio" name="5"/>순백
                    <input type="radio" name="5"/>아이보리
                </div>
                <div className={classes.article}>6. 무슨 색 악세사리가 더 잘 어울리나요?<br></br>
                    <input type="radio" name="6"/>실버
                    <input type="radio" name="6"/>골드
                </div>
                <div className={classes.article}>7. 무슨 색 목도리가 더 잘어울리나요?<br></br>
                    <input type="radio" name="7"/>파란색 목도리
                    <input type="radio" name="7"/>갈색 목도리
                </div>
                <div className={classes.article}>8. 눈동자가 어떤 색에 가깝나요?<br></br>
                    <input type="radio" name="8"/>검은색
                    <input type="radio" name="8"/>갈색
                </div>
                <div className={classes.article}>9. 맨 얼굴로 검은색 옷을 입으면 - 칙칙해보인다.<br></br>
                    <input type="radio" name="9"/>이목구비가 뚜렷해 보인다.
                    <input type="radio" name="9"/>칙칙해보인다
                </div>
                <div className={classes.article}>10. 핑크 톤의 립스틱과 오렌지 톤의 립스틱 중 더 잘 어울리는 립 컬러는?<br></br>
                    <input type="radio" name="10"/>핑크톤
                    <input type="radio" name="10"/>오렌지톤
                </div>
                <div className={classes.article}>11. 목 아래 가슴 부위에 흰 종이를 갖다 댔을 때, 피부가<br></br>
                    <input type="radio" name="11"/>핑크빛 & 푸른 빛에 가깝다

                    <input type="radio" name="11"/>노란빛 & 올리브 빛에 가깝다.
                </div>
                <div className={classes.article}>12. 어울리는 아이섀도 컬러는?<br></br>
                    <input type="radio" name="12"/>핑크, 블루, 퍼플, 그레이
                    <input type="radio" name="12"/>그린, 오렌지, 베이지, 브라운
                </div>
            </article>
            <div className={classes.head}>겨울 쿨, 여룸 쿨 진단</div>
            <article>
                <div className={classes.article}>1. 둘 중 무슨 색이 더 잘 어울리나요?<br></br>
                    <input type="radio" name="cool-1"/>원색에 가까운 쩅한 색상
                    <input type="radio" name="cool-1"/>파스텔 같이 은은한 색상
                </div>
                <div className={classes.article}>2. 주변으로 부터 많이 듣는 나의 이미지는?<br></br>
                    <input type="radio" name="cool-2"/>카리스마, 도시적인 느낌
                    <input type="radio" name="cool-2"/>부드럽고 산뜻한 느낌
                </div>
                <div className={classes.article}>3. 또렷하고 선명한 색이 잘 어울리나요?<br></br>
                    <input type="radio" name="cool-3"/>예
                    <input type="radio" name="cool-3"/>아니요
                </div>
                <div className={classes.article}>4. 회색기가 섞인 톤이 잘 어울리나요?<br></br>
                    <input type="radio" name="cool-4"/>아니요
                    <input type="radio" name="cool-4"/>예
                </div>
                <div className={classes.article}>5. 내 인생 립은?<br></br>
                    <input type="radio" name="cool-5"/>푸시아
                    <input type="radio" name="cool-5"/>쿨핑크
                </div>
            </article>
            <div className={classes.head}>봄 웜, 가을 웜 진단</div>
            <article>
                <div className={classes.article}>1. 어두운 색상이 잘 어울리나요?<br></br>
                    <input type="radio" name="warm-1"/>아니요
                    <input type="radio" name="warm-1"/>예
                </div>
                <div className={classes.article}>2. 주변으로 부터 자주 듣는 나의 이미지는?<br></br>
                    <input type="radio" name="warm-2"/>어려보이고 활달한 느낌, 생기발랄
                    <input type="radio" name="warm-2"/>성숙하고 차분한 느낌
                </div>
                <div className={classes.article}>3. 눈동자가 어느 색에 더 가깝나요?<br></br>
                    <input type="radio" name="warm-3"/>밝은 갈색
                    <input type="radio" name="warm-3"/>깊은 갈색
                </div>
                <div className={classes.article}>4. 진하고 톤 다운 된 색상이 잘 어울리나요?<br></br>
                    <input type="radio" name="warm-4"/>아니요
                    <input type="radio" name="warm-4"/>예
                </div>
                <div className={classes.article}>5. 내 인생립은?<br></br>
                    <input type="radio" name="warm-5"/>코랄
                    <input type="radio" name="warm-5"/>브라운
                </div>
            </article>

        </body>
        
    )
}

export default SelfDiagnosis