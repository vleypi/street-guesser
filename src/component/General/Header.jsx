import React from 'react'
import { useSelector } from 'react-redux'
import style from '../../styles/header.module.css'
import logo from '../../image/whiteLogo.png'
import { useHistory } from 'react-router'

const Header = () => {
    const profile = useSelector(({profile})=> profile)
    const history = useHistory()
    return (
        <div className={style.header}>
            <div className={style.logo} onClick={()=>history.push('/')}>
                <img src={logo} alt="StreetGuesser" />
                <h2>StreetGuesser</h2>
            </div>
            <div className={style.user}>
                {profile.JWT ?
                    <p onClick={()=>history.push('/profile')}>{profile.name}</p> :
                    <button onClick={()=>history.replace('/auth')} className={style.signin}>Sign in</button>
                }
            </div>
        </div>
    )
}

export default Header
