import React from 'react'
import { privateEditStyle } from '../../style/mypage/privateEdit'

interface IPrivateEditProps {
    modal: boolean
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function PrivateEdit(props:IPrivateEditProps) {
    const {modal, setModal} = props
    const classes = privateEditStyle()

    return <React.Fragment>
        <div className={classes.privateEdit}>
            <div className={classes.layout}>
                <span>ID : 은향 조</span><br></br>
                <span>nickname : </span>
                    <input type="id" id="id" name="id"/><br></br>
                <span>Password : </span>
                    <input type="password" id="password" name="password"/><br></br>
                <span>Email : </span>
                    <input type="email" id="email" name="email"/><br></br><br></br>
                <input type="button" value="change"/>
            </div>
        </div>

        <div className={classes.overlay} onClick={() => {setModal(false)}}/>
    </React.Fragment>
}

export default PrivateEdit