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
            




        </div>
        <div className={classes.overlay} onClick={() => {setModal(false)}}/>
    </React.Fragment>
}

export default PrivateEdit