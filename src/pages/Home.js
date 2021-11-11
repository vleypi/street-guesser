import React from 'react'
import HomeWelcome from '../component/Home/Home.welcome'
import Modes from '../component/Modes/Modes'
import style from '../styles/home.module.css'
import Question from '../component/General/Question'
import {useFetch} from '../hooks/useFetch'
import avatar from '../image/avatar.svg'

const Home = () => {
    return (
        <div className={style.home} style={{scrollBehavior: 'smooth'}}>
            <div className={style.content}>
                <HomeWelcome style={style}/>
                <Modes />
                <Question />
            </div>
        </div>
    )
}

export default Home

