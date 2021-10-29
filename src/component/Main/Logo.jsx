import React from 'react'
import logo from '../../image/logo.png'

const Logo = ({style,routeHandler,profile}) => {
    return (
        <div className={style.header}>
            <div className={style.logo}>
                <img src={logo} alt="mapsguesser" />
                <h2>MapsGuesser</h2>
            </div>
            <div className={style.button}>
                <button onClick={routeHandler} >{profile.id ? 'Открыть' : 'Войти'}</button>
            </div>
        </div>
    )
}

export default Logo
