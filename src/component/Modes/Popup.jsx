import React from 'react'
import { useHistory } from 'react-router'
import { socket } from '../../hooks/useAuth'
import style from '../../styles/modes.module.css'

const Popup = ({popup,popupHandler}) => {
    const history = useHistory()
    return (
        <div onClick={popupHandler} className={style.popup}>
            {popup.reason === 'activate' && <Activate />}
            {popup.reason === 'lobby' && <Lobby history={history}/>}
            {popup.reason === 'singleAndBattleRoyale' && <SingleAndBattleRoyale  history={history}/>}
            {popup.reason === 'signin' && <Signin history={history}/>}
        </div>
    )
}


const Activate = () =>{
    return(
        <div className={style.popupContent}>
            <h2>Confirm your email</h2>
            <p>If you want to play, you need to verify your email address.</p>
            <div>
                <button>Okay</button>
                <button>Later</button>
            </div>
        </div>
    )
}

const Lobby = ({history}) =>{
    const leave = () =>{
        socket.emit('leaveLobby')
    }
    return(
        <div className={style.popupContent}>
            <h2>You have a lobby</h2>
            <p>You need to exit the lobby if you want to continue</p>
            <div>
                <button onClick={leave}>Exit</button>
                <button onClick={()=>history.push('/lobby')}>Return</button>
            </div>
        </div>
    )
}

const SingleAndBattleRoyale = () =>{
    return(
        <div className={style.popupContent}>
            <h2>BR only in Multiplayer!</h2>
            <p style={{marginBottom: '20px'}}>For a single player game, you need to select the "Points" mode.</p>
            <div>
                <button>Okay</button> 
            </div>
        </div>
    )
}

const Signin = ({history}) =>{
    return(
        <div className={style.popupContent}>
            <h2>Sign in to play</h2>
            <p style={{marginBottom: '20px'}}></p>
            <div>
                <button onClick={()=>history.push('/auth')}>Sign in</button> 
                <button>Later</button> 
            </div>
        </div>
    )
}

export default Popup
