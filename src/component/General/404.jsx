import React from 'react'
import style from '../../styles/error.module.css'
import world from '../../image/world.svg'
import arrow from '../../image/next.svg'
import { useHistory } from 'react-router'


const ErrorPage = () => {
    const history = useHistory()
    return (
        <div className={style.wrapper}>
            <div className={style.errcontent}>
                <div className={style.error} data-text="404">404</div>
                <h2>Are the travelers lost?</h2>
                <p>You are in an unknown place. <br/> You can come back to continue exploring the world</p>
                <div className={style.back}>
                    <button onClick={()=>history.replace('/')}>Back</button>
                    <img className={style.arrowBack} src={arrow}/>
                </div>
            </div>
            <div className={style.imgs}>
                <img src={world} />
            </div>
        </div>
    )
}

export default ErrorPage
