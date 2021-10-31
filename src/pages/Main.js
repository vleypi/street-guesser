import React from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import Logo from '../component/Main/Logo'
import style from '../styles/main.module.css'
import Question from '../component/General/Question'

const Main = () => {
    const profile = useSelector(({profile}) => profile)
    const route = useHistory()
    const routeHandler = (e) =>{
        e.preventDefault()
        route.push(profile.id ? '/' : '/auth')
    }
    return (
        <div className={style.main}>
            <div className={style.content}>
                <Logo style={style} routeHandler={routeHandler} profile={profile}/>
                <div className={style.about}>
                    <div className={style.animation}>
                        <h2>StreetGuesser</h2>
                        <p className={style.ph}>This is a game for real geographers!</p>
                    </div>
                    <div className={style.start}>
                        <div onClick={routeHandler} className={style.box}>
                            <p>Start</p>
                        </div>
                        <div onClick={routeHandler} className={style.box}>
                            <p>Explore the world!</p>
                        </div>
                    </div>
                </div>
                <Question />
            </div>
        </div>
    )
}

export default Main
