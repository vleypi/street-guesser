import React from 'react'
import style from '../../styles/loader.module.css'

const Loader = () => {
    return (
        <div className={style.loader}>
            <div className={style.animation}></div>
        </div>
    )
}

export default Loader
