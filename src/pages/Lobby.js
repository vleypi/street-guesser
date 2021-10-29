import React from 'react'
import style from '../styles/lobby.module.css'
import LobbyContent from '../component/Lobby/Lobby'

const Lobby = React.memo(() => {
    return (
        <div className={style.lobby}>
            <div className={style.content}>
                <LobbyContent  style={style}/>
            </div>
        </div>
    )
})

export default Lobby
