import React from 'react'
import { socket } from '../../../hooks/useAuth'
import {useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import style from '../../../styles/maps.module.css'

const Leave = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const history = useHistory()
    const leave = async () =>{
        try{
            if(state.lobby.lobby){
                socket.emit('leaveLobby',{id: state.profile.id})
                history.push('/home')
                window.location.reload()
            }
        }
        catch(err){}
    }
    return (
        <div className={style.leave}>
            <button onClick={leave}>Покинуть</button>
        </div>
    )
}

export default Leave
