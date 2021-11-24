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
            <h3>ID : 은향 조</h3>
            <h3>Password</h3>
            <h3>email</h3>
            <h3>Password</h3>




        </div>
        <div className={classes.overlay} onClick={() => {setModal(false)}}/>
    </React.Fragment>
}

export default PrivateEdit